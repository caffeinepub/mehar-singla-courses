import {
  CourseLevel,
  ExternalBlob,
  ProgressStatus,
  createActor,
} from "@/backend";
import type { Backend } from "@/backend";
import type { Course, Enrollment, RevenueSummary } from "@/backend";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  DollarSign,
  Edit2,
  Plus,
  Trash2,
  TrendingUp,
  Upload,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ── Types ────────────────────────────────────────────────────────────────────

interface CourseFormData {
  title: string;
  description: string;
  price: string;
  level: CourseLevel;
  durationHours: string;
  modulesCount: string;
  videoUrl: string;
  thumbnailUrl: string;
}

const defaultForm: CourseFormData = {
  title: "",
  description: "",
  price: "",
  level: CourseLevel.Beginner,
  durationHours: "",
  modulesCount: "",
  videoUrl: "",
  thumbnailUrl: "",
};

// ── Summary Cards ─────────────────────────────────────────────────────────────

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  color: string;
  delay: number;
}

function SummaryCard({
  icon,
  label,
  value,
  sub,
  color,
  delay,
}: SummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card className="shadow-card border-border/60">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground font-body">{label}</p>
              <p className="text-3xl font-display font-bold text-foreground">
                {value}
              </p>
              {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
            </div>
            <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── Level Badge ───────────────────────────────────────────────────────────────

function LevelBadge({ level }: { level: CourseLevel }) {
  const map: Record<CourseLevel, string> = {
    [CourseLevel.Beginner]:
      "bg-accent/15 text-accent-foreground border-accent/30",
    [CourseLevel.Intermediate]: "bg-primary/15 text-primary border-primary/30",
    [CourseLevel.Advanced]:
      "bg-destructive/10 text-destructive border-destructive/30",
  };
  return (
    <Badge variant="outline" className={`text-xs ${map[level]}`}>
      {level}
    </Badge>
  );
}

// ── Progress Badge ────────────────────────────────────────────────────────────

function ProgressBadge({ status }: { status: ProgressStatus }) {
  const map: Record<ProgressStatus, { label: string; cls: string }> = {
    [ProgressStatus.NotStarted]: {
      label: "Not Started",
      cls: "bg-muted text-muted-foreground border-border",
    },
    [ProgressStatus.InProgress]: {
      label: "In Progress",
      cls: "bg-accent/15 text-accent-foreground border-accent/30",
    },
    [ProgressStatus.Completed]: {
      label: "Completed",
      cls: "bg-primary/15 text-primary border-primary/30",
    },
  };
  const { label, cls } = map[status];
  return (
    <Badge variant="outline" className={`text-xs ${cls}`}>
      {label}
    </Badge>
  );
}

// ── Thumbnail Upload ──────────────────────────────────────────────────────────

interface ThumbnailUploadProps {
  currentUrl: string;
  onUpload: (url: string) => void;
  disabled?: boolean;
}

function ThumbnailUpload({
  currentUrl,
  onUpload,
  disabled,
}: ThumbnailUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [preview, setPreview] = useState<string>(currentUrl);

  const handleFile = async (file: File) => {
    const objectURL = URL.createObjectURL(file);
    setPreview(objectURL);
    const bytes = new Uint8Array(await file.arrayBuffer());
    const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
      setProgress(pct);
    });
    const directUrl = blob.getDirectURL();
    onUpload(directUrl);
    setProgress(null);
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className={`relative flex items-center justify-center rounded-xl border-2 border-dashed border-border h-36 w-full overflow-hidden transition-smooth
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary/50 hover:bg-primary/5"}`}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Thumbnail preview"
              className="h-full w-full object-cover"
            />
            {!disabled && (
              <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-smooth">
                <Upload className="w-6 h-6 text-background" />
                <span className="ml-2 text-sm text-background font-medium">
                  Replace
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-muted-foreground">
            <Upload className="w-8 h-8 mx-auto mb-1" />
            <p className="text-sm">Click to upload thumbnail</p>
          </div>
        )}
        {progress !== null && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-border">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}

// ── Course Form Modal ─────────────────────────────────────────────────────────

interface CourseModalProps {
  open: boolean;
  course?: Course;
  onClose: () => void;
  onSave: (data: CourseFormData, courseId?: bigint) => Promise<void>;
  isSaving: boolean;
}

function CourseModal({
  open,
  course,
  onClose,
  onSave,
  isSaving,
}: CourseModalProps) {
  const isEdit = !!course;
  const [form, setForm] = useState<CourseFormData>(() =>
    course
      ? {
          title: course.title,
          description: course.description,
          price: String(Number(course.price)),
          level: course.level,
          durationHours: String(Number(course.durationHours)),
          modulesCount: String(Number(course.modulesCount)),
          videoUrl: course.videoUrl,
          thumbnailUrl: course.thumbnailUrl,
        }
      : defaultForm,
  );

  const set = <K extends keyof CourseFormData>(
    key: K,
    val: CourseFormData[K],
  ) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.title ||
      !form.price ||
      !form.durationHours ||
      !form.modulesCount
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    await onSave(form, course?.id);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {isEdit ? "Edit Course" : "Create New Course"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="e.g. React Masterclass"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                data-ocid="course-title-input"
                required
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                rows={3}
                placeholder="Describe what students will learn…"
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                data-ocid="course-description-input"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="price">Price (INR) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="1"
                placeholder="1499"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                data-ocid="course-price-input"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>Level</Label>
              <Select
                value={form.level}
                onValueChange={(v) => set("level", v as CourseLevel)}
              >
                <SelectTrigger data-ocid="course-level-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={CourseLevel.Beginner}>Beginner</SelectItem>
                  <SelectItem value={CourseLevel.Intermediate}>
                    Intermediate
                  </SelectItem>
                  <SelectItem value={CourseLevel.Advanced}>Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="durationHours">Duration (hours) *</Label>
              <Input
                id="durationHours"
                type="number"
                min="1"
                placeholder="12"
                value={form.durationHours}
                onChange={(e) => set("durationHours", e.target.value)}
                data-ocid="course-duration-input"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="modulesCount">Modules *</Label>
              <Input
                id="modulesCount"
                type="number"
                min="1"
                placeholder="8"
                value={form.modulesCount}
                onChange={(e) => set("modulesCount", e.target.value)}
                data-ocid="course-modules-input"
                required
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="videoUrl">Intro Video URL</Label>
              <Input
                id="videoUrl"
                type="url"
                placeholder="https://youtube.com/…"
                value={form.videoUrl}
                onChange={(e) => set("videoUrl", e.target.value)}
                data-ocid="course-video-input"
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Thumbnail Image</Label>
              <ThumbnailUpload
                currentUrl={form.thumbnailUrl}
                onUpload={(url) => set("thumbnailUrl", url)}
                disabled={isSaving}
              />
            </div>
          </div>
          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              data-ocid="course-save-btn"
            >
              {isSaving ? (
                <LoadingSpinner size="sm" />
              ) : isEdit ? (
                "Save Changes"
              ) : (
                "Create Course"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── Delete Confirm Dialog ─────────────────────────────────────────────────────

interface DeleteDialogProps {
  open: boolean;
  courseName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

function DeleteDialog({
  open,
  courseName,
  onConfirm,
  onCancel,
  isDeleting,
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Delete Course</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground text-sm py-2">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-foreground">"{courseName}"</span>?
          This action cannot be undone and will remove all associated
          enrollments.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            data-ocid="delete-confirm-btn"
          >
            {isDeleting ? <LoadingSpinner size="sm" /> : "Delete Course"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const { actor, isFetching } = useActor<Backend>(createActor);
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<Course | undefined>();

  // ── Queries ──────────────────────────────────────────────────────────────

  const { data: courses = [], isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["admin-courses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCourses();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: enrollments = [], isLoading: enrollmentsLoading } = useQuery<
    Enrollment[]
  >({
    queryKey: ["admin-enrollments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEnrollments();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: revenueSummaries = [], isLoading: revenueLoading } = useQuery<
    RevenueSummary[]
  >({
    queryKey: ["admin-revenue"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRevenueSummaries();
    },
    enabled: !!actor && !isFetching,
  });

  // ── Derived stats ─────────────────────────────────────────────────────────

  const totalRevenue = revenueSummaries.reduce(
    (sum, r) => sum + Number(r.totalRevenue),
    0,
  );
  const totalStudents = new Set(
    enrollments.map((e) => String(e.studentPrincipal)),
  ).size;

  // ── Mutations ──────────────────────────────────────────────────────────────

  const createMutation = useMutation({
    mutationFn: async ({ form }: { form: CourseFormData }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createCourse(
        form.title,
        form.description,
        BigInt(Number(form.price)),
        form.level,
        BigInt(Number(form.durationHours)),
        BigInt(Number(form.modulesCount)),
        form.thumbnailUrl,
        form.videoUrl,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      queryClient.invalidateQueries({ queryKey: ["admin-revenue"] });
      toast.success("Course created successfully!");
      setModalOpen(false);
    },
    onError: () => toast.error("Failed to create course."),
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      form,
      courseId,
    }: { form: CourseFormData; courseId: bigint }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateCourse(
        courseId,
        form.title,
        form.description,
        BigInt(Number(form.price)),
        form.level,
        BigInt(Number(form.durationHours)),
        BigInt(Number(form.modulesCount)),
        form.thumbnailUrl,
        form.videoUrl,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      queryClient.invalidateQueries({ queryKey: ["admin-revenue"] });
      toast.success("Course updated successfully!");
      setModalOpen(false);
      setEditCourse(undefined);
    },
    onError: () => toast.error("Failed to update course."),
  });

  const deleteMutation = useMutation({
    mutationFn: async (courseId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteCourse(courseId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      queryClient.invalidateQueries({ queryKey: ["admin-revenue"] });
      queryClient.invalidateQueries({ queryKey: ["admin-enrollments"] });
      toast.success("Course deleted.");
      setDeleteTarget(undefined);
    },
    onError: () => toast.error("Failed to delete course."),
  });

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleSave = async (form: CourseFormData, courseId?: bigint) => {
    if (courseId !== undefined) {
      await updateMutation.mutateAsync({ form, courseId });
    } else {
      await createMutation.mutateAsync({ form });
    }
  };

  const openCreate = () => {
    setEditCourse(undefined);
    setModalOpen(true);
  };

  const openEdit = (course: Course) => {
    setEditCourse(course);
    setModalOpen(true);
  };

  const isLoading = coursesLoading || enrollmentsLoading || revenueLoading;
  const isSaving = createMutation.isPending || updateMutation.isPending;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="bg-background min-h-screen">
      {/* Page Header */}
      <div className="bg-card border-b border-border shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Manage courses, track revenue, and monitor enrollments
              </p>
            </div>
            <Button
              onClick={openCreate}
              className="gap-2"
              data-ocid="create-course-btn"
            >
              <Plus className="w-4 h-4" />
              New Course
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Summary Cards */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SummaryCard
                icon={<BookOpen className="w-5 h-5 text-primary" />}
                label="Total Courses"
                value={String(courses.length)}
                sub="Published courses"
                color="bg-primary/10"
                delay={0}
              />
              <SummaryCard
                icon={<Users className="w-5 h-5 text-accent-foreground" />}
                label="Total Students"
                value={String(totalStudents)}
                sub={`${enrollments.length} enrollments`}
                color="bg-accent/10"
                delay={0.08}
              />
              <SummaryCard
                icon={
                  <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                }
                label="Total Revenue"
                value={new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(totalRevenue)}
                sub="All time earnings"
                color="bg-green-500/10"
                delay={0.16}
              />
            </div>

            {/* Tabs */}
            <Tabs defaultValue="courses">
              <TabsList className="bg-muted/50 border border-border">
                <TabsTrigger value="courses" data-ocid="tab-courses">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Courses
                </TabsTrigger>
                <TabsTrigger value="revenue" data-ocid="tab-revenue">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Revenue
                </TabsTrigger>
                <TabsTrigger value="enrollments" data-ocid="tab-enrollments">
                  <Users className="w-4 h-4 mr-2" />
                  Enrollments
                </TabsTrigger>
              </TabsList>

              {/* Courses Tab */}
              <TabsContent value="courses">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="shadow-card border-border/60">
                    <CardHeader className="pb-3 border-b border-border/50">
                      <CardTitle className="font-display text-lg">
                        All Courses
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {courses.length === 0 ? (
                        <div
                          className="flex flex-col items-center justify-center py-16 text-center px-4"
                          data-ocid="courses-empty"
                        >
                          <BookOpen className="w-12 h-12 text-muted-foreground/40 mb-3" />
                          <h3 className="font-display font-semibold text-foreground mb-1">
                            No courses yet
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Create your first course to get started
                          </p>
                          <Button
                            onClick={openCreate}
                            variant="outline"
                            className="gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Create Course
                          </Button>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-muted/30">
                                <TableHead>Course</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead className="text-right">
                                  Price
                                </TableHead>
                                <TableHead className="text-right">
                                  Enrolled
                                </TableHead>
                                <TableHead className="text-right">
                                  Actions
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {courses.map((course) => {
                                const enrollCount = enrollments.filter(
                                  (e) => e.courseId === course.id,
                                ).length;
                                return (
                                  <TableRow
                                    key={String(course.id)}
                                    className="hover:bg-muted/20 transition-colors"
                                    data-ocid={`course-row-${course.id}`}
                                  >
                                    <TableCell>
                                      <div className="flex items-center gap-3">
                                        {course.thumbnailUrl && (
                                          <img
                                            src={course.thumbnailUrl}
                                            alt={course.title}
                                            className="w-10 h-10 rounded-lg object-cover border border-border"
                                          />
                                        )}
                                        <div className="min-w-0">
                                          <p className="font-medium text-foreground truncate max-w-[220px]">
                                            {course.title}
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            {Number(course.durationHours)}h ·{" "}
                                            {Number(course.modulesCount)}{" "}
                                            modules
                                          </p>
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <LevelBadge level={course.level} />
                                    </TableCell>
                                    <TableCell className="text-right font-medium tabular-nums">
                                      {formatPrice(course.price)}
                                    </TableCell>
                                    <TableCell className="text-right tabular-nums text-muted-foreground">
                                      {enrollCount}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <div className="flex items-center justify-end gap-1">
                                        <Button
                                          size="icon"
                                          variant="ghost"
                                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                          onClick={() => openEdit(course)}
                                          aria-label="Edit course"
                                          data-ocid={`edit-course-${course.id}`}
                                        >
                                          <Edit2 className="w-4 h-4" />
                                        </Button>
                                        <Button
                                          size="icon"
                                          variant="ghost"
                                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                          onClick={() =>
                                            setDeleteTarget(course)
                                          }
                                          aria-label="Delete course"
                                          data-ocid={`delete-course-${course.id}`}
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Revenue Tab */}
              <TabsContent value="revenue">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="shadow-card border-border/60">
                    <CardHeader className="pb-3 border-b border-border/50">
                      <CardTitle className="font-display text-lg">
                        Revenue by Course
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {revenueSummaries.length === 0 ? (
                        <div
                          className="flex flex-col items-center py-16 text-center px-4"
                          data-ocid="revenue-empty"
                        >
                          <TrendingUp className="w-12 h-12 text-muted-foreground/40 mb-3" />
                          <p className="text-muted-foreground text-sm">
                            No revenue data yet
                          </p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-muted/30">
                                <TableHead>Course</TableHead>
                                <TableHead className="text-right">
                                  Enrollments
                                </TableHead>
                                <TableHead className="text-right">
                                  Revenue
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {revenueSummaries.map((rev) => (
                                <TableRow
                                  key={String(rev.courseId)}
                                  className="hover:bg-muted/20 transition-colors"
                                  data-ocid={`revenue-row-${rev.courseId}`}
                                >
                                  <TableCell className="font-medium text-foreground">
                                    {rev.courseTitle}
                                  </TableCell>
                                  <TableCell className="text-right tabular-nums text-muted-foreground">
                                    {String(rev.enrollmentCount)}
                                  </TableCell>
                                  <TableCell className="text-right tabular-nums font-semibold text-foreground">
                                    {new Intl.NumberFormat("en-IN", {
                                      style: "currency",
                                      currency: "INR",
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    }).format(Number(rev.totalRevenue))}
                                  </TableCell>
                                </TableRow>
                              ))}
                              {/* Totals row */}
                              <TableRow className="bg-muted/30 font-semibold border-t-2 border-border">
                                <TableCell className="text-foreground">
                                  Total
                                </TableCell>
                                <TableCell className="text-right tabular-nums text-foreground">
                                  {revenueSummaries.reduce(
                                    (s, r) => s + Number(r.enrollmentCount),
                                    0,
                                  )}
                                </TableCell>
                                <TableCell className="text-right tabular-nums text-foreground">
                                  {new Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  }).format(totalRevenue)}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Enrollments Tab */}
              <TabsContent value="enrollments">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="shadow-card border-border/60">
                    <CardHeader className="pb-3 border-b border-border/50">
                      <CardTitle className="font-display text-lg">
                        All Enrollments
                        <span className="ml-2 text-sm font-normal text-muted-foreground">
                          ({enrollments.length})
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {enrollments.length === 0 ? (
                        <div
                          className="flex flex-col items-center py-16 text-center px-4"
                          data-ocid="enrollments-empty"
                        >
                          <Users className="w-12 h-12 text-muted-foreground/40 mb-3" />
                          <p className="text-muted-foreground text-sm">
                            No enrollments yet
                          </p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-muted/30">
                                <TableHead>Student Principal</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Enrolled</TableHead>
                                <TableHead>Progress</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {enrollments.map((enrollment, idx) => {
                                const course = courses.find(
                                  (c) => c.id === enrollment.courseId,
                                );
                                const enrolledDate = new Date(
                                  Number(enrollment.enrolledAt) / 1_000_000,
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                });
                                const principalStr = String(
                                  enrollment.studentPrincipal,
                                );
                                const shortPrincipal =
                                  principalStr.length > 16
                                    ? `${principalStr.slice(0, 8)}…${principalStr.slice(-6)}`
                                    : principalStr;
                                return (
                                  <TableRow
                                    key={`${String(enrollment.studentPrincipal)}-${String(enrollment.courseId)}`}
                                    className="hover:bg-muted/20 transition-colors"
                                    data-ocid={`enrollment-row-${idx}`}
                                  >
                                    <TableCell>
                                      <code
                                        className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono text-foreground"
                                        title={principalStr}
                                      >
                                        {shortPrincipal}
                                      </code>
                                    </TableCell>
                                    <TableCell className="text-foreground font-medium">
                                      {course?.title ??
                                        `Course #${String(enrollment.courseId)}`}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                      {enrolledDate}
                                    </TableCell>
                                    <TableCell>
                                      <ProgressBadge
                                        status={enrollment.progressStatus}
                                      />
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>

      {/* Course Create/Edit Modal */}
      <CourseModal
        open={modalOpen}
        course={editCourse}
        onClose={() => {
          setModalOpen(false);
          setEditCourse(undefined);
        }}
        onSave={handleSave}
        isSaving={isSaving}
      />

      {/* Delete Confirmation */}
      {deleteTarget && (
        <DeleteDialog
          open={!!deleteTarget}
          courseName={deleteTarget.title}
          onConfirm={() => deleteMutation.mutate(deleteTarget.id)}
          onCancel={() => setDeleteTarget(undefined)}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
}
