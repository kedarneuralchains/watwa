import { BrandsSection } from "@/components/sections/BrandsSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FoundersSection } from "@/components/sections/FoundersSection";
import { Hero } from "@/components/sections/Hero";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { KeematSection } from "@/components/sections/KeematSection";
import { SolutionsRail } from "@/components/sections/SolutionsRail";
import { JsonLd } from "@/components/seo/JsonLd";
import { solutionsJsonLd } from "@/lib/site";

export default function Home() {
  return (
    <>
      <JsonLd data={solutionsJsonLd()} />
      <Hero />
      <FoundersSection />
      <BrandsSection />
      <SolutionsRail />
      <ImpactSection />
      <KeematSection />
      <CtaSection />
    </>
  );
}
