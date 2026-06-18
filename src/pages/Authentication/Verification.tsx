import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateOTP, verifyOTP, clearOTP } from "@/hooks";
import { useAuth } from "@/hooks";
import { FaChevronLeft } from "react-icons/fa";

const Verification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const phone = location.state?.phone || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  if (!phone) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#53B175]">
        <div className="bg-white p-6 rounded-lg text-center">
          <p className="text-red-500">Invalid phone number. Please try again.</p>
          <Button
            onClick={() => navigate("/authentication/number")}
            className="mt-4 bg-[#53B175] text-white"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
    if (error) setError("");
    if (generalError) setGeneralError("");
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneralError("");

    const { valid, error: validationError } = validateOTP(otp);
    if (!valid) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    if (verifyOTP(phone, otp)) {
      clearOTP(phone);

      const newUser = {
        id: `user-${Date.now()}`,
        phone,
        name: "User",
      };

      login(newUser);

      navigate("/authentication/location", {
        state: { phone },
      });
    } else {
      setGeneralError("Invalid or expired OTP. Please try again.");
    }

    setIsLoading(false);
  };

  const handleResendOTP = () => {
    navigate("/authentication/number");
  };

  const handleBack = () => {
    navigate("/authentication/number");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#53B175]">
      <div className="relative flex flex-col p-6 justify-between w-full lg:max-w-lg h-screen lg:max-h-[calc(100vh-64px)] lg:rounded-xl bg-white">
        <div className="flex flex-col gap-8">
          <button
            onClick={handleBack}
            className="w-8 h-8 bg-[#030303] rounded-full flex items-center justify-center text-white text-lg font-semibold hover:bg-gray-800"
          >
            <FaChevronLeft />
          </button>
          <h5 className="text-2xl font-semibold text-[#030303]">
            Enter your 6-digit code
          </h5>

          <p className="text-sm text-[#7C7C7C]">
            We sent a code to <span className="font-semibold">{phone}</span>
          </p>

          {generalError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
              {generalError}
            </div>
          )}

          <form onSubmit={handleVerify} className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2 w-full">
              <h6 className="text-base font-semibold text-[#7C7C7C]">Code</h6>
              <Input
                placeholder="000000"
                value={otp}
                onChange={handleChange}
                maxLength={6}
                className="text-center text-2xl tracking-widest"
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>

            <Button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="h-12 bg-[#53B175] w-full text-white text-lg font-semibold rounded-2xl hover:bg-[#4cae5a] disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </form>
        </div>
        <div className="w-full flex items-center justify-between gap-4">
          <button
            onClick={handleResendOTP}
            className="text-lg font-normal text-[#53B175] hover:underline"
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
};
export default Verification;
