import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductVariants from "./components/ProductVariants";
import OrderSection from "./components/OrderSection";
import WhyChooseUs from "./components/WhyChooseUs";
import TargetAudience from "./components/TargetAudience";
import CountdownOffer from "./components/CountdownOffer";
import TrustBadges from "./components/TrustBadges";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import StickyCallButton from "./components/StickyCallButton";
import TrustBar from "./components/TrustBar";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import RequireAuth from "./admin/RequireAuth";

const Home = () => (
  <div className="min-h-screen bg-cream">
    <Header />
    <Hero />
    <TrustBar />
    <ProductVariants />
    <WhyChooseUs />
    <TargetAudience />
    <CountdownOffer />
    <OrderSection />
    <TrustBadges />
    <FAQ />
    <Footer />
    <StickyCallButton />
  </div>
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminDashboard />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default App;
