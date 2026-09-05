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
  name: "Bartholomeus Berg",
  description:
    "Nettsider, PC-hjelp og praktisk IT-hjelp for små bedrifter og privatpersoner i Arna og Bergen.",
  areaServed: [
    { "@type": "Place", name: "Arna, Bergen, Norge" },
    { "@type": "City", name: "Bergen, Norge" },
  ],
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
