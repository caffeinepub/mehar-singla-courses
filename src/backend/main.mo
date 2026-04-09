import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Types "./types/courses";
import CoursesLib "./lib/courses";
import CoursesMixin "mixins/courses-api";

actor {
  // ── Authorization ────────────────────────────────────────────────────────
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ── Courses state ────────────────────────────────────────────────────────
  let courses = Map.empty<Nat, Types.Course>();
  let enrollments = List.empty<Types.Enrollment>();
  let nextCourseId = { var value : Nat = 1 };
  let instructorProfile = { var profile : ?Types.InstructorProfile = null };
  let stripeConfig = { var config : ?Stripe.StripeConfiguration = null };

  // ── Sample data (seeded once on first run) ───────────────────────────────
  if (courses.isEmpty()) {
    CoursesLib.seedSampleCourses(courses, nextCourseId);
  };

  // ── Stripe (required top-level declarations) ─────────────────────────────

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public query func isStripeConfigured() : async Bool {
    stripeConfig.config != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfig.config := ?config;
  };

  func getStripeConf() : Stripe.StripeConfiguration {
    switch (stripeConfig.config) {
      case null { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConf(), caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConf(), sessionId, transform);
  };

  // ── Courses API mixin ────────────────────────────────────────────────────
  include CoursesMixin(accessControlState, courses, enrollments, nextCourseId, instructorProfile, stripeConfig, transform);
};
