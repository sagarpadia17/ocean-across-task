import { sessionManager } from "@/hooks";
import OnboardingImage from "@/assets/onboarding-image.svg";
import Carrot from "@/assets/carrot.svg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
const Onboarding = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    sessionManager.completeOnboarding();
    navigate("/signin", { replace: true });
  };
  return (
    <div className=" flex h-screen items-center justify-center bg-[#53B175]">
      <div className="relative flex flex-col items-center justify-center gap-4 w-full lg:max-w-lg h-screen lg:max-h-[calc(100vh-64px)] lg:rounded-xl">
        <img
          src={OnboardingImage}
          alt="Onboarding"
          className="w-full h-screen lg:max-h-[calc(100vh-64px)] object-cover lg:rounded-xl object-top"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end gap-6 p-6 text-center">
          <img src={Carrot} alt="Carrot" className="w-12 h-12 " />
          <div>
            <h1 className="text-5xl font-semibold text-white mb-4">
              Welcome <br /> to our store
            </h1>
            <p className="text-base text-[#fcfcfcb2]">
              Get your groceries in as fast as one hour
            </p>
          </div>
          <Button
            className="h-16 bg-[#53B175] w-full max-w-xs text-white text-lg font-semibold rounded-lg hover:bg-[#4cae5a] mb-12"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Onboarding;
