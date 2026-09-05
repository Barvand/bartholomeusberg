import AboutSection from "./components/home/about-section";
import BusinessItSection from "./components/home/business-it-section";
import ContactSection from "./components/home/contact-section";
import HeroSection from "./components/home/hero-section";
import OfferSection from "./components/home/offer-section";
import ReferencesSection from "./components/home/references-section";
import ServicesSection from "./components/home/services-section";
import SoftwareSection from "./components/home/software-section";
import Navigation from "./components/navigation";

export const metadata = { alternates: { canonical: "/" } };

const personSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "BART VDB",
  description:
    "IT, nettsider og teknisk hjelp for små bedrifter og privatpersoner i Bergen.",
  areaServed: "Bergen",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bergen",
    addressCountry: "NO",
  },
  url: "https://bartvandenberg.no",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Navigation />
      <main>
        <HeroSection />
        <OfferSection />
        <ServicesSection />
        <BusinessItSection />
        <SoftwareSection />
        <ReferencesSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}
