import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, Star } from "lucide-react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import ProductCarousel from "@/components/ProductCarousel";
import { useLocation, useNavigate } from "react-router";
import { useCartStore } from "@/stores/cartStore";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import type { Product } from "@/types";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product: Product | undefined = location.state?.product;

  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.cartItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const favorites = useFavoritesStore((state) => state.favorites);
  const favorited = favorites.some((p) => p.id === product?.id);

  const cartItem = cartItems.find((item) => item.productId === product?.id);
  const isInCart = !!cartItem;

  const [localQty, setLocalQty] = useState(1);

  const discountedPrice = product
    ? product.discount
      ? product.price * (1 - product.discount / 100)
      : product.price
    : 0;

  const productImages = product
    ? (product.images && product.images.length > 0 ? product.images : [product.image])
    : [];

  if (!product) {
    return (
      <div className="w-full h-[calc(100vh-82px)] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-82px)] md:p-8 gap-6 flex flex-col">
      <div className="flex items-center gap-4 px-6 pt-6 md:px-0 md:pt-0">
        <button
          onClick={() => navigate(-1)}
          className="hover:bg-gray-200 p-2 rounded-lg transition"
        >
          <ChevronLeft />
        </button>
        <h1 className="text-xl md:text-3xl font-bold text-[#181725]">
          Product Details
        </h1>
      </div>
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/2">
          <ProductCarousel images={productImages} />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-6 px-6 pb-24">
          <div className="flex justify-between">
            <div>
              <h5 className="text-2xl font-bold text-[#181725]">
                {product.name}
              </h5>
              <h6 className="text-base font-semibold text-[#7C7C7C]">
                {product.category}
              </h6>
            </div>
            <button onClick={() => toggleFavorite(product)}>
              <Heart
                className={`cursor-pointer transition-colors ${
                  favorited
                    ? "fill-red-500 text-red-500"
                    : "hover:fill-red-400 hover:text-red-400"
                }`}
              />
            </button>
          </div>

          <div className="flex justify-between items-center">
            {isInCart ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    updateQuantity(product.id, cartItem.quantity - 1)
                  }
                  className="w-10 h-10 rounded-xl border border-[#F0F0F0] flex items-center justify-center hover:border-[#53B175]"
                >
                  <Minus className="w-5 h-5 text-[#B3B3B3]" />
                </button>
                <div className="w-10 h-10 rounded-xl border border-[#F0F0F0] flex items-center justify-center">
                  <h6 className="text-base font-semibold text-[#181725]">
                    {cartItem.quantity}
                  </h6>
                </div>
                <button
                  onClick={() =>
                    updateQuantity(product.id, cartItem.quantity + 1)
                  }
                  className="w-10 h-10 rounded-xl border border-[#F0F0F0] flex items-center justify-center hover:border-[#53B175]"
                >
                  <Plus className="w-5 h-5 text-[#53B175]" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  disabled={localQty <= 1}
                  onClick={() => setLocalQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-xl border border-[#F0F0F0] flex items-center justify-center hover:border-[#53B175]"
                >
                  <Minus className="w-5 h-5 text-[#B3B3B3]" />
                </button>
                <div className="w-10 h-10 rounded-xl border border-[#F0F0F0] flex items-center justify-center">
                  <h6 className="text-base font-semibold text-[#181725]">
                    {localQty}
                  </h6>
                </div>
                <button
                  onClick={() => setLocalQty((q) => q + 1)}
                  className="w-10 h-10 rounded-xl border border-[#F0F0F0] flex items-center justify-center hover:border-[#53B175]"
                >
                  <Plus className="w-5 h-5 text-[#53B175]" />
                </button>
              </div>
            )}
            <div className="flex flex-col items-end">
              {product.discount && (
                <span className="text-sm text-[#7C7C7C] line-through">
                  ₹{product.price}
                </span>
              )}
              <h5 className="text-2xl font-bold text-[#181725]">
                ₹{discountedPrice.toFixed(0)}
              </h5>
            </div>
          </div>

          <hr className="border-[#E2E2E2]" />
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h6 className="text-base font-semibold text-[#181725]">
                Product Detail
              </h6>
              <FaChevronDown />
            </div>
            <p className="text-sm font-medium text-[#7C7C7C]">
              {product.description ||
                "Fresh and natural product sourced directly from trusted suppliers."}
            </p>
          </div>
          <hr className="border-[#E2E2E2]" />
          <div className="flex justify-between">
            <h6 className="text-base font-semibold text-[#181725]">
              Nutritions
            </h6>
            <FaChevronRight />
          </div>
          <hr className="border-[#E2E2E2]" />
          <div className="flex justify-between">
            <h6 className="text-base font-semibold text-[#181725]">Review</h6>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-3.5 ${
                      i < Math.round(product.rating ?? 0)
                        ? "text-[#F3603F] fill-[#F3603F]"
                        : "text-gray-300 fill-gray-300"
                    }`}
                  />
                ))}
              </div>
              <FaChevronRight />
            </div>
          </div>
          <hr className="border-[#E2E2E2]" />
          <Button
            className="h-16 bg-[#53B175] w-full text-white text-lg font-semibold rounded-2xl disabled:opacity-60"
            onClick={() => !isInCart && addToCart(product, localQty)}
            disabled={isInCart}
          >
            {isInCart ? "Added to Basket" : "Add to Basket"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
