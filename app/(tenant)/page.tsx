import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import IndividualGallery from "@/components/IndividualGallery";
import SeriesGallery from "@/components/SeriesGallery";
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
        <IndividualGallery />
        <SeriesGallery />
        <ContactBanner />
        <AboutSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
