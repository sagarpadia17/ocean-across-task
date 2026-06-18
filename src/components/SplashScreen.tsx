import NectarLogo from "@/assets/nectar-logo.svg";

const SplashScreen = () => {
  return (
    <div className="h-screen w-screen bg-[#53B175] flex items-center justify-center p-8">
      <img src={NectarLogo} alt="Nectar Logo" className="w-full max-w-64" />
    </div>
  );
};

export default SplashScreen;
