import OfferBanner from "@/assets/offer-banner.svg";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";

const Shop = () => {
  return (
    <div className="w-full h-[calc(100vh-82px)] px-6 pt-6 md:p-8 gap-6 flex flex-col">
      <div className="flex items-center justify-center md:justify-start gap-2">
        <MapPin />
        <h1 className="text-xl md:text-2xl font-bold text-[#181725] text-center md:text-start">
          New Ranip, Ahmedabad
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
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <h4 className="text-2xl font-semibold text-[#181725]">
            Exclusive Offer
          </h4>
          <h6 className="text-base font-semibold text-[#53B175]">See all</h6>
        </div>
        <div className="flex items-center gap-4 overflow-x-scroll no-scrollbar">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <h4 className="text-2xl font-semibold text-[#181725]">
            Best Selling
          </h4>
          <h6 className="text-base font-semibold text-[#53B175]">See all</h6>
        </div>
        <div className="flex items-center gap-4 overflow-x-scroll no-scrollbar">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <h4 className="text-2xl font-semibold text-[#181725]">
            Groceries
          </h4>
          <h6 className="text-base font-semibold text-[#53B175]">See all</h6>
        </div>
        <div className="flex items-center gap-4 overflow-x-scroll no-scrollbar">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default Shop;
