import CartCard from "@/components/CartCard";
import FilterSheet from "@/components/FilterSheet";
import OrderAcceptedDialog from "@/components/OrderAcceptedDialog";
import OrderFailedDialog from "@/components/OrderFailedDialog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
const Cart = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [isOpen, setIsOpen] = useState<boolean>();
  return (
    <div className="w-full h-[calc(100vh-82px)] pt-6 md:p-8 gap-6 flex flex-col">
      <h1 className="text-xl md:text-3xl font-bold text-[#181725] text-center md:text-start">
        My Cart
      </h1>
      <hr className="border-[#E2E2E2]" />
      <div className="relative md:static w-full h-full flex items-center justify-center px-6 md:px-0 gap-6">
        <div className="w-full md:w-3/4 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full pb-16 md:pb-0 h-[calc(100vh-256px)] overflow-y-auto no-scrollbar md:scrollbar-thin">
            <CartCard />
          </div>
        </div>
        <div className="w-1/4 hidden md:flex h-max self-start bg-[#F2F3F2] rounded-xl p-6  flex-col gap-4">
          <h5 className="text-xl font-semibold text-[#181725]">
            Order summary
          </h5>
          <div className="flex items-center justify-between">
            <h6 className="text-base font-semibold text-[#7C7C7C]">Total</h6>
            <h2 className="text-lg font-semibold text-[#181725]">$4.99</h2>
          </div>
          <Button
            className="h-16 bg-[#53B175] w-full text-white text-lg font-semibold rounded-2xl "
            onClick={() => setIsOpen(true)}
          >
            Go to Checkout
          </Button>
        </div>
        <div className="w-full absolute bottom-0 left-0 p-6 md:hidden bg-white flex items-center justify-center gap-4">
          <Button
            className="relative h-16 bg-[#53B175] w-full max-w-md text-white text-lg font-semibold rounded-2xl "
            onClick={() => setIsOpen(true)}
          >
            Go to Checkout
            <div className="absolute flex items-center justify-center bg-[#489E67] p-1 rounded right-10">
              <p className="text-xs font-semibold text-white">$4.99</p>
            </div>
          </Button>
        </div>
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side={isTabletOrMobile ? "bottom" : "right"}>
          <SheetHeader className="pb-2">
            <SheetTitle className="text-2xl font-semibold text-[#181725]">
              Checkout
            </SheetTitle>
            <SheetClose />
          </SheetHeader>
          <hr className="border-[#E2E2E2]" />
          <div className="flex flex-col gap-4 p-4">
            <div className="flex justify-between items-center gap-4">
              <h5 className="text-lg font-semibold text-[#7C7C7C]">Delivery</h5>
              <div className="flex items-center gap-2">
                <h6 className="text-base font-semibold text-[#181725]">
                  Select Method
                </h6>
                <ChevronRight className="text-[#181725]" />
              </div>
            </div>
            <hr className="border-[#E2E2E2]" />
            <div className="flex justify-between items-center gap-4">
              <h5 className="text-lg font-semibold text-[#7C7C7C]">Payment</h5>
              <div className="flex items-center gap-2">
                <h6 className="text-base font-semibold text-[#181725]">
                  Select Method
                </h6>
                <ChevronRight className="text-[#181725]" />
              </div>
            </div>
            <hr className="border-[#E2E2E2]" />
            <div className="flex justify-between items-center gap-4">
              <h5 className="text-lg font-semibold text-[#7C7C7C]">
                Promo Code
              </h5>
              <div className="flex items-center gap-2">
                <h6 className="text-base font-semibold text-[#181725]">
                  Pick discount
                </h6>
                <ChevronRight className="text-[#181725]" />
              </div>
            </div>
            <hr className="border-[#E2E2E2]" />
            <div className="flex justify-between items-center gap-4">
              <h5 className="text-lg font-semibold text-[#7C7C7C]">
                Total Cost
              </h5>
              <div className="flex items-center gap-2">
                <h6 className="text-base font-semibold text-[#181725]">
                  $13.97
                </h6>
                <ChevronRight className="text-[#181725]" />
              </div>
            </div>
            <hr className="border-[#E2E2E2]" />
            <p className="text-sm font-semibold text-[#7C7C7C]">
              By placing an order you agree to our{" "}
              <span className="text-[#181725]">Terms</span> and{" "}
              <span className="text-[#181725]">Conditions</span>
            </p>
            <Button className="h-16 bg-[#53B175] w-full text-white text-lg font-semibold rounded-2xl ">
              Place Order
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <FilterSheet />
      <OrderAcceptedDialog />
      <OrderFailedDialog />
    </div>
  );
};

export default Cart;
