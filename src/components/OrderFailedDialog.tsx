import OrderFailedImage from "@/assets/order-failed.svg";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
const OrderFailedDialog = () => {
  return (
    <Dialog>
      <DialogContent >
        <DialogHeader>
          <DialogClose />
        </DialogHeader>
        <div className="flex flex-col items-center p-6 gap-12">
          <img
            src={OrderFailedImage}
            alt="OrderFailedImage"
            className="w-52 h-52 object-cover"
          />
          <div className="flex flex-col gap-4">
            <h4 className="text-[28px] font-semibold text-[#181725] text-center">
              Oops! Order Failed
            </h4>
            <p className="text-base font-normal text-[#7C7C7C] text-center">
              Something went tembly wrong.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Button className="h-16 bg-[#53B175] w-full text-white text-lg font-semibold rounded-2xl ">
              Please Try Again
            </Button>
            <Button className="h-8 bg-white w-full text-[#181725] text-lg font-semibold rounded-2xl ">
              Back to home
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default OrderFailedDialog;
