import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { groceryCategories } from "@/constants/GroceryCategories";
import GroceryCategoryCard from "@/components/GroceryCategoryCard";

const Explore = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryClick = (categoryName: string) => {
    navigate("/store/category-products", {
      state: { category: categoryName },
    });
  };

  const query = searchTerm.toLowerCase().trim();
  const visibleCategories = query
    ? groceryCategories.filter((c) => c.name.toLowerCase().includes(query))
    : groceryCategories;

  return (
    <div className="w-full h-[calc(100vh-82px)] px-6 pt-6 md:p-8 gap-6 flex flex-col">
      <h1 className="text-xl md:text-3xl font-bold text-[#181725] text-center md:text-start">
        Find Products
      </h1>
      <div className="w-full p-2 h-12 bg-[#F2F3F2] rounded-xl flex items-center">
        <Search className="w-6 h-6 text-[#7C7C7C] ms-2" />
        <Input
          className="bg-transparent border-none focus:ring-0"
          placeholder="Search categories"
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
      <div className="grid grid-cols-2 pb-6 md:pb-0 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 w-full h-full overflow-y-auto no-scrollbar md:scrollbar-thin">
        {visibleCategories.length === 0 ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <p className="text-gray-500 text-lg">No categories found</p>
          </div>
        ) : (
          visibleCategories.map((category) => (
            <GroceryCategoryCard
              key={category.id}
              category={category}
              onClick={() => handleCategoryClick(category.name)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;
