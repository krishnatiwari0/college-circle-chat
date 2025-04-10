
import AppLayout from "@/components/AppLayout";
import LandingHero from "@/components/LandingHero";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";

const Index = () => {
  return (
    <AppLayout>
      <LandingHero />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </AppLayout>
  );
};

export default Index;
