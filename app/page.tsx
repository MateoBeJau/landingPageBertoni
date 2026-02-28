import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import IndividualGallery from "@/components/IndividualGallery";
import SeriesGallery from "@/components/SeriesGallery";
import AboutSection from "@/components/AboutSection";
import ContactBanner from "@/components/ContactBanner";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
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
