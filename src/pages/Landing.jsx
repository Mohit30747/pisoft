import HeroSection from '../components/landing/HeroSection.jsx'
import FeaturesSection from '../components/landing/FeaturesSection.jsx'
import AISection from '../components/landing/AISection.jsx'
import IndustriesSection from '../components/landing/IndustriesSection.jsx'
import StatsSection from '../components/landing/StatsSection.jsx'
import HowItWorksSection from '../components/landing/HowItWorksSection.jsx'
import TestimonialsSection from '../components/landing/TestimonialsSection.jsx'
import PricingSection from '../components/landing/PricingSection.jsx'
import FAQSection from '../components/landing/FAQSection.jsx'
import NewsletterSection from '../components/landing/NewsletterSection.jsx'
import Footer from '../components/landing/Footer.jsx'

export default function Landing() {
  return (
    <div className="noise">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <AISection />
      <HowItWorksSection />
      <IndustriesSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
