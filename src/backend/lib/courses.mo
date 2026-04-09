import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/courses";

module {
  // ── Course CRUD ──────────────────────────────────────────────────────────

  public func listCourses(courses : Map.Map<Nat, Types.Course>) : [Types.Course] {
    courses.values().toArray();
  };

  public func getCourse(courses : Map.Map<Nat, Types.Course>, id : Nat) : ?Types.Course {
    courses.get(id);
  };

  public func createCourse(
    courses : Map.Map<Nat, Types.Course>,
    nextId : { var value : Nat },
    title : Text,
    description : Text,
    price : Nat,
    level : Types.CourseLevel,
    durationHours : Nat,
    modulesCount : Nat,
    thumbnailUrl : Text,
    videoUrl : Text,
  ) : Types.Course {
    let id = nextId.value;
    nextId.value += 1;
    let course : Types.Course = {
      id;
      title;
      description;
      price;
      level;
      durationHours;
      modulesCount;
      thumbnailUrl;
      videoUrl;
      createdAt = Time.now();
    };
    courses.add(id, course);
    course;
  };

  public func updateCourse(
    courses : Map.Map<Nat, Types.Course>,
    id : Nat,
    title : Text,
    description : Text,
    price : Nat,
    level : Types.CourseLevel,
    durationHours : Nat,
    modulesCount : Nat,
    thumbnailUrl : Text,
    videoUrl : Text,
  ) : () {
    switch (courses.get(id)) {
      case null { /* course not found, no-op */ };
      case (?existing) {
        let updated : Types.Course = {
          existing with
          title;
          description;
          price;
          level;
          durationHours;
          modulesCount;
          thumbnailUrl;
          videoUrl;
        };
        courses.add(id, updated);
      };
    };
  };

  public func deleteCourse(courses : Map.Map<Nat, Types.Course>, id : Nat) : () {
    courses.remove(id);
  };

  // ── Sample data seeding ──────────────────────────────────────────────────

  public func seedSampleCourses(
    courses : Map.Map<Nat, Types.Course>,
    nextId : { var value : Nat },
  ) : () {
    let now = Time.now();
    let samples : [(Nat, Types.Course)] = [
      (
        1,
        {
          id = 1;
          title = "Motoko Fundamentals";
          description = "Learn to build decentralized applications on the Internet Computer using Motoko from scratch. Covers types, actors, async programming and canister deployment.";
          price = 4999;
          level = #Beginner;
          durationHours = 12;
          modulesCount = 8;
          thumbnailUrl = "";
          videoUrl = "";
          createdAt = now;
        },
      ),
      (
        2,
        {
          id = 2;
          title = "Advanced ICP Architecture";
          description = "Deep dive into Internet Computer architecture. Explore multi-canister apps, orthogonal persistence, and production-grade patterns for large-scale dapps.";
          price = 7999;
          level = #Advanced;
          durationHours = 20;
          modulesCount = 14;
          thumbnailUrl = "";
          videoUrl = "";
          createdAt = now;
        },
      ),
      (
        3,
        {
          id = 3;
          title = "React & ICP Frontend Development";
          description = "Build polished frontends for Internet Computer canisters using React, TypeScript, and Tailwind CSS. Learn agent-js, authentication, and deployment best practices.";
          price = 5999;
          level = #Intermediate;
          durationHours = 16;
          modulesCount = 11;
          thumbnailUrl = "";
          videoUrl = "";
          createdAt = now;
        },
      ),
    ];
    for ((id, course) in samples.vals()) {
      courses.add(id, course);
    };
    nextId.value := 4;
  };

  // ── Enrollment ───────────────────────────────────────────────────────────

  public func enrollStudent(
    enrollments : List.List<Types.Enrollment>,
    courseId : Nat,
    studentPrincipal : Principal,
  ) : () {
    // Avoid duplicate enrollment
    let alreadyEnrolled = enrollments.find(func(e : Types.Enrollment) : Bool {
      e.courseId == courseId and e.studentPrincipal == studentPrincipal
    });
    switch (alreadyEnrolled) {
      case (?_) { /* already enrolled, no-op */ };
      case null {
        let enrollment : Types.Enrollment = {
          courseId;
          studentPrincipal;
          enrolledAt = Time.now();
          progressStatus = #NotStarted;
        };
        enrollments.add(enrollment);
      };
    };
  };

  public func getStudentEnrollments(
    enrollments : List.List<Types.Enrollment>,
    studentPrincipal : Principal,
  ) : [Types.Enrollment] {
    enrollments.filter(func(e : Types.Enrollment) : Bool {
      e.studentPrincipal == studentPrincipal
    }).toArray();
  };

  public func getAllEnrollments(enrollments : List.List<Types.Enrollment>) : [Types.Enrollment] {
    enrollments.toArray();
  };

  public func isEnrolled(
    enrollments : List.List<Types.Enrollment>,
    courseId : Nat,
    studentPrincipal : Principal,
  ) : Bool {
    switch (enrollments.find(func(e : Types.Enrollment) : Bool {
      e.courseId == courseId and e.studentPrincipal == studentPrincipal
    })) {
      case (?_) true;
      case null false;
    };
  };

  public func updateProgressStatus(
    enrollments : List.List<Types.Enrollment>,
    courseId : Nat,
    studentPrincipal : Principal,
    newStatus : Types.ProgressStatus,
  ) : () {
    enrollments.mapInPlace(func(e : Types.Enrollment) : Types.Enrollment {
      if (e.courseId == courseId and e.studentPrincipal == studentPrincipal) {
        { e with progressStatus = newStatus }
      } else {
        e
      }
    });
  };

  // ── Revenue ──────────────────────────────────────────────────────────────

  public func getRevenueSummaries(
    courses : Map.Map<Nat, Types.Course>,
    enrollments : List.List<Types.Enrollment>,
  ) : [Types.RevenueSummary] {
    courses.values().map<Types.Course, Types.RevenueSummary>(func(course : Types.Course) : Types.RevenueSummary {
      let count = enrollments.filter(func(e : Types.Enrollment) : Bool {
        e.courseId == course.id
      }).size();
      {
        courseId = course.id;
        courseTitle = course.title;
        enrollmentCount = count;
        totalRevenue = count * course.price;
      }
    }).toArray();
  };

  // ── Instructor Profile ───────────────────────────────────────────────────

  public func getInstructorProfile(profile : ?Types.InstructorProfile) : ?Types.InstructorProfile {
    profile;
  };

  public func buildInstructorProfile(name : Text, bio : Text, photoUrl : Text) : Types.InstructorProfile {
    { name; bio; photoUrl };
  };
};
