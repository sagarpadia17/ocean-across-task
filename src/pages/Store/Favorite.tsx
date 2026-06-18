import FavoriteCard from "@/components/FavoriteCard";
import { Button } from "@/components/ui/button";

const Favorite = () => {
  return (
    <div className="w-full h-[calc(100vh-82px)] pt-6 md:p-8 gap-6 flex flex-col">
      <div className="flex items-center justify-center md:justify-between">
        <h1 className="text-xl md:text-3xl font-bold text-[#181725] text-center md:text-start">
          Favorite
        </h1>
        <Button className="h-16 bg-[#53B175] w-64 hidden md:flex text-white text-lg font-semibold rounded-2xl ">
          Add All To Cart
        </Button>
      </div>
      <hr className="border-[#E2E2E2]" />
      <div className="relative md:static w-full h-full flex items-center justify-center px-6 md:px-0 gap-6">
        <div className="w-full h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full pb-16 md:pb-0 h-[calc(100vh-256px)] overflow-y-auto no-scrollbar md:scrollbar-thin">
            <FavoriteCard />
          </div>
        </div>
        <div className="w-full absolute bottom-0 left-0 p-6 md:hidden bg-white flex items-center justify-center gap-4">
          <Button className="h-16 bg-[#53B175] w-full max-w-md text-white text-lg font-semibold rounded-2xl">
            Add All To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Favorite;
