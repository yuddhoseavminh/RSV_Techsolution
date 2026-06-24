import { PublicLayout } from "@/components/layout/public-layout";
import {
  ContactCta,
  FeaturedProjects,
  HeroSection,
  LatestNews,
  ServicesPreview,
  StatsBand,
  TechnologiesBand,
  Testimonials,
  WhyChooseUs
} from "@/components/sections/home-sections";

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <StatsBand />
      <ServicesPreview />
      <WhyChooseUs />
      <FeaturedProjects />
      <TechnologiesBand />
      <Testimonials />
      <LatestNews />
      <ContactCta />
    </PublicLayout>
  );
}
