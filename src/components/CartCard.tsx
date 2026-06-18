import { Minus, Plus, X } from "lucide-react";
import BellPepper from "@/assets/grocery-items/bell-pepper.svg";
const CartCard = () => {
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
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl border border-[#F0F0F0] flex items-center justify-center cursor-pointer ">
            <Minus className="w-5 h-5 text-[#B3B3B3]" />
          </div>
          <h6 className="text-base font-semibold text-[#181725]">1</h6>
          <div className="w-10 h-10 rounded-2xl border border-[#F0F0F0] flex items-center justify-center cursor-pointer ">
            <Plus className="w-5 h-5 text-[#53B175]" />
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-between justify-end">
        <div className="flex flex-col justify-between items-end gap-12">
          <X className="w-6 h-6 text-[#B3B3B3] cursor-pointer" />
          <h2 className="text-lg font-semibold text-[#181725]">$4.99</h2>
        </div>
      </div>
    </div>
  );
};
export default CartCard;
