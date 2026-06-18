import CartCard from "@/components/CartCard";
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
import { useCartStore } from "@/stores/cartStore";
import { useOrdersStore } from "@/stores/ordersStore";
import { useCurrentUser } from "@/hooks";
import { ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router";

type OrderResult = "accepted" | "failed" | null;

const Cart = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate();
  const { user } = useCurrentUser();

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [orderResult, setOrderResult] = useState<OrderResult>(null);

  const cartItems = useCartStore((state) => state.cartItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = getTotalPrice();

  const addOrder = useOrdersStore((state) => state.addOrder);

  const handlePlaceOrder = async () => {
    setPlacing(true);

    // Simulate a network delay
    await new Promise((res) => setTimeout(res, 1500));

    const success = Math.random() > 0.4; // ~60% success rate

    if (success) {
      addOrder({
        id: `order-${Date.now()}`,
        userId: user?.id ?? "guest",
        items: cartItems,
        totalPrice,
        status: "CONFIRMED",
        shippingAddress: user?.address ?? "",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      clearCart();
      setCheckoutOpen(false);
      setOrderResult("accepted");
    } else {
      setCheckoutOpen(false);
      setOrderResult("failed");
    }

    setPlacing(false);
  };

  const handleBackToHome = () => {
    setOrderResult(null);
    navigate("/store/shop");
  };

  const handleRetry = () => {
    setOrderResult(null);
    setCheckoutOpen(true);
  };

  return (
    <div className="w-full h-[calc(100vh-82px)] pt-6 md:p-8 gap-6 flex flex-col">
      <h1 className="text-xl md:text-3xl font-bold text-[#181725] text-center md:text-start">
        My Cart
      </h1>
      <hr className="border-[#E2E2E2]" />

      <div className="relative md:static w-full h-full flex items-center justify-center px-6 md:px-0 gap-6">
        {/* Cart items */}
        <div className="w-full md:w-3/4 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full pb-16 md:pb-0 h-[calc(100vh-256px)] overflow-y-auto no-scrollbar md:scrollbar-thin">
            {cartItems.length === 0 ? (
              <div className="col-span-full flex items-center justify-center py-12">
                <p className="text-gray-500 text-lg">Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((item) => <CartCard key={item.id} item={item} />)
            )}
          </div>
        </div>

        {/* Desktop order summary */}
        <div className="w-1/4 hidden md:flex h-max self-start bg-[#F2F3F2] rounded-xl p-6 flex-col gap-4">
          <h5 className="text-xl font-semibold text-[#181725]">Order summary</h5>
          <div className="flex items-center justify-between">
            <h6 className="text-base font-semibold text-[#7C7C7C]">Total</h6>
            <h2 className="text-lg font-semibold text-[#181725]">₹{totalPrice.toFixed(0)}</h2>
          </div>
          <Button
            className="h-16 bg-[#53B175] w-full text-white text-lg font-semibold rounded-2xl"
            onClick={() => setCheckoutOpen(true)}
            disabled={cartItems.length === 0}
          >
            Go to Checkout
          </Button>
        </div>

        {/* Mobile checkout bar */}
        <div className="w-full absolute bottom-0 left-0 p-6 md:hidden bg-white flex items-center justify-center gap-4">
          <Button
            className="relative h-16 bg-[#53B175] w-full max-w-md text-white text-lg font-semibold rounded-2xl"
            onClick={() => setCheckoutOpen(true)}
            disabled={cartItems.length === 0}
          >
            Go to Checkout
            <div className="absolute flex items-center justify-center bg-[#489E67] p-1 rounded right-10">
              <p className="text-xs font-semibold text-white">₹{totalPrice.toFixed(0)}</p>
            </div>
          </Button>
        </div>
      </div>

      {/* Checkout Sheet */}
      <Sheet open={checkoutOpen} onOpenChange={setCheckoutOpen}>
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
                <h6 className="text-base font-semibold text-[#181725]">Select Method</h6>
                <ChevronRight className="text-[#181725]" />
              </div>
            </div>
            <hr className="border-[#E2E2E2]" />
            <div className="flex justify-between items-center gap-4">
              <h5 className="text-lg font-semibold text-[#7C7C7C]">Payment</h5>
              <div className="flex items-center gap-2">
                <h6 className="text-base font-semibold text-[#181725]">Select Method</h6>
                <ChevronRight className="text-[#181725]" />
              </div>
            </div>
            <hr className="border-[#E2E2E2]" />
            <div className="flex justify-between items-center gap-4">
              <h5 className="text-lg font-semibold text-[#7C7C7C]">Promo Code</h5>
              <div className="flex items-center gap-2">
                <h6 className="text-base font-semibold text-[#181725]">Pick discount</h6>
                <ChevronRight className="text-[#181725]" />
              </div>
            </div>
            <hr className="border-[#E2E2E2]" />
            <div className="flex justify-between items-center gap-4">
              <h5 className="text-lg font-semibold text-[#7C7C7C]">Total Cost</h5>
              <div className="flex items-center gap-2">
                <h6 className="text-base font-semibold text-[#181725]">
                  ₹{totalPrice.toFixed(0)}
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
            <Button
              className="h-16 bg-[#53B175] w-full text-white text-lg font-semibold rounded-2xl disabled:opacity-70"
              onClick={handlePlaceOrder}
              disabled={placing}
            >
              {placing ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </span>
              ) : (
                "Place Order"
              )}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <OrderAcceptedDialog
        open={orderResult === "accepted"}
        onClose={() => setOrderResult(null)}
        onBackToHome={handleBackToHome}
        onTrackOrder={handleBackToHome}
      />

      <OrderFailedDialog
        open={orderResult === "failed"}
        onClose={() => setOrderResult(null)}
        onRetry={handleRetry}
        onBackToHome={handleBackToHome}
      />
    </div>
  );
};

export default Cart;
