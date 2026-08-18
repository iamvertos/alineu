import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Conditions } from "@/components/sections/Conditions";
import { WhyUs } from "@/components/sections/WhyUs";
import { TrustCta } from "@/components/sections/TrustCta";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { FloatingCta } from "@/components/sections/FloatingCta";
import { CLINIC } from "@/lib/clinic";

const TITLE = "AlineU Physiotherapy & Rehabilitation Center | Ashoknagar, MP";
const DESCRIPTION =
  "Physiotherapy in Ashoknagar for back, neck and knee pain, sports injury rehab, dry needling and shockwave therapy. Move Better. Recover Stronger. Book today.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: CLINIC.name,
  description: DESCRIPTION,
  telephone: "+91 94069 75017",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Pachhadi Kheda Rd, Soni Colony, Yadav Colony",
    addressLocality: "Ashoknagar",
    addressRegion: "Madhya Pradesh",
    postalCode: "473331",
    addressCountry: "IN",
  },
  medicalSpecialty: "Physiotherapy",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "11:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "18:00",
      closes: "20:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: 41,
  },
  sameAs: [CLINIC.instagram, CLINIC.facebook],
};

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Conditions />
        <WhyUs />
        <TrustCta />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </div>
  );
}
