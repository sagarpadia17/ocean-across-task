import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, useCurrentUser, userManager } from "@/hooks";
import { FaChevronLeft, FaUser, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const Account = () => {
  const navigate = useNavigate();
  const { logout, updateProfile } = useAuth();
  const { user } = useCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // Load real user data from store on mount
  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        pincode: user.pincode || "",
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/signin", { replace: true });
  };

  const handleDone = () => {
    // Update user in localStorage
    if (user?.email) {
      const users = userManager.getAllUsers();
      const userIndex = users.findIndex((u: any) => u.email === user.email);
      if (userIndex !== -1) {
        users[userIndex] = {
          ...users[userIndex],
          fullName: userInfo.name,
          phone: userInfo.phone,
          address: userInfo.address,
          city: userInfo.city,
          pincode: userInfo.pincode,
        };
        localStorage.setItem("ocean_users", JSON.stringify(users));
      }
    }

    // Update user in store
    updateProfile({
      name: userInfo.name,
      phone: userInfo.phone,
      address: userInfo.address,
      city: userInfo.city,
      pincode: userInfo.pincode,
    });

    setIsEditing(false);
  };

  return (
    <div className="w-full px-6 pt-6 md:p-8 pb-24 flex flex-col gap-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 bg-[#F2F3F2] rounded-full flex items-center justify-center hover:bg-gray-300 transition"
        >
          <FaChevronLeft />
        </button>
        <h1 className="text-2xl font-semibold text-[#181725]">My Account</h1>
      </div>

      {/* User Profile Section */}
      <div className="bg-[#F2F3F2] rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#53B175] rounded-full flex items-center justify-center text-white text-3xl">
            <FaUser />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-[#181725]">{userInfo.name}</h2>
            <p className="text-sm text-[#7C7C7C]">
              {userInfo.phone ? userInfo.phone : userInfo.email}
            </p>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-[#181725]">Account Information</h3>
          <button
            onClick={() => {
              if (isEditing) {
                handleDone();
              } else {
                setIsEditing(true);
              }
            }}
            className="text-[#53B175] font-semibold hover:underline"
          >
            {isEditing ? "Done" : "Edit"}
          </button>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="border border-[#E2E2E2] rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F2F3F2] rounded-full flex items-center justify-center text-[#53B175]">
              <FaUser size={18} />
            </div>
            <div className="flex flex-col gap-1 flex-grow">
              <p className="text-sm text-[#7C7C7C]">Name</p>
              {isEditing ? (
                <Input
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                  className="text-[#181725] font-semibold"
                />
              ) : (
                <p className="text-[#181725] font-semibold">{userInfo.name}</p>
              )}
            </div>
          </div>

          {/* Email */}
          {!userInfo.phone && (
          <div className="border border-[#E2E2E2] rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F2F3F2] rounded-full flex items-center justify-center text-[#53B175]">
              <FaEnvelope size={18} />
            </div>
            <div className="flex flex-col gap-1 flex-grow">
              <p className="text-sm text-[#7C7C7C]">Email</p>
              {isEditing ? (
                <Input
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                  className="text-[#181725] font-semibold"
                />
              ) : (
                <p className="text-[#181725] font-semibold">{userInfo.email}</p>
              )}
            </div>
          </div>
          )}

          {/* Phone */}
          {!userInfo.email && (
          <div className="border border-[#E2E2E2] rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F2F3F2] rounded-full flex items-center justify-center text-[#53B175]">
              <FaPhone size={18} />
            </div>
            <div className="flex flex-col gap-1 flex-grow">
              <p className="text-sm text-[#7C7C7C]">Phone</p>
              {isEditing ? (
                <Input
                  value={userInfo.phone}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, phone: e.target.value })
                  }
                  className="text-[#181725] font-semibold"
                />
              ) : (
                <p className="text-[#181725] font-semibold">{userInfo.phone}</p>
              )}
            </div>
          </div>
          )}

          {/* Address */}
          <div className="border border-[#E2E2E2] rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F2F3F2] rounded-full flex items-center justify-center text-[#53B175]">
              <FaMapMarkerAlt size={18} />
            </div>
            <div className="flex flex-col gap-1 flex-grow">
              <p className="text-sm text-[#7C7C7C]">Address</p>
              {isEditing ? (
                <Input
                  value={userInfo.address}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, address: e.target.value })
                  }
                  className="text-[#181725] font-semibold"
                />
              ) : (
                <p className="text-[#181725] font-semibold">{userInfo.address}</p>
              )}
            </div>
          </div>

          {/* City */}
          <div className="border border-[#E2E2E2] rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F2F3F2] rounded-full flex items-center justify-center text-[#53B175]">
              <FaMapMarkerAlt size={18} />
            </div>
            <div className="flex flex-col gap-1 flex-grow">
              <p className="text-sm text-[#7C7C7C]">City</p>
              {isEditing ? (
                <Input
                  value={userInfo.city}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, city: e.target.value })
                  }
                  className="text-[#181725] font-semibold"
                />
              ) : (
                <p className="text-[#181725] font-semibold">{userInfo.city}</p>
              )}
            </div>
          </div>

          {/* Pincode */}
          <div className="border border-[#E2E2E2] rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F2F3F2] rounded-full flex items-center justify-center text-[#53B175]">
              <FaMapMarkerAlt size={18} />
            </div>
            <div className="flex flex-col gap-1 flex-grow">
              <p className="text-sm text-[#7C7C7C]">Pincode</p>
              {isEditing ? (
                <Input
                  value={userInfo.pincode}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, pincode: e.target.value })
                  }
                  className="text-[#181725] font-semibold"
                />
              ) : (
                <p className="text-[#181725] font-semibold">{userInfo.pincode}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex flex-col gap-4 mt-8">
        <Button
          onClick={handleLogout}
          className="h-14 bg-red-500 w-full text-white text-lg font-semibold rounded-2xl hover:bg-red-600 transition"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Account;
