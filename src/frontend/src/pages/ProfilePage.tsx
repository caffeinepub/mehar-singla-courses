import { createActor } from "@/backend";
import type { Backend } from "@/backend";
import type {
  Course as BackendCourse,
  InstructorProfile as BackendProfile,
} from "@/backend";
import { CourseCard } from "@/components/CourseCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import type { Course, InstructorProfile } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  Camera,
  CheckCircle2,
  Edit3,
  GraduationCap,
  Star,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ── Helpers ───────────────────────────────────────────────────────────────────

function adaptCourses(raw: BackendCourse[]): Course[] {
  return raw as unknown as Course[];
}

function adaptProfile(raw: BackendProfile | null): InstructorProfile | null {
  return raw as InstructorProfile | null;
}

// ── Stats ────────────────────────────────────────────────────────────────────

const STATS = [
  { icon: BookOpen, label: "Courses", value: "12+" },
  { icon: Users, label: "Students", value: "2,400+" },
  { icon: Star, label: "Avg. Rating", value: "4.9" },
  { icon: Trophy, label: "Years Exp.", value: "8+" },
];

// ── Skeleton ─────────────────────────────────────────────────────────────────

function ProfileSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
        <Skeleton className="size-36 rounded-full shrink-0" />
        <div className="flex-1 space-y-3 w-full">
          <Skeleton className="h-9 w-56" />
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {["s1", "s2", "s3", "s4"].map((id) => (
          <Skeleton key={id} className="h-24 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

// ── Photo Upload ─────────────────────────────────────────────────────────────

interface PhotoUploadProps {
  currentUrl: string;
  onUpload: (url: string) => void;
  disabled?: boolean;
}

function PhotoUpload({ currentUrl, onUpload, disabled }: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(currentUrl);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2 MB");
      return;
    }

    setUploading(true);
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      setPreview(dataUrl);
      onUpload(dataUrl);
      toast.success("Photo ready — save profile to apply");
    } catch {
      toast.error("Could not read the image — please try again");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative group">
        <Avatar className="size-32 ring-4 ring-primary/20 ring-offset-2 ring-offset-background">
          <AvatarImage
            src={preview}
            alt="Profile photo"
            className="object-cover"
          />
          <AvatarFallback className="bg-primary/10 text-primary text-4xl font-display font-bold">
            MS
          </AvatarFallback>
        </Avatar>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || uploading}
          aria-label="Change profile photo"
          className="absolute inset-0 flex items-center justify-center rounded-full bg-foreground/40 opacity-0 group-hover:opacity-100 transition-smooth cursor-pointer disabled:cursor-not-allowed"
        >
          {uploading ? (
            <LoadingSpinner size="sm" />
          ) : (
            <Camera className="size-6 text-white" />
          )}
        </button>
      </div>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled || uploading}
        className="text-xs text-primary hover:underline transition-colors disabled:opacity-50"
        data-ocid="photo-upload-trigger"
      >
        {uploading ? "Processing…" : "Change photo"}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        data-ocid="photo-upload-input"
      />
    </div>
  );
}

// ── Edit Form ─────────────────────────────────────────────────────────────────

interface EditFormProps {
  profile: InstructorProfile;
  onClose: () => void;
}

