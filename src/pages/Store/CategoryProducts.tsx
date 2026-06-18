import { useLocation, useNavigate } from "react-router";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Search, Settings2, X } from "lucide-react";
import { mockProducts } from "@/data/mockProducts";
import type { Product } from "@/types";
import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type SortOption = "none" | "price-asc" | "price-desc" | "rating-desc";

interface Filters {
  sort: SortOption;
  discountOnly: boolean;
  minRating: number;
}

const DEFAULT_FILTERS: Filters = {
  sort: "none",
  discountOnly: false,
  minRating: 0,
};

const CategoryProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const categoryName = location.state?.category || "Products";

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [pendingFilters, setPendingFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(DEFAULT_FILTERS);

  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.cartItems);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const handleOpenFilter = () => {
    setPendingFilters(appliedFilters);
    setFilterOpen(true);
  };

  const handleApplyFilters = () => {
    setAppliedFilters(pendingFilters);
    setFilterOpen(false);
  };

  const handleClearFilters = () => {
    setPendingFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setFilterOpen(false);
  };

  const activeFilterCount =
    (appliedFilters.sort !== "none" ? 1 : 0) +
    (appliedFilters.discountOnly ? 1 : 0) +
    (appliedFilters.minRating > 0 ? 1 : 0);

  // 1. Filter by category
  let products = mockProducts.filter((p) => p.category === categoryName);

  // 2. Filter by search
  const query = searchTerm.toLowerCase().trim();
  if (query) {
    products = products.filter((p) => p.name.toLowerCase().includes(query));
  }

  // 3. Apply filters
  if (appliedFilters.discountOnly) {
    products = products.filter((p) => p.discount && p.discount > 0);
  }
  if (appliedFilters.minRating > 0) {
    products = products.filter((p) => (p.rating ?? 0) >= appliedFilters.minRating);
  }

  // 4. Sort
  if (appliedFilters.sort === "price-asc") {
    products = [...products].sort((a, b) => a.price - b.price);
  } else if (appliedFilters.sort === "price-desc") {
    products = [...products].sort((a, b) => b.price - a.price);
  } else if (appliedFilters.sort === "rating-desc") {
    products = [...products].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  return (
    <div className="w-full px-6 pt-6 md:p-8 gap-6 flex flex-col overflow-y-auto">
      <div className="flex gap-4 items-center">
        <button
          onClick={() => navigate(-1)}
          className="hover:bg-gray-200 p-2 rounded-lg transition"
        >
          <ChevronLeft />
        </button>
        <h1 className="text-xl md:text-3xl font-bold text-[#181725]">
          {categoryName}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-full p-2 h-12 bg-[#F2F3F2] rounded-xl flex items-center">
          <Search className="w-6 h-6 text-[#7C7C7C] ms-2" />
          <Input
            className="bg-transparent border-none focus:ring-0"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="flex items-center justify-center h-4 w-4 bg-[#C5C5C5] rounded-full mr-2 hover:bg-gray-400"
            >
              <X className="size-3 text-white" />
            </button>
          )}
        </div>
        <button onClick={handleOpenFilter} className="relative hover:text-[#53B175]">
          <Settings2 className="w-6 h-6" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#53B175] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 pb-24 md:pb-6 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 w-full overflow-y-auto no-scrollbar md:scrollbar-thin">
        {products.length === 0 ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
              isInCart={cartItems.some((item) => item.productId === product.id)}
            />
          ))
        )}
      </div>

      {/* Filter Sheet */}
      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side={isTabletOrMobile ? "bottom" : "right"}>
          <SheetHeader className="pb-2">
            <SheetTitle className="text-2xl font-semibold text-[#181725]">
              Filters
            </SheetTitle>
            <SheetClose />
          </SheetHeader>
          <hr className="border-[#E2E2E2]" />
          <div className="flex flex-col gap-8 p-4">

            {/* Sort */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-semibold text-[#181725]">Sort By</h4>
              <div className="flex flex-col gap-3">
                {(
                  [
                    { value: "none", label: "Default" },
                    { value: "price-asc", label: "Price: Low to High" },
                    { value: "price-desc", label: "Price: High to Low" },
                    { value: "rating-desc", label: "Rating: High to Low" },
                  ] as { value: SortOption; label: string }[]
                ).map((opt) => (
                  <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      value={opt.value}
                      checked={pendingFilters.sort === opt.value}
                      onChange={() =>
                        setPendingFilters((f) => ({ ...f, sort: opt.value }))
                      }
                      className="accent-[#53B175] w-4 h-4"
                    />
                    <span className="text-base text-[#181725]">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-[#E2E2E2]" />

            {/* Min Rating */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-semibold text-[#181725]">Minimum Rating</h4>
              <div className="flex gap-3 flex-wrap">
                {[0, 3, 4, 4.5].map((r) => (
                  <button
                    key={r}
                    onClick={() =>
                      setPendingFilters((f) => ({ ...f, minRating: r }))
                    }
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                      pendingFilters.minRating === r
                        ? "bg-[#53B175] text-white border-[#53B175]"
                        : "bg-white text-[#181725] border-[#E2E2E2] hover:border-[#53B175]"
                    }`}
                  >
                    {r === 0 ? "Any" : `${r}+`} ★
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-[#E2E2E2]" />

            {/* Discount Only */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={pendingFilters.discountOnly}
                onChange={(e) =>
                  setPendingFilters((f) => ({ ...f, discountOnly: e.target.checked }))
                }
                className="accent-[#53B175] w-4 h-4"
              />
              <span className="text-base font-medium text-[#181725]">
                Discounted items only
              </span>
            </label>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-14 rounded-2xl border-[#E2E2E2] text-[#181725]"
                onClick={handleClearFilters}
              >
                Clear All
              </Button>
              <Button
                className="flex-1 h-14 bg-[#53B175] text-white rounded-2xl"
                onClick={handleApplyFilters}
              >
                Apply
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CategoryProducts;
