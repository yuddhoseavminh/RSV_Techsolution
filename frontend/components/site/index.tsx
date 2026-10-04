import { CapabilityStrip } from "./capability-strip";
import { Capabilities } from "./capabilities";
import { ContactBand } from "./contact-band";
import { Faq } from "./faq";
import { Hero } from "./hero";
import { Industries } from "./industries";
import { Pricing } from "./pricing";
import { Process } from "./process";
import { Proof } from "./proof";
import { ServicesBand } from "./services-band";
import { WorkBand } from "./work-band";

/**
 * Landing page.
 *
 * Section ids are load-bearing: the site header, footer and search modal
 * deep-link to `#home`, `#features`, `#services`, `#portfolio`, `#pricing`,
 * `#faq` and `#contact`. Do not rename them without updating those components.
 */
export function LandingPage() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <Capabilities />
      <ServicesBand />
      <Industries />
      <WorkBand />
      <Process />
      <Proof />
      <Pricing />
      <Faq />
      <ContactBand />
    </>
  );
}
