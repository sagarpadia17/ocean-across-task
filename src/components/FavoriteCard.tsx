import BellPepper from "@/assets/grocery-items/bell-pepper.svg";
import { FaChevronRight } from "react-icons/fa";
const FavoriteCard = () => {
  return (
    <div className="w-full flex items-center gap-8 p-4 h-max border-b border-[#E2E2E2]">
      <img
        src={BellPepper}
        alt="Bell Pepper"
        className="w-16 h-16 md:w-24 md:h-24 shadow rounded-lg"
      />
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-base font-medium text-[#181725]">Bell Pepper</h2>
          <p className="text-sm font-normal text-[#7C7C7C]">1kg, Price</p>
        </div>
      </div>
      <div className="flex-1 flex items-center gap-4 justify-end">
        <h2 className="text-lg font-semibold text-[#181725]">$4.99</h2>
        <FaChevronRight className="text-[#181725]" />
      </div>
    </div>
  );
};
export default FavoriteCard;
