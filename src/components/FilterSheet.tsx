import { useMediaQuery } from "react-responsive";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { groceryCategories } from "@/constants/GroceryCategories";
import { Checkbox } from "@/components/ui/checkbox";
const FilterSheet = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <Sheet>
      <SheetContent side={isTabletOrMobile ? "bottom" : "right"}>
        <SheetHeader className="pb-2">
          <SheetTitle className="text-2xl font-semibold text-[#181725]">
            Filters
          </SheetTitle>
          <SheetClose />
        </SheetHeader>
        <hr className="border-[#E2E2E2]" />
        <div className="flex flex-col gap-10 p-4">
          <div className="flex flex-col gap-6">
            <h4 className="text-2xl font-semibold text-[#181725]">
              Categories
            </h4>
            <div className="flex flex-col gap-4 h-92 overflow-y-scroll scrollbar-thin">
              {groceryCategories.map((category) => (
                <div className="flex gap-2 items-center" key={category.id}>
                  <Checkbox />
                  <h6 className="text-base font-normal text-[#181725]">
                    {category.name}
                  </h6>
                </div>
              ))}
            </div>
          </div>
          <Button className="h-16 bg-[#53B175] w-full text-white text-lg font-semibold rounded-2xl ">
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default FilterSheet;
