import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { groceryCategories } from "@/constants/GroceryCategories";
import GroceryCategoryCard from "@/components/GroceryCategoryCard";

const Explore = () => {
  return (
    <div className="w-full h-[calc(100vh-82px)] px-6 pt-6 md:p-8 gap-6 flex flex-col">
      <h1 className="text-xl md:text-3xl font-bold text-[#181725] text-center md:text-start">
        Find Products
      </h1>
      <div className="w-full p-2 h-12 bg-[#F2F3F2] rounded-xl flex items-center">
        <Search className="w-6 h-6 text-[#7C7C7C] ms-2" />
        <Input
          className="bg-transparent border-none focus:ring-0"
          placeholder="Search Store"
        />
      </div>
      <div className="grid grid-cols-2 pb-6 md:pb-0 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 w-full h-full overflow-y-auto no-scrollbar md:scrollbar-thin">
        {groceryCategories.map((category) => (
          <GroceryCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
