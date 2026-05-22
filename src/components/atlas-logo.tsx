import { cn } from "@/lib/utils";

type AtlasLogoProps = {
  className?: string;
  /** Height in Tailwind scale, e.g. h-7 */
  heightClass?: string;
};

export function AtlasLogo({ className, heightClass = "h-7" }: AtlasLogoProps) {
  return (
    <img
      src="/atlas-logo.png"
      alt="Atlas"
      className={cn(
        heightClass,
        "w-auto shrink-0 object-contain object-left",
        "invert dark:invert-0",
        className,
      )}
    />
  );
}
