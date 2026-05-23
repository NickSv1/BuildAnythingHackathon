import { cn } from "@/lib/utils";

type AtlasLogoProps = {
  className?: string;
  /** Height in Tailwind scale, e.g. h-7 */
  heightClass?: string;
};

const imgClass = (heightClass: string, className?: string) =>
  cn(heightClass, "w-auto shrink-0 object-contain object-left", className);

export function AtlasLogo({ className, heightClass = "h-7" }: AtlasLogoProps) {
  return (
    <>
      <img
        src="/atlas-logo-light.png"
        alt="Atlas"
        className={cn(imgClass(heightClass, className), "dark:hidden")}
      />
      <img
        src="/atlas-logo.png"
        alt="Atlas"
        className={cn(imgClass(heightClass, className), "hidden dark:block")}
      />
    </>
  );
}
