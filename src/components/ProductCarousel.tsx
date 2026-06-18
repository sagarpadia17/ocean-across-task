import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

interface ProductCarouselProps {
  images: string[];
}

const ProductCarousel = ({ images }: ProductCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Desktop thumbnail navigation
  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  // Mobile carousel navigation
  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Mobile swipe handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const difference = startX - e.clientX;

    if (difference > 50) {
      goToNext();
      setIsDragging(false);
    } else if (difference < -50) {
      goToPrevious();
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const difference = startX - e.touches[0].clientX;

    if (difference > 50) {
      goToNext();
      setIsDragging(false);
    } else if (difference < -50) {
      goToPrevious();
      setIsDragging(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Mobile Carousel (below md) */}
      <div className="md:hidden relative">
        <div
          ref={carouselRef}
          className="w-full h-80 bg-gray-100 rounded-b-xl overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          <img
            src={images[activeIndex]}
            alt="Product carousel"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Mobile Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-1/2 flex justify-center gap-2 mt-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition ${
                index === activeIndex ? "bg-[#53B175] w-6" : "bg-gray-300 w-2"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Thumbnail Carousel (md and above) */}
      <div className=" hidden md:flex flex-col gap-4">
        {/* Main Image */}
        <div className="relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
          <img
            src={images[activeIndex]}
            alt="Product main"
            className="w-full h-full object-cover"
          />
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 text-[#181725]" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 text-[#181725]" />
          </button>
        </div>
        {/* Mobile Navigation Buttons */}
        {/* Thumbnails */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                index === activeIndex ? "border-[#53B175]" : "border-gray-200"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
