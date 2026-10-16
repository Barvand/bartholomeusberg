import HomePage from "./homepage";
import Navigation from "./components/navigation";

export const metadata = { alternates: { canonical: "/" } };

const personSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Bartholomeus Berg",
  description:
    "Nettsider, webapplikasjoner og praktisk IT for små bedrifter i Arna og Bergen. PC-hjelp for privatpersoner.",
  areaServed: [
    { "@type": "Place", name: "Arna, Bergen, Norge" },
    { "@type": "City", name: "Bergen, Norge" },
  ],
  url: "https://bartholomeusberg.com",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Navigation />
      <HomePage />
    </>
  );
}
