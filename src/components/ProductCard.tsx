import type { Product } from "@/types";
import { Check, Plus } from "lucide-react";
import { useNavigate } from "react-router";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  isInCart?: boolean;
}

const ProductCard = ({ product, onAddToCart, isInCart = false }: ProductCardProps) => {
  const navigate = useNavigate();
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div
      className="min-w-44 p-4 rounded-2xl border border-[#E2E2E2] flex flex-col gap-4 justify-between h-68 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate("/store/product-details", { state: { product } })}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center relative">
          {product.discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
              -{product.discount}%
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-24 max-h-24 rounded-xl object-contain"
          />
        </div>
        <div>
          <h6 className="text-base font-bold text-[#181725] line-clamp-2">
            {product.name}
          </h6>
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium text-[#7C7C7C] line-clamp-2 ">
              {product.category}
            </p>
            {product.rating && (
              <span className="text-xs text-yellow-500">
                ★ {product.rating}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col">
          {product.discount && (
            <h5 className="text-xs text-[#7C7C7C] line-through">
              ₹{product.price}
            </h5>
          )}
          <h5 className="text-lg font-semibold text-[#181725]">
            ₹{discountedPrice.toFixed(0)}
          </h5>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!isInCart && onAddToCart) {
              onAddToCart(product);
            }
          }}
          disabled={isInCart}
          className={`h-10 w-10 flex justify-center items-center rounded-[16px] transition-colors ${
            isInCart
              ? "bg-[#E8F5E9] text-[#53B175] cursor-not-allowed"
              : "bg-[#53B175] text-white hover:bg-[#4cae5a] active:bg-[#3d9044]"
          }`}
        >
          {isInCart ? <Check size={20} /> : <Plus size={20} />}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
