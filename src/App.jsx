import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import Workflow from "./components/Workflow";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import ReqCall from "./components/ReqCall/reqcall";
import { useRef, useState } from "react";
import SignUp from "./components/Auth/signUp";
import TermsAndConditions from "./components/TermsAndConditions";
import { GlobalProvider } from "./context/GlobalContext";
const App = () => {
  const [showAuth, setShowAuth] = useState(false);
  const scrollToPrice = useRef(null);
  console.log(showAuth)
  const scrollToRequestCallBack = useRef(null)
  return (
    <>
        <Navbar setShowAuth={setShowAuth} showAuth={showAuth} scrollToPrice={scrollToPrice}
        scrollToRequestCallBack={scrollToRequestCallBack}
        />

        <div className="max-w-7xl mx-auto pt-20 px-6">
          <HeroSection />
          <FeatureSection />
          <ReqCall  scrollToRequestCallBack={scrollToRequestCallBack}/>

          <Workflow />
          <Pricing scrollToPrice={scrollToPrice}/>
          <Testimonials />
          <Footer />
          <TermsAndConditions />
        </div>
        {showAuth && (
          <div className="flex fixed top-0 right-20">
            <SignUp showAuth={showAuth} setShowAuth={setShowAuth} />
          </div>
        )}
    </>
  );
};

export default App;
