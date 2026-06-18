import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateLogin, userManager } from "@/hooks";
import { useAuth } from "@/hooks";
import OrangeCarrot from "@/assets/orange-carrot.svg";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneralError("");

    const { valid, errors: validationErrors } = validateLogin(formData);
    if (!valid) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    const user = userManager.verifyCredentials(formData.email, formData.password);
    if (!user) {
      setGeneralError("Invalid email or password");
      setIsLoading(false);
      return;
    }

    login({
      id: user.id,
      name: user.fullName,
      email: user.email,
      phone: user.phone,
    });

    navigate("/authentication/location", { 
      state: { email: user.email, isExistingUser: true },
      replace: true 
    });
  };

  const handleSignUpClick = () => {
    navigate("/authentication/signup");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#53B175]">
      <div className="relative flex flex-col p-6 gap-8 justify-center w-full lg:max-w-lg h-screen lg:max-h-[calc(100vh-64px)] lg:rounded-xl bg-white">
        <div className="w-full h-12 flex items-center justify-center mb-12">
          <img
            src={OrangeCarrot}
            alt="Orange Carrot"
            className="w-10 h-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="text-2xl font-semibold text-[#030303]">Log In</h5>
          <h6 className="text-base font-normal text-[#7C7C7C]">
            Enter your emails and password
          </h6>
        </div>

        {generalError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
            {generalError}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-8 w-full">
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
            <p className="text-sm font-medium text-[#181725] text-end hover:cursor-pointer">
              Forgot Password?
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <Button
              type="submit"
              disabled={isLoading}
              className="h-16 bg-[#53B175] w-full text-white text-lg font-semibold rounded-2xl hover:bg-[#4cae5a] disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
            <p className="text-sm font-medium text-[#181725] text-center mb-12">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={handleSignUpClick}
                className="text-[#53B175] hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
