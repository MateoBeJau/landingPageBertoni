import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsStrip from "@/components/StatsStrip";
import IndividualGallery from "@/components/IndividualGallery";
import SeriesGallery from "@/components/SeriesGallery";
import EnsaiosSection from "@/components/EnsaiosSection";
import ContactBanner from "@/components/ContactBanner";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function TenantHome() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsStrip />
        <IndividualGallery />
        <SeriesGallery />
        <EnsaiosSection />
        <ContactBanner />
        <AboutSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
