import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { validateSignUp, userManager } from "@/hooks";
import OrangeCarrot from "@/assets/orange-carrot.svg";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneralError("");

    if (!agreeToTerms) {
      setGeneralError("Please agree to terms and conditions");
      setIsLoading(false);
      return;
    }

    const { valid, errors: validationErrors } = validateSignUp(formData);
    if (!valid) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    if (userManager.emailExists(formData.email)) {
      setErrors({ email: "Email already registered" });
      setIsLoading(false);
      return;
    }

    userManager.saveUser({
      id: `user-${Date.now()}`,
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    });

    navigate("/authentication/location", {
      state: { email: formData.email, isNewUser: true },
      replace: true,
    });
  };

  const handleLoginClick = () => {
    navigate("/authentication/login");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#53B175] overflow-y-auto">
      <div className="relative flex flex-col p-6 gap-8 justify-center w-full lg:max-w-lg min-h-screen lg:min-h-[calc(100vh)] lg:rounded-xl bg-white">
        <div className="w-full h-12 flex items-center justify-center ">
          <img
            src={OrangeCarrot}
            alt="Orange Carrot"
            className="w-10 h-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="text-2xl font-semibold text-[#030303]">Sign Up</h5>
          <h6 className="text-base font-normal text-[#7C7C7C]">
            Enter your credentials to continue
          </h6>
        </div>

        {generalError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSignUp} className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-2 w-full">
            <h6 className="text-base font-semibold text-[#7C7C7C]">
              Full Name
            </h6>
            <Input
              name="fullName"
              placeholder="Enter your full name"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500">{errors.fullName}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <h6 className="text-base font-semibold text-[#7C7C7C]">Email</h6>
            <Input
              name="email"
              placeholder="Enter your Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <h6 className="text-base font-semibold text-[#7C7C7C]">Password</h6>
            <Input
              name="password"
              placeholder="Enter your Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <h6 className="text-base font-semibold text-[#7C7C7C]">
              Confirm Password
            </h6>
            <Input
              name="confirmPassword"
              placeholder="Re-enter password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
              className="w-5 h-5 border-[#E2E2E2]"
            />
            <label className="text-sm text-[#7C7C7C]">
              I agree to the{" "}
              <a href="#" className="text-[#53B175] font-medium">
                Terms & Conditions
              </a>
            </label>
          </div>

          <div className="flex flex-col gap-4 w-full mt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="h-16 bg-[#53B175] w-full text-white text-lg font-semibold rounded-2xl hover:bg-[#4cae5a] disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
            <p className="text-sm font-medium text-[#181725] text-center mb-12">
              Already have an account?{" "}
              <button
                type="button"
                onClick={handleLoginClick}
                className="text-[#53B175] hover:underline"
              >
                Log In
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
