import OrderFailedImage from "@/assets/order-failed.svg";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface OrderFailedDialogProps {
  open: boolean;
  onClose: () => void;
  onRetry: () => void;
  onBackToHome: () => void;
}

const OrderFailedDialog = ({
  open,
  onClose,
  onRetry,
  onBackToHome,
}: OrderFailedDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogClose />
        </DialogHeader>
        <div className="flex flex-col items-center p-6 gap-12">
          <img
            src={OrderFailedImage}
            alt="Order Failed"
            className="w-52 h-52 object-cover"
          />
          <div className="flex flex-col gap-4">
            <h4 className="text-[28px] font-semibold text-[#181725] text-center">
              Oops! Order Failed
            </h4>
            <p className="text-base font-normal text-[#7C7C7C] text-center">
              Something went terribly wrong. Please try again.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Button
              className="h-16 bg-[#53B175] w-full text-white text-lg font-semibold rounded-2xl"
              onClick={onRetry}
            >
              Please Try Again
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

export default OrderFailedDialog;
