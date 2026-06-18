import IntlTelInput from "@intl-tel-input/react";
import "intl-tel-input/styles";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const Number = () => {
  return (
    <div className=" flex h-screen items-center justify-center bg-[#53B175]">
      <div className="relative flex flex-col p-6 justify-between w-full lg:max-w-lg h-screen lg:max-h-[calc(100vh-64px)] lg:rounded-xl bg-white">
        <div className="flex flex-col gap-8">
          <div className="w-8 h-8 bg-[#030303] rounded-full flex items-center justify-center text-white text-lg font-semibold">
            <FaChevronLeft />
          </div>
          <h5 className="text-2xl font-semibold text-[#030303]">
            Enter your mobile number
          </h5>
          <div className="flex flex-col gap-2 w-full">
            <h6 className="text-base font-semibold text-[#7C7C7C]">
              Mobile Number
            </h6>
            <IntlTelInput
              initialCountry="in"
              loadUtils={() => import("intl-tel-input/utils")}
            />
          </div>
        </div>
        <div className="w-16 h-16 bg-[#53B175] rounded-full flex items-center justify-center self-end text-white text-lg font-semibold">
          <FaChevronRight />
        </div>
      </div>
    </div>
  );
};
export default Number;
