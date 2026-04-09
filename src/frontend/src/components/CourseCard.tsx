import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Course } from "@/types";
import { formatPrice, getLevelLabel } from "@/types";
import { Link } from "@tanstack/react-router";
import { BarChart2, BookOpen, Clock } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

const levelColors: Record<string, string> = {
  Beginner: "bg-primary/10 text-primary border-primary/20",
  Intermediate: "bg-accent/10 text-accent border-accent/20",
  Advanced: "bg-secondary text-secondary-foreground border-border",
};

export function CourseCard({ course }: CourseCardProps) {
  const level = getLevelLabel(course.level);
  const levelClass =
    levelColors[level] ?? "bg-secondary text-secondary-foreground";

  return (
    <Card
      className="group flex flex-col overflow-hidden border border-border shadow-card hover:shadow-elevated transition-smooth hover:-translate-y-0.5 bg-card"
      data-ocid="course-card"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-video bg-muted">
        {course.thumbnailUrl ? (
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
            <BookOpen className="size-12 text-primary/40" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${levelClass}`}
          >
            {level}
          </span>
        </div>
      </div>

      <CardContent className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-display text-base font-semibold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
          {course.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {Number(course.durationHours)}h
          </span>
          <span className="flex items-center gap-1.5">
            <BarChart2 className="size-3.5" />
            {Number(course.modulesCount)} modules
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between px-5 pb-5 pt-0 gap-3">
        <span className="font-display text-xl font-bold text-foreground">
          {formatPrice(course.price)}
        </span>
        <Button
          asChild
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          data-ocid="course-card-cta"
        >
          <Link to="/courses/$id" params={{ id: String(course.id) }}>
            View Course
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
