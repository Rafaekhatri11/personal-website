import Image from "next/image";
import { ViewTransition } from "react";
import type { Project } from "@/content/projects";

/** Project cover image. Shares a view-transition name so it morphs between the card and the case-study hero. */
export function ProjectCover({
  project,
  sizes,
  priority = false,
  className = "",
  imgClassName = "",
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
      <div className={`relative overflow-hidden bg-sand ${className}`}>
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover object-left-top ${imgClassName}`}
        />
      </div>
    </ViewTransition>
  );
}
