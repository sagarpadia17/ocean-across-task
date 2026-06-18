import { FaChevronRight } from "react-icons/fa";
import { Heart } from "lucide-react";
import type { Product } from "@/types";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { useNavigate } from "react-router";

interface FavoriteCardProps {
  product: Product;
}

const FavoriteCard = ({ product }: FavoriteCardProps) => {
  const navigate = useNavigate();
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="w-full flex items-center gap-4 p-4 h-max border-b border-[#E2E2E2]">
      <img
        src={product.image}
        alt={product.name}
        className="w-16 h-16 md:w-24 md:h-24 shadow rounded-lg object-contain"
      />
      <div className="flex flex-col gap-1 flex-1">
        <h2 className="text-base font-medium text-[#181725] line-clamp-1">{product.name}</h2>
        <p className="text-sm font-normal text-[#7C7C7C]">{product.category}</p>
        <div className="flex items-center gap-2">
          {product.discount && (
            <span className="text-xs text-[#7C7C7C] line-through">₹{product.price}</span>
          )}
          <span className="text-base font-semibold text-[#181725]">₹{discountedPrice.toFixed(0)}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => removeFavorite(product.id)}>
          <Heart className="w-5 h-5 fill-red-500 text-red-500 cursor-pointer hover:fill-red-300 hover:text-red-300 transition-colors" />
        </button>
        <button onClick={() => navigate("/store/product-details", { state: { product } })}>
          <FaChevronRight className="text-[#181725]" />
        </button>
      </div>
    </div>
  );
};

export default FavoriteCard;
