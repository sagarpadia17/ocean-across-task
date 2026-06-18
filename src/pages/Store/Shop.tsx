import { useState } from "react";
import OfferBanner from "@/assets/offer-banner.svg";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { MapPin, Search, X } from "lucide-react";
import { mockProducts } from "@/data/mockProducts";
import type { Product } from "@/types";
import { useCartStore } from "@/stores/cartStore";
import { useCurrentUser } from "@/hooks";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.cartItems);
  const { user } = useCurrentUser();

  const location =
    user?.city && user?.address
      ? `${user.address}, ${user.city}`
      : user?.city
      ? user.city
      : "Select Location";

  const exclusiveProducts = mockProducts.slice(0, 8);
  const bestSellingProducts = mockProducts.slice(8, 16);
  const groceriesProducts = mockProducts.slice(16);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const query = searchTerm.toLowerCase().trim();
  const searchResults = query
    ? mockProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
    : [];

  return (
    <div className="w-full px-6 pt-6 md:p-8 gap-6 flex flex-col overflow-y-auto pb-24">
      <div className="flex items-center justify-center md:justify-start gap-2">
        <MapPin />
        <h1 className="text-xl md:text-2xl font-bold text-[#181725] text-center md:text-start">
          {location}
        </h1>
      </div>
      <img
        src={OfferBanner}
        alt="OfferBanner"
        className="w-full h-32 rounded-[16px] block md:hidden object-cover"
      />
      <div className="w-full p-2 h-12 bg-[#F2F3F2] rounded-xl flex items-center">
        <Search className="w-6 h-6 text-[#7C7C7C] ms-2" />
        <Input
          className="bg-transparent border-none focus:ring-0"
          placeholder="Search Store"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="flex items-center justify-center h-5 w-5 bg-[#C5C5C5] rounded-full mr-2 hover:bg-gray-400"
          >
            <X className="size-3 text-white" />
          </button>
        )}
      </div>

      {query ? (
        /* Search Results */
        <div className="flex flex-col gap-4">
          <h4 className="text-xl font-semibold text-[#181725]">
            Results for &quot;{searchTerm}&quot;
            <span className="text-sm font-normal text-[#7C7C7C] ml-2">
              ({searchResults.length} found)
            </span>
          </h4>
          {searchResults.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
              {searchResults.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  isInCart={cartItems.some((item) => item.productId === product.id)}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Exclusive Offer Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-2xl font-semibold text-[#181725]">Exclusive Offer</h4>
              <h6 className="text-base font-semibold text-[#53B175] cursor-pointer hover:underline">
                See all
              </h6>
            </div>
            <div className="flex items-center gap-4 overflow-x-scroll no-scrollbar">
              {exclusiveProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  isInCart={cartItems.some((item) => item.productId === product.id)}
                />
              ))}
            </div>
          </div>

          {/* Best Selling Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-2xl font-semibold text-[#181725]">Best Selling</h4>
              <h6 className="text-base font-semibold text-[#53B175] cursor-pointer hover:underline">
                See all
              </h6>
            </div>
            <div className="h-full flex items-center gap-4 overflow-x-scroll no-scrollbar">
              {bestSellingProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  isInCart={cartItems.some((item) => item.productId === product.id)}
                />
              ))}
            </div>
          </div>

          {/* Groceries Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-2xl font-semibold text-[#181725]">Groceries</h4>
              <h6 className="text-base font-semibold text-[#53B175] cursor-pointer hover:underline">
                See all
              </h6>
            </div>
            <div className="flex items-center gap-4 overflow-x-scroll no-scrollbar">
              {groceriesProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  isInCart={cartItems.some((item) => item.productId === product.id)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Shop;
