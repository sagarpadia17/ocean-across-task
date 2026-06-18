import { Input } from "@/components/ui/input";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const Verification = () => {
  return (
    <div className=" flex h-screen items-center justify-center bg-[#53B175]">
      <div className="relative flex flex-col p-6 justify-between w-full lg:max-w-lg h-screen lg:max-h-[calc(100vh-64px)] lg:rounded-xl bg-white">
        <div className="flex flex-col gap-8">
          <div className="w-8 h-8 bg-[#030303] rounded-full flex items-center justify-center text-white text-lg font-semibold">
            <FaChevronLeft />
          </div>
          <h5 className="text-2xl font-semibold text-[#030303]">
            Enter your 4-digit code
          </h5>
          <div className="flex flex-col gap-2 w-full">
            <h6 className="text-base font-semibold text-[#7C7C7C]">Code</h6>
            <Input placeholder="----"/>
          </div>
        </div>
        <div className="w-full flex items-center justify-between gap-4">
          <h6 className="text-lg font-normal text-[#53B175]">Resend Code</h6>
          <div className="w-16 h-16 bg-[#53B175] rounded-full flex items-center justify-center self-end text-white text-lg font-semibold">
            <FaChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Verification;
