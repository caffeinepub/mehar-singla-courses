export type CourseLevel =
  | { __kind__: "Beginner" }
  | { __kind__: "Intermediate" }
  | { __kind__: "Advanced" };

export type ProgressStatus =
  | { __kind__: "NotStarted" }
  | { __kind__: "InProgress" }
  | { __kind__: "Completed" };

export interface Course {
  id: bigint;
  title: string;
  description: string;
  price: bigint;
  level: CourseLevel;
  durationHours: bigint;
  modulesCount: bigint;
  thumbnailUrl: string;
  videoUrl: string;
  createdAt: bigint;
}

export interface Enrollment {
  courseId: bigint;
  studentPrincipal: unknown;
  enrolledAt: bigint;
  progressStatus: ProgressStatus;
}

export interface InstructorProfile {
  name: string;
  bio: string;
  photoUrl: string;
}

export interface RevenueSummary {
  courseId: bigint;
  courseTitle: string;
  enrollmentCount: bigint;
  totalRevenue: bigint;
}

export type UserRole =
  | { __kind__: "admin" }
  | { __kind__: "user" }
  | { __kind__: "guest" };

export function getLevelLabel(level: CourseLevel): string {
  return level.__kind__;
}

export function getProgressLabel(status: ProgressStatus): string {
  switch (status.__kind__) {
    case "NotStarted":
      return "Not Started";
    case "InProgress":
      return "In Progress";
    case "Completed":
      return "Completed";
  }
}

export function formatPrice(price: bigint): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(price));
}
