import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { generateOTP, storeOTP } from "@/hooks";
import { FaChevronLeft } from "react-icons/fa";
import IntlTelInput from "@intl-tel-input/react";
import "intl-tel-input/styles";
const Number = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isValidPhone) {
      setError("Please enter a valid phone number");
      setIsLoading(false);
      return;
    }

    const otp = generateOTP();
    storeOTP(phone, otp);
    alert(`Mock OTP for ${phone}: ${otp}`);
    console.log(`Mock OTP for ${phone}: ${otp}`);

    navigate("/authentication/verification", {
      state: { phone },
    });
  };

  const handleBack = () => {
    navigate("/signin");
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
            Enter your mobile number
          </h5>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={handleContinue}
            className="flex flex-col gap-8 w-full"
          >
            <div className="flex flex-col gap-2 w-full">
              <h6 className="text-base font-semibold text-[#7C7C7C]">
                Mobile Number
              </h6>
              <IntlTelInput
                initialCountry="in"
                loadUtils={() => import("intl-tel-input/utils")}
                onChangeNumber={(number) => setPhone(number)}
                onChangeValidity={(valid) => setIsValidPhone(valid)}
                inputProps={{
                  placeholder: "Enter mobile number",
                }}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !phone}
              className="h-16 bg-[#53B175] w-full text-white text-lg font-semibold rounded-2xl hover:bg-[#4cae5a] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending OTP..." : "Continue"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Number;
