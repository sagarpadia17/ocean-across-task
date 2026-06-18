import { useEffect } from "react";
import { useNavigate } from "react-router";
import NectarLogo from "@/assets/nectar-logo.svg";
import { getInitialRoute } from "@/hooks";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-navigate after 2-3 seconds
    const timer = setTimeout(() => {
      const nextRoute = getInitialRoute();
      navigate(nextRoute, { replace: true });
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-screen bg-[#53B175] flex items-center justify-center p-8">
      <img src={NectarLogo} alt="Nectar Logo" className="w-full max-w-64" />
    </div>
  );
};

export default SplashScreen;