function EditProfileForm({ profile, onClose }: EditFormProps) {
  const { actor } = useActor<Backend>(createActor);
  const queryClient = useQueryClient();

  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [photoUrl, setPhotoUrl] = useState(profile.photoUrl);

  const { mutate: saveProfile, isPending } = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      await actor.updateInstructorProfile(name.trim(), bio.trim(), photoUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructorProfile"] });
      toast.success("Profile updated!");
      onClose();
    },
    onError: () => {
      toast.error("Failed to save profile — please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    saveProfile();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="border border-primary/20 shadow-elevated bg-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Edit Profile
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              disabled={isPending}
              aria-label="Close edit form"
              data-ocid="edit-form-close"
            >
              <X className="size-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo */}
            <div className="flex justify-center">
              <PhotoUpload
                currentUrl={photoUrl}
                onUpload={setPhotoUrl}
                disabled={isPending}
              />
            </div>

            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                disabled={isPending}
                maxLength={80}
                data-ocid="edit-name-input"
              />
            </div>

            {/* Bio */}
            <div className="space-y-1.5">
              <Label htmlFor="edit-bio">Bio</Label>
              <Textarea
                id="edit-bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell students about yourself..."
                rows={5}
                disabled={isPending}
                maxLength={600}
                className="resize-none"
                data-ocid="edit-bio-input"
              />
              <p className="text-xs text-muted-foreground text-right">
                {bio.length}/600
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isPending}
                data-ocid="edit-form-cancel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending || !name.trim()}
                className="gap-2"
                data-ocid="edit-form-save"
              >
                {isPending ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <CheckCircle2 className="size-4" />
                )}
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { isAdmin } = useAuth();
  const { actor, isFetching } = useActor<Backend>(createActor);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile
  const { data: rawProfile, isLoading: profileLoading } = useQuery({
    queryKey: ["instructorProfile"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getInstructorProfile();
      return adaptProfile(result);
    },
    enabled: !!actor && !isFetching,
  });

  // Fetch courses
  const { data: rawCourses, isLoading: coursesLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.listCourses();
      return adaptCourses(result);
    },
    enabled: !!actor && !isFetching,
  });

  const courses: Course[] = rawCourses ?? [];
  const isLoading = profileLoading || isFetching;

  // Derive profile — use defaults when not yet set
  const profile: InstructorProfile = rawProfile ?? {
    name: "Mehar Singla",
    bio: "Passionate technical trainer with 8+ years of industry experience. I specialise in making complex concepts approachable — from web fundamentals to advanced system design. My courses are project-driven, practical, and designed to get you job-ready fast.",
    photoUrl: "",
  };

  if (isLoading && !rawProfile) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* ── Hero ── */}
      <section className="hero-gradient border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="shrink-0"
            >
              <Avatar className="size-36 ring-4 ring-primary/25 ring-offset-4 ring-offset-background shadow-elevated">
                <AvatarImage
                  src={profile.photoUrl}
                  alt={profile.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-primary/10 text-primary text-5xl font-display font-bold">
                  MS
                </AvatarFallback>
              </Avatar>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex-1 min-w-0 text-center sm:text-left"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-2">
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                  {profile.name}
                </h1>
                {isAdmin && !isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="gap-1.5 border-primary/30 text-primary hover:bg-primary/5 hover:text-primary shrink-0"
                    data-ocid="edit-profile-btn"
                  >
                    <Edit3 className="size-3.5" />
                    Edit Profile
                  </Button>
                )}
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                <GraduationCap className="size-4 text-accent shrink-0" />
                <span className="text-base font-medium text-accent">
                  Technical Trainer
                </span>
                <Badge
                  variant="secondary"
                  className="text-xs font-normal hidden sm:inline-flex"
                >
                  Instructor
                </Badge>
              </div>

              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                {profile.bio}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Edit Form ── */}
      {isEditing && (
        <section className="border-b border-border bg-muted/30">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
            <EditProfileForm
              profile={profile}
              onClose={() => setIsEditing(false)}
            />
          </div>
        </section>
      )}

      {/* ── Stats ── */}
      <section className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.07 }}
              >
                <Card className="border border-border shadow-card text-center p-5 bg-background hover:shadow-elevated transition-smooth">
                  <div className="flex justify-center mb-2">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <stat.icon className="size-5 text-primary" />
                    </div>
                  </div>
                  <div className="font-display text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Courses ── */}
      <section className="bg-background flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mb-8"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-1">
              Courses by {profile.name}
            </h2>
            <p className="text-muted-foreground text-sm">
              Practical, project-driven courses to accelerate your tech career.
            </p>
          </motion.div>

          {coursesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {["g1", "g2", "g3", "g4", "g5", "g6"].map((id) => (
                <Skeleton key={id} className="h-64 rounded-xl" />
              ))}
            </div>
          ) : courses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
              data-ocid="no-courses-empty"
            >
              <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <BookOpen className="size-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                No courses yet
              </h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                Courses will appear here once they're published.
              </p>
              {isAdmin && (
                <Button
                  asChild
                  className="mt-5 gap-2"
                  data-ocid="create-course-cta"
                >
                  <a href="/admin">Create First Course</a>
                </Button>
              )}
            </motion.div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="courses-grid"
            >
              {courses.map((course, i) => (
                <motion.div
                  key={String(course.id)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
