import BenefitsSection from "../components/page/home/BenefitsSection";
import HeroSection from "../components/page/home/HeroSection";
import QuestionsSection from "../components/page/home/QuestionsSection";
import AllServices from "../components/page/services/AllServices";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <AllServices />
      <QuestionsSection />
    </>
  );
}
