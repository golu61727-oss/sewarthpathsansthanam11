import { useTranslations } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ImpactStats from "@/components/home/ImpactStats";
import ProgramsSection from "@/components/home/ProgramsSection";
import DonationCTA from "@/components/home/DonationCTA";
import TrusteesSection from "@/components/home/TrusteesSection";
import MembershipPreview from "@/components/home/MembershipPreview";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ImpactStats />
        <ProgramsSection />
        <DonationCTA />
        <MembershipPreview />
        <TrusteesSection />
      </main>
      <Footer />
    </>
  );
}
