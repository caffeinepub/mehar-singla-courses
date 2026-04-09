import type { backendInterface } from "../backend";
import { CourseLevel, ProgressStatus, UserRole } from "../backend";

export const mockBackend: backendInterface = {
  _initializeAccessControl: async () => undefined,

  assignCallerUserRole: async (_user, _role) => undefined,

  createCheckoutSession: async () => "mock-session-id",

  createCourse: async (title, description, price, level, durationHours, modulesCount, thumbnailUrl, videoUrl) => ({
    id: BigInt(10),
    title,
    description,
    price,
    level,
    durationHours,
    modulesCount,
    thumbnailUrl,
    videoUrl,
    createdAt: BigInt(Date.now()),
  }),

  createCourseCheckoutSession: async () => "mock-course-session-id",

  deleteCourse: async () => undefined,

  enrollAfterPayment: async () => undefined,

  getAllEnrollments: async () => [
    {
      progressStatus: ProgressStatus.InProgress,
      studentPrincipal: { toText: () => "aaaaa-bbbbb" } as any,
      enrolledAt: BigInt(Date.now()),
      courseId: BigInt(1),
    },
    {
      progressStatus: ProgressStatus.Completed,
      studentPrincipal: { toText: () => "ccccc-ddddd" } as any,
      enrolledAt: BigInt(Date.now()),
      courseId: BigInt(2),
    },
  ],

  getCallerUserRole: async () => UserRole.guest,

  getCourse: async () => ({
    id: BigInt(1),
    title: "Mastering React & TypeScript",
    thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    createdAt: BigInt(Date.now()),
    durationHours: BigInt(12),
    description: "A deep dive into modern React patterns with TypeScript.",
    level: CourseLevel.Intermediate,
    modulesCount: BigInt(8),
    price: BigInt(4999),
    videoUrl: "https://example.com/video",
  }),

  getInstructorProfile: async () => ({
    bio: "Mehar Singla is a passionate technical trainer with 8+ years of experience teaching web development, cloud computing, and software architecture to thousands of students worldwide.",
    name: "Mehar Singla",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  }),

  getMyEnrollments: async () => [
    {
      progressStatus: ProgressStatus.InProgress,
      studentPrincipal: { toText: () => "aaaaa-bbbbb" } as any,
      enrolledAt: BigInt(Date.now()),
      courseId: BigInt(1),
    },
  ],

  getRevenueSummaries: async () => [
    { totalRevenue: BigInt(149700), courseTitle: "Mastering React & TypeScript", courseId: BigInt(1), enrollmentCount: BigInt(30) },
    { totalRevenue: BigInt(89800), courseTitle: "Node.js Microservices", courseId: BigInt(2), enrollmentCount: BigInt(18) },
    { totalRevenue: BigInt(62500), courseTitle: "AWS Cloud Practitioner", courseId: BigInt(3), enrollmentCount: BigInt(25) },
  ],

  getStripeSessionStatus: async () => ({
    __kind__: "completed",
    completed: { userPrincipal: "aaaaa-bbbbb", response: "ok" },
  }),

  isCallerAdmin: async () => false,

  isEnrolledInCourse: async () => false,

  isStripeConfigured: async () => true,

  listCourses: async () => [
    {
      id: BigInt(1),
      title: "Mastering React & TypeScript",
      thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
      createdAt: BigInt(Date.now()),
      durationHours: BigInt(12),
      description: "Build production-ready apps with React 18 and TypeScript. Covers hooks, performance patterns, and advanced component design.",
      level: CourseLevel.Intermediate,
      modulesCount: BigInt(8),
      price: BigInt(4999),
      videoUrl: "https://example.com/video1",
    },
    {
      id: BigInt(2),
      title: "Node.js Microservices Architecture",
      thumbnailUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
      createdAt: BigInt(Date.now()),
      durationHours: BigInt(15),
      description: "Design and deploy scalable microservices with Node.js, Docker, and Kubernetes. Real-world project included.",
      level: CourseLevel.Advanced,
      modulesCount: BigInt(10),
      price: BigInt(5999),
      videoUrl: "https://example.com/video2",
    },
    {
      id: BigInt(3),
      title: "AWS Cloud Practitioner Essentials",
      thumbnailUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80",
      createdAt: BigInt(Date.now()),
      durationHours: BigInt(8),
      description: "Pass the AWS Cloud Practitioner exam and confidently work with core AWS services. Includes practice tests.",
      level: CourseLevel.Beginner,
      modulesCount: BigInt(6),
      price: BigInt(2999),
      videoUrl: "https://example.com/video3",
    },
    {
      id: BigInt(4),
      title: "Python for Data Science & ML",
      thumbnailUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80",
      createdAt: BigInt(Date.now()),
      durationHours: BigInt(20),
      description: "From NumPy to neural networks — a comprehensive journey into Python-powered data science and machine learning.",
      level: CourseLevel.Beginner,
      modulesCount: BigInt(14),
      price: BigInt(6999),
      videoUrl: "https://example.com/video4",
    },
    {
      id: BigInt(5),
      title: "System Design Interview Mastery",
      thumbnailUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
      createdAt: BigInt(Date.now()),
      durationHours: BigInt(10),
      description: "Crack system design interviews at top tech companies. Covers distributed systems, databases, and scalability patterns.",
      level: CourseLevel.Advanced,
      modulesCount: BigInt(9),
      price: BigInt(7999),
      videoUrl: "https://example.com/video5",
    },
    {
      id: BigInt(6),
      title: "Docker & Kubernetes for Developers",
      thumbnailUrl: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&q=80",
      createdAt: BigInt(Date.now()),
      durationHours: BigInt(11),
      description: "Containerize, orchestrate, and deploy apps like a pro. From Docker basics to Kubernetes production deployments.",
      level: CourseLevel.Intermediate,
      modulesCount: BigInt(7),
      price: BigInt(4499),
      videoUrl: "https://example.com/video6",
    },
  ],

  setStripeConfiguration: async () => undefined,

  transform: async (input) => ({
    status: BigInt(200),
    body: input.response.body,
    headers: input.response.headers,
  }),

  updateCourse: async () => undefined,

  updateInstructorProfile: async () => undefined,

  updateMyProgressStatus: async () => undefined,
};
