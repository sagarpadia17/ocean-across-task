import { useNavigate } from "react-router";
import SignInBackground from "@/assets/sign-in-bg.svg";
import Globe from "@/assets/globe.svg";
import "intl-tel-input/styles";
import { Button } from "@/components/ui/button";

const SignIn = () => {
  const navigate = useNavigate();

  const handleContinueWithMobile = () => {
    navigate("/authentication/number");
  };

  const handleContinueWithEmail = () => {
    navigate("/authentication/login");
  };

  // const handleSignUp = () => {
  //   navigate("/authentication/signup");
  // };

  return (
    <div className="flex h-screen items-center justify-center bg-[#53B175]">
      <div className="flex flex-col justify-between gap-4 w-full lg:max-w-lg h-screen lg:max-h-[calc(100vh-64px)] lg:rounded-xl bg-white">
        <img
          src={SignInBackground}
          alt="Sign In Background"
          className="w-full h-[calc(100vh-75%)] object-cover lg:rounded-t-xl object-top"
        />
        <div className="flex flex-col gap-8 p-6 flex-1">
          <h5 className="text-2xl font-semibold text-[#030303]">
            Get your groceries <br /> with nectar
          </h5>

          {/* Mobile Number Button */}
          <Button
            onClick={handleContinueWithMobile}
            className="h-10 border-b border-b-[#E2E2E2] w-full bg-white rounded-none gap-2 justify-start text-[#030303] hover:bg-gray-50"
          >
            <img src={Globe} alt="Globe" className="w-4 h-4" />
            <h6 className="text-base font-medium">+91</h6>
          </Button>

          <hr className="border-t border-[#E2E2E2]" />

          <p className="text-sm text-[#828282] text-center">
            Or connect with social media
          </p>

          <div className="flex flex-col gap-4 w-full">
            {/* Continue with Email */}
            <Button
              onClick={handleContinueWithEmail}
              className="h-12 bg-[#53B175] w-full text-white text-lg font-semibold rounded-xl hover:bg-[#4cae5a]"
            >
              Continue with Email
            </Button>

            {/* Continue with Google */}
            <Button className="h-12 bg-[#5383EC] w-full text-white text-lg font-semibold rounded-xl hover:bg-[#4a78d9]">
              Continue with Google
            </Button>

            {/* Continue with Facebook */}
            <Button className="h-12 bg-[#4A66AC] w-full text-white text-lg font-semibold rounded-xl hover:bg-[#3f5a99]">
              Continue with Facebook
            </Button>
          </div>

          {/* Sign Up Link */}
          {/* <div className="flex justify-center gap-2 text-sm text-[#828282] mb-6">
            <span>Don't have an account?</span>
            <button
              onClick={handleSignUp}
              className="text-[#53B175] font-semibold hover:underline"
            >
              Sign Up
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
