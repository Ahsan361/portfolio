import type { ReactNode } from "react";
import { useReveal } from "./use-reveal";

export function RevealHeading({
  id,
  className,
  children,
}: {
  id: string;
  className: string;
  children: ReactNode;
}) {
  const ref = useReveal<HTMLHeadingElement>();
  return (
    <h2 id={id} ref={ref} className={`reveal-mask ${className}`}>
      <span>{children}</span>
    </h2>
  );
}
