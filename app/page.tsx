import HeroSection from "@/components/HeroSection";
import DailyDeals from "@/components/DailyDeals";
import Workflow from "@/components/Workflow";
import FAQ from "@/components/FAQ";
import TrustSignals from "@/components/TrustSignals";

export default function Home() {
  return (
    <main className="main-container">
      <HeroSection />
      <DailyDeals />
      <Workflow />
      <FAQ />
      <TrustSignals />
    </main>
  );
}
