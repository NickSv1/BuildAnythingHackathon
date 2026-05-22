import { useState } from "react";
import { cn } from "@/lib/utils";

export function AvatarImage({
  src,
  alt,
  fallback,
  className,
}: {
  src: string;
  alt: string;
  fallback: React.ReactNode;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className={cn("grid place-items-center overflow-hidden", className)}>{fallback}</div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn("h-full w-full object-cover", className)}
      onError={() => setFailed(true)}
      loading="lazy"
      decoding="async"
    />
  );
}
