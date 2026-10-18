"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { CONTACT } from "@/lib/contact";
import { NAV } from "@/lib/nav";

/**
 * Fixed header that turns to glass once the page scrolls. The mobile menu is
 * button-toggled, Escape closes it, and it closes on navigation (it is open
 * only for the path it was opened on).
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean) => setOpenOn(next ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-water ${
        scrolled || open ? "border-b border-fg/5 bg-canvas/75 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" aria-label="Watwa Group home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active ? "bg-fg/10 text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={CONTACT.whatsappChat}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-fg sm:inline-flex"
          >
            Talk to us
          </a>
          <button
            type="button"
            className="relative grid h-11 w-11 place-items-center rounded-full glass lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            <span className={`absolute h-px w-5 bg-fg transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-px w-5 bg-fg transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute h-px w-5 bg-fg transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-fg/5 px-5 pb-8 pt-4 lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="border-b border-fg/5 py-4 font-display text-2xl text-fg">
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={CONTACT.whatsappChat}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 font-semibold text-white"
        >
          WhatsApp us
        </a>
      </div>
    </header>
  );
}
