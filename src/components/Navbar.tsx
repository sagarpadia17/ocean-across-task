import { Heart, ShoppingCart, Store, LogOut, User } from "lucide-react";
import NectarLogo from "@/assets/nectar-logo.svg";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useCartStore } from "@/stores/cartStore";
import { useAuth } from "@/hooks";

const NavItem = ({
  icon,
  label,
  isActive,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  badge?: number;
}) => {
  return (
    <div
      className={`w-full flex flex-col md:flex-row items-center justify-center md:gap-2 cursor-pointer relative ${
        isActive ? "md:border-b-2 md:border-white " : ""
      }`}
    >
      <div
        className={`w-6 h-6 ${
          isActive ? "text-[#53B175] md:text-white " : "text-[#181725] md:text-white"
        }`}
      >
        {icon}
        {badge !== undefined && badge > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
            {badge > 9 ? "9+" : badge}
          </span>
        )}
      </div>
      <span
        className={`text-sm md:text-lg font-semibold ${
          isActive ? "text-[#53B175] md:text-white " : "text-[#181725] md:text-white"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const cartCount = useCartStore((state) =>
    state.cartItems.reduce((total, item) => total + item.quantity, 0)
  );
  const [activeTab, setActiveTab] = useState("Shop");

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/store/shop") || path === "/") {
      setActiveTab("Shop");
    } else if (path.includes("/store/explore")) {
      setActiveTab("Explore");
    } else if (path.includes("/store/cart")) {
      setActiveTab("Cart");
    } else if (path.includes("/store/favorites")) {
      setActiveTab("Favorites");
    } else if (path.includes("account")) {
      setActiveTab("Account");
    }
  }, [location.pathname]);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/signin", { replace: true });
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
          onClick={() => handleNavigate("/store/shop")}
          className="md:w-32 lg:w-48 hidden md:block cursor-pointer hover:opacity-80 transition"
        />
        <div
          className="
      flex justify-around w-full md:w-auto items-center h-20
      md:justify-between md:px-8 md:gap-8 lg:gap-16
    "
        >
          <button
            onClick={() => handleNavigate("/store/shop")}
            className="hover:opacity-80 transition"
          >
            <NavItem
              icon={<Store />}
              label="Shop"
              isActive={activeTab === "Shop"}
            />
          </button>
          <button
            onClick={() => handleNavigate("/store/explore")}
            className="hover:opacity-80 transition"
          >
            <NavItem
              icon={<ShoppingCart />}
              label="Explore"
              isActive={activeTab === "Explore"}
            />
          </button>
          <button
            onClick={() => handleNavigate("/store/cart")}
            className="hover:opacity-80 transition"
          >
            <NavItem
              icon={<ShoppingCart />}
              label="Cart"
              isActive={activeTab === "Cart"}
              badge={cartCount}
            />
          </button>
          <button
            onClick={() => handleNavigate("/store/favorites")}
            className="hover:opacity-80 transition"
          >
            <NavItem
              icon={<Heart />}
              label="Favorites"
              isActive={activeTab === "Favorites"}
            />
          </button>
          <button
            onClick={() => handleNavigate("/account")}
            className="hover:opacity-80 transition"
          >
            <NavItem
              icon={<User />}
              label="Account"
              isActive={activeTab === "Account"}
            />
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="hidden md:flex items-center gap-2 px-4 py-2 text-white hover:opacity-80 transition"
        >
          <LogOut size={20} />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
