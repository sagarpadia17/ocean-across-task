import { Plus } from "lucide-react";

const ProductCard = () => {
  return (
    <div className="min-w-44 p-4 rounded-2xl border border-[#E2E2E2] flex flex-col gap-4 h-max">
      <div className="flex items-center justify-center">
        <img
          src="https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=2048x2048&w=is&k=20&c=y-vQTuSseLrreXAfueKeeXMwyYV9Pgw4Pt_V0tbxbl8="
          alt="Green Apple"
          className="w-full h-24 max-h-24 rounded-xl object-contain"
        />
      </div>
      <div>
        <h6 className="text-base font-bold text-[#181725]">Diet Coke</h6>
        <p className="text-sm font-medium text-[#7C7C7C]">355ml, Price</p>
      </div>
      <div className="flex justify-between items-center gap-4">
        <h5 className="text-lg font-semibold text-[#181725]">$1.99</h5>
        <div className="h-10 w-10 flex justify-center items-center rounded-[16px] bg-[#53B175] text-white">
          <Plus />
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
