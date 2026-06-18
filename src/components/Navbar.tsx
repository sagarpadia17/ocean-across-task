import { Heart, ShoppingCart, Store, TextSearch, User } from "lucide-react";
import NectarLogo from "@/assets/nectar-logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router";

const NavItem = ({
  icon,
  label,
  isActive,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}) => {
  return (
    <div
      className={`w-full flex flex-col md:flex-row items-center justify-center md:gap-2 cursor-pointer ${isActive ? "md:border-b-2 md:border-white " : ""}`}
    >
      <div
        className={`w-6 h-6 ${isActive ? "text-[#53B175] md:text-white " : "text-[#181725] md:text-white"}`}
      >
        {icon}
      </div>
      <span
        className={`text-sm md:text-lg font-semibold ${isActive ? "text-[#53B175] md:text-white " : "text-[#181725] md:text-white"}`}
      >
        {label}
      </span>
    </div>
  );
};

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Shop");
  const navigate = useNavigate();
  const handleButtonClick = (nav: string) => {
    setActiveTab(nav);
    navigate(`/${nav === "Shop" ? "" : nav.toLowerCase()}`);
  };
  return (
    <nav
      className="
    fixed bottom-0 left-0 right-0
    md:sticky md:top-0
   bg-white z-10 md:bg-[#53B175] border-t md:border-t-0 md:border-b md
  "
    >
      <div className="flex justify-between w-full h-20 md:px-8">
        <img
          src={NectarLogo}
          alt="Nectar Logo"
          className="md:w-32 lg:w-48 hidden md:block"
        />
        <div
          className="
      flex justify-around w-full md:w-auto items-center h-20
      md:justify-between md:px-8 md:gap-8 lg:gap-16
    "
        >
          <button
            onClick={() => handleButtonClick("Shop")}
            className="hover:opacity-80 transition"
          >
            <NavItem
              icon={<Store />}
              label="Shop"
              isActive={activeTab === "Shop"}
            />
          </button>
          <button
            onClick={() => handleButtonClick("Explore")}
            className="hover:opacity-80 transition"
          >
            <NavItem
              icon={<TextSearch />}
              label="Explore"
              isActive={activeTab === "Explore"}
            />
          </button>
          <button
            onClick={() => handleButtonClick("Cart")}
            className="hover:opacity-80 transition"
          >
            <NavItem
              icon={<ShoppingCart />}
              label="Cart"
              isActive={activeTab === "Cart"}
            />
          </button>
          <button
            onClick={() => handleButtonClick("Favorites")}
            className="hover:opacity-80 transition"
          >
            <NavItem
              icon={<Heart />}
              label="Favorites"
              isActive={activeTab === "Favorites"}
            />
          </button>
          <button
            onClick={() => handleButtonClick("Account")}
            className="hover:opacity-80 transition"
          >
            <NavItem
              icon={<User />}
              label="Account"
              isActive={activeTab === "Account"}
            />
          </button>
        </div>
        <div className="hidden md:block"></div>
      </div>
    </nav>
  );
};
export default Navbar;
