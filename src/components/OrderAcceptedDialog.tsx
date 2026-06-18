import OrderAcceptedImage from "@/assets/order-accepted.svg";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface OrderAcceptedDialogProps {
  open: boolean;
  onClose: () => void;
  onBackToHome: () => void;
  onTrackOrder: () => void;
}

const OrderAcceptedDialog = ({
  open,
  onClose,
  onBackToHome,
  onTrackOrder,
}: OrderAcceptedDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogClose />
        </DialogHeader>
        <div className="flex flex-col items-center p-6 gap-12">
          <img
            src={OrderAcceptedImage}
            alt="Order Accepted"
            className="w-52 h-52 object-cover"
          />
          <div className="flex flex-col gap-4">
            <h4 className="text-[28px] font-semibold text-[#181725] text-center">
              Your Order has been accepted
            </h4>
            <p className="text-base font-normal text-[#7C7C7C] text-center">
              Your items have been placed and are on their way to being processed.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Button
              className="h-16 bg-[#53B175] w-full text-white text-lg font-semibold rounded-2xl"
              onClick={onTrackOrder}
            >
              Track Order
            </Button>
            <Button
              className="h-8 bg-white w-full text-[#181725] text-lg font-semibold rounded-2xl hover:bg-gray-50"
              onClick={onBackToHome}
            >
              Back to home
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderAcceptedDialog;
