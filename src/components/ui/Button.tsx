import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "light";
  external?: boolean;
  className?: string;
};

const styles = {
  primary:
    "bg-accent text-white hover:bg-fg shadow-[0_12px_36px_-12px_rgb(10_117_147/0.65)]",
  ghost: "glass text-fg hover:border-accent/60 hover:text-accent",
  /** For use on a solid accent background. */
  light: "bg-white text-accent hover:bg-fg hover:text-white shadow-[0_12px_36px_-12px_rgb(0_0_0/0.3)]",
};

/** Pill button with a sliding arrow. External links open in a new tab. */
export function Button({ href, children, variant = "primary", external, className = "" }: Props) {
  const cls = `group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-500 ease-water ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden="true" className="transition-transform duration-500 ease-water group-hover:translate-x-1">
        →
      </span>
    </>
  );
  if (external || href.startsWith("http") || href.startsWith("tel:") || href.endsWith(".pdf")) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
