import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/courses";
import CoursesLib "../lib/courses";

mixin (
  accessControlState : AccessControl.AccessControlState,
  courses : Map.Map<Nat, Types.Course>,
  enrollments : List.List<Types.Enrollment>,
  nextCourseId : { var value : Nat },
  instructorProfile : { var profile : ?Types.InstructorProfile },
  stripeConfig : { var config : ?Stripe.StripeConfiguration },
  transformFn : OutCall.Transform,
) {
  // ── Public: Course listing ───────────────────────────────────────────────

  public query func listCourses() : async [Types.Course] {
    CoursesLib.listCourses(courses);
  };

  public query func getCourse(id : Nat) : async ?Types.Course {
    CoursesLib.getCourse(courses, id);
  };

  // ── Admin: Course management ─────────────────────────────────────────────

  public shared ({ caller }) func createCourse(
    title : Text,
    description : Text,
    price : Nat,
    level : Types.CourseLevel,
    durationHours : Nat,
    modulesCount : Nat,
    thumbnailUrl : Text,
    videoUrl : Text,
  ) : async Types.Course {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can create courses");
    };
    CoursesLib.createCourse(courses, nextCourseId, title, description, price, level, durationHours, modulesCount, thumbnailUrl, videoUrl);
  };

  public shared ({ caller }) func updateCourse(
    id : Nat,
    title : Text,
    description : Text,
    price : Nat,
    level : Types.CourseLevel,
    durationHours : Nat,
    modulesCount : Nat,
    thumbnailUrl : Text,
    videoUrl : Text,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update courses");
    };
    CoursesLib.updateCourse(courses, id, title, description, price, level, durationHours, modulesCount, thumbnailUrl, videoUrl);
  };

  public shared ({ caller }) func deleteCourse(id : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete courses");
    };
    CoursesLib.deleteCourse(courses, id);
  };

  // ── Student: Enrollment ──────────────────────────────────────────────────

  public query ({ caller }) func getMyEnrollments() : async [Types.Enrollment] {
    CoursesLib.getStudentEnrollments(enrollments, caller);
  };

  public query ({ caller }) func isEnrolledInCourse(courseId : Nat) : async Bool {
    CoursesLib.isEnrolled(enrollments, courseId, caller);
  };

  public shared ({ caller }) func updateMyProgressStatus(courseId : Nat, newStatus : Types.ProgressStatus) : async () {
    if (not CoursesLib.isEnrolled(enrollments, courseId, caller)) {
      Runtime.trap("Not enrolled in this course");
    };
    CoursesLib.updateProgressStatus(enrollments, courseId, caller, newStatus);
  };

  // ── Admin: Enrollments & Revenue ─────────────────────────────────────────

  public query ({ caller }) func getAllEnrollments() : async [Types.Enrollment] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all enrollments");
    };
    CoursesLib.getAllEnrollments(enrollments);
  };

  public query ({ caller }) func getRevenueSummaries() : async [Types.RevenueSummary] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view revenue summaries");
    };
    CoursesLib.getRevenueSummaries(courses, enrollments);
  };

  // ── Instructor profile ───────────────────────────────────────────────────

  public query func getInstructorProfile() : async ?Types.InstructorProfile {
    CoursesLib.getInstructorProfile(instructorProfile.profile);
  };

  public shared ({ caller }) func updateInstructorProfile(name : Text, bio : Text, photoUrl : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update the instructor profile");
    };
    instructorProfile.profile := ?CoursesLib.buildInstructorProfile(name, bio, photoUrl);
  };

  // ── Course-specific checkout ─────────────────────────────────────────────

  public shared ({ caller }) func createCourseCheckoutSession(courseId : Nat, successUrl : Text, cancelUrl : Text) : async Text {
    let config = switch (stripeConfig.config) {
      case null { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
    let course = switch (CoursesLib.getCourse(courses, courseId)) {
      case null { Runtime.trap("Course not found") };
      case (?c) { c };
    };
    let item : Stripe.ShoppingItem = {
      currency = "inr";
      productName = course.title;
      productDescription = course.description;
      priceInCents = course.price;
      quantity = 1;
    };
    await Stripe.createCheckoutSession(config, caller, [item], successUrl, cancelUrl, transformFn);
  };

  // ── Post-payment enrollment ──────────────────────────────────────────────

  public shared ({ caller }) func enrollAfterPayment(courseId : Nat, sessionId : Text) : async () {
    let config = switch (stripeConfig.config) {
      case null { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
    let status = await Stripe.getSessionStatus(config, sessionId, transformFn);
    switch (status) {
      case (#completed(_)) {
        CoursesLib.enrollStudent(enrollments, courseId, caller);
      };
      case (#failed({ error })) {
        Runtime.trap("Payment not completed: " # error);
      };
    };
  };
};
