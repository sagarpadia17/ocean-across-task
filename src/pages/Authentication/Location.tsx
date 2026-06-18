import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, userManager } from "@/hooks";
import { FaChevronLeft } from "react-icons/fa";
import LocationImage from "@/assets/location.svg";

const Location = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateProfile, login } = useAuth();

  // Get state from SignUp or Verification flows
  const email = location.state?.email;
  const phone = location.state?.phone;
  const isNewUser = location.state?.isNewUser;
  const isExistingUser = location.state?.isExistingUser;

  const [locationData, setLocationData] = useState({
    address: "",
    city: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({
      ...prev,
      [name]:
        name === "pincode" ? value.replace(/\D/g, "").slice(0, 6) : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors: Record<string, string> = {};
    if (!locationData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!locationData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!locationData.pincode || locationData.pincode.length < 6) {
      newErrors.pincode = "Valid pincode is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // If new user from signup, update user record in localStorage
    if (isNewUser && email) {
      const users = userManager.getAllUsers();
      const userIndex = users.findIndex((u: any) => u.email === email);
      if (userIndex !== -1) {
        users[userIndex] = {
          ...users[userIndex],
          address: locationData.address,
          city: locationData.city,
          pincode: locationData.pincode,
        };
        localStorage.setItem("ocean_users", JSON.stringify(users));

        const updatedUser = {
          id: users[userIndex].id,
          email,
          name: users[userIndex].fullName || "User",
          address: locationData.address,
          city: locationData.city,
          pincode: locationData.pincode,
        };
        login(updatedUser);
      }
    } else if (isExistingUser && email) {
      // For existing user from email/password login
      const users = userManager.getAllUsers();
      const userIndex = users.findIndex((u: any) => u.email === email);
      if (userIndex !== -1) {
        users[userIndex] = {
          ...users[userIndex],
          address: locationData.address,
          city: locationData.city,
          pincode: locationData.pincode,
        };
        localStorage.setItem("ocean_users", JSON.stringify(users));

        const updatedUser = {
          id: users[userIndex].id,
          email,
          name: users[userIndex].fullName || "User",
          address: locationData.address,
          city: locationData.city,
          pincode: locationData.pincode,
        };
        login(updatedUser);
      }
    } else if (phone) {
      // For OTP/Verification flow, update the current logged-in user
      updateProfile({
        address: locationData.address,
        city: locationData.city,
        pincode: locationData.pincode,
      });
    }

    navigate("/store/shop", { replace: true });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#53B175] overflow-y-auto">
      <div className="relative flex flex-col p-6 gap-8 justify-between w-full lg:max-w-lg min-h-screen lg:min-h-[calc(100vh)] lg:rounded-xl bg-white">
        <div className="flex flex-col gap-8 items-center">
          <button
            onClick={handleBack}
            className="w-8 h-8 bg-[#030303] rounded-full flex items-center self-start justify-center text-white text-lg font-semibold hover:bg-gray-800"
          >
            <FaChevronLeft />
          </button>
          <img
            src={LocationImage}
            alt="Location"
            className="w-56 object-cover"
          />
          <div className="flex flex-col gap-4 items-center w-3/4">
            <h5 className="text-2xl font-semibold text-[#030303]">
              Select Your Location
            </h5>
            <h6 className="text-base font-normal text-[#7C7C7C] text-center">
              Set a delivery location for faster checkout
            </h6>
          </div>
        </div>
        <form onSubmit={handleContinue} className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-2 w-full">
            <h6 className="text-base font-semibold text-[#7C7C7C]">
              Street Address
            </h6>
            <Input
              name="address"
              placeholder="Enter your address"
              type="text"
              value={locationData.address}
              onChange={handleChange}
            />
            {errors.address && (
              <p className="text-xs text-red-500">{errors.address}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <h6 className="text-base font-semibold text-[#7C7C7C]">City</h6>
            <Input
              name="city"
              placeholder="Enter your city"
              type="text"
              value={locationData.city}
              onChange={handleChange}
            />
            {errors.city && (
              <p className="text-xs text-red-500">{errors.city}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <h6 className="text-base font-semibold text-[#7C7C7C]">Pincode</h6>
            <Input
              name="pincode"
              placeholder="6-digit pincode"
              type="text"
              value={locationData.pincode}
              onChange={handleChange}
              maxLength={6}
            />
            {errors.pincode && (
              <p className="text-xs text-red-500">{errors.pincode}</p>
            )}
          </div>

          <div className="flex flex-col gap-4 w-full mt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="h-16 bg-[#53B175] w-full text-white text-lg font-semibold rounded-2xl hover:bg-[#4cae5a] disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Location;
