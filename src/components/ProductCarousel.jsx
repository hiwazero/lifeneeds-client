import { Buffer } from "buffer";
import { Carousel, Spinner } from "flowbite-react";

const ProductCarousel = ({ images }) => {
  const base64Image = (data) => {
    return Buffer.from(data).toString("base64");
  };

  const imageSlides = () => {
    const data = images.map((image, index) => {
      return (
        <div key={index} className="relative w-full">
          <img
            src={`data:image/png;base64,${base64Image(image)}`}
            className="w-full"
            alt={`Slide ${index}`}
          />
        </div>
      );
    });

    return data;
  };

  return (
    <>
      <div className="lg:w-1/2 h-100px w-full object-cover object-center rounded border border-gray-200 text-center">
        <Carousel>
          {images ? (
            imageSlides()
          ) : (
            <div>
              <Spinner
                aria-label="Default status example"
                size="xl"
                color="gray"
              />
            </div>
          )}
        </Carousel>
      </div>
    </>
  );
};

export default ProductCarousel;
