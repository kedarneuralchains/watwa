import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center px-5 pt-24 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-6 font-display text-6xl font-semibold tracking-tight md:text-8xl">
          This pipe runs <span className="font-serif font-normal italic text-accent">dry.</span>
        </h1>
        <p className="mt-6 text-muted">The page you were looking for isn’t here.</p>
        <div className="mt-10 flex justify-center gap-4">
          <Button href="/">Home</Button>
          <Button href="/solutions" variant="ghost">
            Solutions
          </Button>
        </div>
      </div>
    </section>
  );
}
