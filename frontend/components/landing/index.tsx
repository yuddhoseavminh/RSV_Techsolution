"use client";

import { BackToTop } from "./primitives/back-to-top";
import { ScrollProgress } from "./primitives/scroll-progress";
import { useLandingContent } from "./use-landing-content";
import { Capabilities } from "./sections/capabilities";
import { Cta } from "./sections/cta";
import { Faq } from "./sections/faq";
import { Hero } from "./sections/hero";
import { LogoStrip } from "./sections/logo-strip";
import { Pricing } from "./sections/pricing";
import { Proof } from "./sections/proof";
import { Services } from "./sections/services";
import { Work } from "./sections/work";

/**
 * Landing page.
 *
 * Section ids are load-bearing: the site header, footer, search modal and
 * solutions menu all deep-link to `#home`, `#features`, `#services`,
 * `#portfolio`, `#pricing`, `#faq` and `#contact`. Do not rename them without
 * updating those components.
 */
export function LandingPage() {
  const content = useLandingContent();

  return (
    <>
      <ScrollProgress />
      <Hero {...content.hero} />
      <LogoStrip {...content.logos} />
      <Capabilities {...content.capabilities} />
      <Services {...content.services} />
      <Work {...content.work} />
      <Proof {...content.proof} />
      <Pricing {...content.pricing} />
      <Faq {...content.faq} />
      <Cta {...content.cta} />
      <BackToTop />
    </>
  );
}
