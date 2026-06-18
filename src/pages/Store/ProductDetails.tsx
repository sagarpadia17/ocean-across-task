import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, Star } from "lucide-react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import ProductCarousel from "@/components/ProductCarousel";

const ProductDetails = () => {
  // Sample product images - replace with actual product data
  const productImages = [
    "https://static.vecteezy.com/system/resources/thumbnails/055/195/201/small/fresh-apple-high-resolution-detail-photo.jpg",
    "https://media.istockphoto.com/id/488839458/photo/fresh-apples-in-a-wooden-white-box.jpg?s=612x612&w=0&k=20&c=EQU_Z7BmM6v7WFe5N5Sh1Xg-CmdaOi6xylKVP1JhgzU=",
    "https://media.istockphoto.com/id/514987220/photo/half-of-red-apple-on-wooden-background.jpg?s=612x612&w=0&k=20&c=0wwIdFuSj7vYN64Ue8ikjc9As6LvaFcL7phfNAl1too=",
    "https://media.istockphoto.com/id/520770253/photo/apples.jpg?s=2048x2048&w=is&k=20&c=_bAS6M1Y_Wcyh6Kpylc382vi71uojuWWk95O-EJwEAs=",
    "https://media.istockphoto.com/id/484952487/photo/pile-of-red-apples.jpg?s=612x612&w=0&k=20&c=PPD0TTW0mTonA70hw8SRctNdrpzyVYefF3kq86y0zSA=",
    "https://media.istockphoto.com/id/488839458/photo/fresh-apples-in-a-wooden-white-box.jpg?s=612x612&w=0&k=20&c=EQU_Z7BmM6v7WFe5N5Sh1Xg-CmdaOi6xylKVP1JhgzU=",
    "https://media.istockphoto.com/id/514987220/photo/half-of-red-apple-on-wooden-background.jpg?s=612x612&w=0&k=20&c=0wwIdFuSj7vYN64Ue8ikjc9As6LvaFcL7phfNAl1too=",
    "https://media.istockphoto.com/id/520770253/photo/apples.jpg?s=2048x2048&w=is&k=20&c=_bAS6M1Y_Wcyh6Kpylc382vi71uojuWWk95O-EJwEAs=",
    "https://media.istockphoto.com/id/484952487/photo/pile-of-red-apples.jpg?s=612x612&w=0&k=20&c=PPD0TTW0mTonA70hw8SRctNdrpzyVYefF3kq86y0zSA=",
    "https://media.istockphoto.com/id/488839458/photo/fresh-apples-in-a-wooden-white-box.jpg?s=612x612&w=0&k=20&c=EQU_Z7BmM6v7WFe5N5Sh1Xg-CmdaOi6xylKVP1JhgzU=",
    "https://media.istockphoto.com/id/514987220/photo/half-of-red-apple-on-wooden-background.jpg?s=612x612&w=0&k=20&c=0wwIdFuSj7vYN64Ue8ikjc9As6LvaFcL7phfNAl1too=",
    "https://media.istockphoto.com/id/520770253/photo/apples.jpg?s=2048x2048&w=is&k=20&c=_bAS6M1Y_Wcyh6Kpylc382vi71uojuWWk95O-EJwEAs=",
  ];

  return (
    <div className="w-full h-[calc(100vh-82px)] md:p-8 gap-6 flex flex-col">
      <h1 className="hidden md:block text-xl md:text-3xl font-bold text-[#181725] text-center md:text-start">
        Product Details
      </h1>
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/2">
          <ProductCarousel images={productImages} />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-6 px-6 pb-24">
          <div className="flex justify-between">
            <div>
              <h5 className="text-2xl font-bold text-[#181725]">
                Natural Red Apple
              </h5>
              <h6 className="text-base font-semibold text-[#7C7C7C]">
                1kg, Price
              </h6>
            </div>
            <Heart />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <Minus className="w-5 h-5 text-[#B3B3B3]" />
              <div className="w-10 h-10 rounded-xl border border-[#F0F0F0] flex items-center justify-center cursor-pointer ">
                <h6 className="text-base font-semibold text-[#181725]">1</h6>
              </div>
              <Plus className="w-5 h-5 text-[#53B175]" />
            </div>
            <h5 className="text-2xl font-bold text-[#181725]">$4.99</h5>
          </div>
          <hr className="border-[#E2E2E2]" />
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h6 className="text-base font-semibold text-[#181725]">
                Product Detail
              </h6>
              <FaChevronDown />
            </div>
            <p className="text-sm font-medium text-[#7C7C7C]">
              Apples are nutritious. Apples may be good for weight loss. apples
              may be good for your heart. As part of a healtful and varied diet.
            </p>
          </div>
          <hr className="border-[#E2E2E2]" />
          <div className="flex justify-between">
            <h6 className="text-base font-semibold text-[#181725]">
              Nutritions
            </h6>
            <FaChevronRight />
          </div>
          <hr className="border-[#E2E2E2]" />
          <div className="flex justify-between">
            <h6 className="text-base font-semibold text-[#181725]">Review</h6>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="size-3.5 text-[#F3603F] fill-[#F3603F]" />
                <Star className="size-3.5 text-[#F3603F] fill-[#F3603F]" />
                <Star className="size-3.5 text-[#F3603F] fill-[#F3603F]" />
                <Star className="size-3.5 text-[#F3603F] fill-[#F3603F]" />
                <Star className="size-3.5 text-[#F3603F] fill-[#F3603F]" />
              </div>
              <FaChevronRight />
            </div>
          </div>
          <Button className="h-16 bg-[#53B175] w-full text-white text-lg font-semibold rounded-2xl ">
            Add to Basket
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
