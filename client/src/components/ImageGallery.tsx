import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    title: string;
  }>;
  triggerImage: {
    src: string;
    alt: string;
    className?: string;
  };
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, triggerImage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openGallery = (index = 0) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  if (!isOpen) {
    return (
      <div className="cursor-pointer" onClick={() => openGallery()}>
        <img 
          src={triggerImage.src}
          alt={triggerImage.alt}
          className={triggerImage.className || "rounded-2xl shadow-lg w-full h-auto"}
        />
        <div className="mt-2 text-center">
          <p className="text-xs text-mums-accent font-medium">Click to browse gallery ({images.length} images)</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full">
        {/* Close button */}
        <Button
          onClick={() => setIsOpen(false)}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <Button
              onClick={prevImage}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={nextImage}
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </>
        )}

        {/* Main image */}
        <div className="text-center">
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="max-w-full max-h-[80vh] mx-auto rounded-lg shadow-2xl"
          />
          <div className="mt-4 text-white">
            <h3 className="text-lg font-semibold">{images[currentIndex].title}</h3>
            <p className="text-sm opacity-75">
              {currentIndex + 1} of {images.length}
            </p>
          </div>
        </div>

        {/* Thumbnail navigation */}
        {images.length > 1 && (
          <div className="flex justify-center mt-6 space-x-2 overflow-x-auto max-w-full">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? "border-mums-accent"
                    : "border-white border-opacity-30 hover:border-opacity-60"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;