import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductVariants from "./components/ProductVariants";
import WhyChooseUs from "./components/WhyChooseUs";
import TargetAudience from "./components/TargetAudience";
import CountdownOffer from "./components/CountdownOffer";
import TrustBadges from "./components/TrustBadges";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import StickyCallButton from "./components/StickyCallButton";
import TrustBar from "./components/TrustBar";

const App = () => {

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <Hero />
      <TrustBar />
      <ProductVariants />
      <WhyChooseUs />
      <TargetAudience />
      <CountdownOffer />
      <TrustBadges />
      <FAQ />
      <Footer />
      <StickyCallButton />
    </div>
  )
}

export default App
