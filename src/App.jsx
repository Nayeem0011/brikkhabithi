import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductVariants from "./components/ProductVariants";
import WhyChooseUs from "./components/WhyChooseUs";
import TargetAudience from "./components/TargetAudience";
import CountdownOffer from "./components/CountdownOffer";
import TrustBadges from "./components/TrustBadges";
import OrderForm from "./components/OrderForm";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import StickyCallButton from "./components/StickyCallButton";

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <Hero />
      <ProductVariants />
      <WhyChooseUs />
      <TargetAudience />
      <CountdownOffer />
      <TrustBadges />
      <OrderForm />
      <FAQ />
      <Footer />
      <StickyCallButton />
    </div>
  );
}
