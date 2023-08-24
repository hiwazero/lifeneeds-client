import desktopCover from "../assets/cover/cover.jpg";

import mobileCover1 from "../assets/cover/responsive-cover.jpg";
import mobileCover2 from "../assets/cover/responsive-cover2.jpg";
import mobileCover3 from "../assets/cover/responsive-cover3.jpg";
import mobileCover4 from "../assets/cover/placeholder.jpg";

import { useEffect, useState, useRef } from "react";
import { Carousel } from "flowbite-react";

const Home = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  // Changing of image cover
  useEffect(() => {
    const mobileImages = [
      `${mobileCover1}`,
      `${mobileCover2}`,
      `${mobileCover3}`,
      `${mobileCover4}`,
    ]; // Array of image paths
    let currentMobileImageIndex = 0;

    const changeBackgroundImage = () => {
      if (!isDesktop) {
        const container = containerRef.current;
        container.style.backgroundImage = `url(${mobileImages[currentMobileImageIndex]})`;

        currentMobileImageIndex =
          (currentMobileImageIndex + 1) % mobileImages.length;
      }
    };

    const intervalId = setInterval(changeBackgroundImage, 5000); // Change image every 5 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Handling of window size
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isDesktop]);

  const desktopBackgroundImage = {
    backgroundImage: `url(${desktopCover})`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
  };

  const mobileBackgroundImage = {
    backgroundSize: `100% 100%`,
    backgroundRepeat: `no-repeat`,
  };

  useEffect(() => {
    const handleImageLoad = () => {
      setIsLoading(false);
    };

    const image = new Image();
    image.src = desktopCover;
    image.onload = handleImageLoad;

    return () => {
      image.onload = null;
    };
  }, [desktopCover]);

  return (
    <>
      <div
        className="placeholder-background min-h-screen w-full"
        style={isDesktop ? desktopBackgroundImage : mobileBackgroundImage}
        ref={isDesktop ? null : containerRef}
      ></div>
    </>
  );
};

export default Home;
