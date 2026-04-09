module {
  public type CourseLevel = {
    #Beginner;
    #Intermediate;
    #Advanced;
  };

  public type Course = {
    id : Nat;
    title : Text;
    description : Text;
    price : Nat; // in cents
    level : CourseLevel;
    durationHours : Nat;
    modulesCount : Nat;
    thumbnailUrl : Text;
    videoUrl : Text;
    createdAt : Int;
  };

  public type ProgressStatus = {
    #NotStarted;
    #InProgress;
    #Completed;
  };

  public type Enrollment = {
    courseId : Nat;
    studentPrincipal : Principal;
    enrolledAt : Int;
    progressStatus : ProgressStatus;
  };

  public type InstructorProfile = {
    name : Text;
    bio : Text;
    photoUrl : Text;
  };

  public type RevenueSummary = {
    courseId : Nat;
    courseTitle : Text;
    enrollmentCount : Nat;
    totalRevenue : Nat; // in cents
  };
};
