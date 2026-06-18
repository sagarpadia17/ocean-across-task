import { Minus, Plus, X } from "lucide-react";
import type { CartItem } from "@/types";
import { useCartStore } from "@/stores/cartStore";

interface CartCardProps {
  item: CartItem;
}

const CartCard = ({ item }: CartCardProps) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <div className="w-full flex items-center gap-8 p-4 h-max border-b border-[#E2E2E2]">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 md:w-24 md:h-24 shadow rounded-lg object-contain"
      />
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-base font-medium text-[#181725]">{item.name}</h2>
          <p className="text-sm font-normal text-[#7C7C7C]">{item.category}</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
            className="w-10 h-10 rounded-2xl border border-[#F0F0F0] flex items-center justify-center cursor-pointer hover:border-[#53B175]"
          >
            <Minus className="w-5 h-5 text-[#B3B3B3]" />
          </button>
          <h6 className="text-base font-semibold text-[#181725]">{item.quantity}</h6>
          <button
            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            className="w-10 h-10 rounded-2xl border border-[#F0F0F0] flex items-center justify-center cursor-pointer hover:border-[#53B175]"
          >
            <Plus className="w-5 h-5 text-[#53B175]" />
          </button>
        </div>
      </div>
      <div className="flex-1 flex items-between justify-end">
        <div className="flex flex-col justify-between items-end gap-12">
          <button onClick={() => removeFromCart(item.productId)}>
            <X className="w-6 h-6 text-[#B3B3B3] cursor-pointer hover:text-red-400" />
          </button>
          <h2 className="text-lg font-semibold text-[#181725]">
            ₹{item.total.toFixed(0)}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
