import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Enrollment {
    progressStatus: ProgressStatus;
    studentPrincipal: Principal;
    enrolledAt: bigint;
    courseId: bigint;
}
export interface InstructorProfile {
    bio: string;
    name: string;
    photoUrl: string;
}
export interface RevenueSummary {
    totalRevenue: bigint;
    courseTitle: string;
    courseId: bigint;
    enrollmentCount: bigint;
}
export interface Course {
    id: bigint;
    title: string;
    thumbnailUrl: string;
    createdAt: bigint;
    durationHours: bigint;
    description: string;
    level: CourseLevel;
    modulesCount: bigint;
    price: bigint;
    videoUrl: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export enum CourseLevel {
    Beginner = "Beginner",
    Advanced = "Advanced",
    Intermediate = "Intermediate"
}
export enum ProgressStatus {
    InProgress = "InProgress",
    Completed = "Completed",
    NotStarted = "NotStarted"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createCourse(title: string, description: string, price: bigint, level: CourseLevel, durationHours: bigint, modulesCount: bigint, thumbnailUrl: string, videoUrl: string): Promise<Course>;
    createCourseCheckoutSession(courseId: bigint, successUrl: string, cancelUrl: string): Promise<string>;
    deleteCourse(id: bigint): Promise<void>;
    enrollAfterPayment(courseId: bigint, sessionId: string): Promise<void>;
    getAllEnrollments(): Promise<Array<Enrollment>>;
    getCallerUserRole(): Promise<UserRole>;
    getCourse(id: bigint): Promise<Course | null>;
    getInstructorProfile(): Promise<InstructorProfile | null>;
    getMyEnrollments(): Promise<Array<Enrollment>>;
    getRevenueSummaries(): Promise<Array<RevenueSummary>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    isCallerAdmin(): Promise<boolean>;
    isEnrolledInCourse(courseId: bigint): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    listCourses(): Promise<Array<Course>>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateCourse(id: bigint, title: string, description: string, price: bigint, level: CourseLevel, durationHours: bigint, modulesCount: bigint, thumbnailUrl: string, videoUrl: string): Promise<void>;
    updateInstructorProfile(name: string, bio: string, photoUrl: string): Promise<void>;
    updateMyProgressStatus(courseId: bigint, newStatus: ProgressStatus): Promise<void>;
}
