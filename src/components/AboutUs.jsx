import aboutImg from "../assets/cover/about.jpg";

const AboutUs = () => {
  return (
    <>
      <div className="w-full min-h-screen p-10 flex flex-col md:flex-row border-red-600">
        <div className="w-full md:w-[50%]">
          <div>
            <span className="font-roboto text-5xl">About Us</span>
            <p className="font-worksans my-10 md:mr-[20%]">
              Welcome to our LifeNeeds Apparel, your one-stop destination
              for artistic and expressive apparel that turns fashion into
              wearable art. We are passionate about curating a diverse
              collection of printed clothing, each piece handpicked to reflect
              creativity, individuality, and unparalleled style.
            </p>
          </div>
          <div>
            <span className="font-roboto">Our Vision</span>
            <p className="font-worksans mt-5 mb-10 md:mr-[20%]">
              At our LifeNeeds Apparel, we envision a world where clothing
              becomes a canvas for artistic expression. We believe that wearing
              unique and captivating prints is a powerful way to showcase your
              personality and stand out from the crowd. Our mission is to bring
              you a carefully curated selection of printed garments that
              celebrate creativity and inspire confidence.
            </p>
          </div>
          <div>
            <span className="font-roboto">Quality and Craftsmanship</span>
            <p className="font-worksans mt-5 mb-10 md:mr-[20%]">
              Quality is the cornerstone of our printed clothing. Each design is
              expertly printed on premium fabrics, ensuring vivid colors and
              sharp details that won't fade with time. Our garments are crafted
              with care, embracing comfort and durability to accompany you on
              your adventures and daily pursuits.
            </p>
          </div>
          <div>
            <span className="font-roboto">Artistic Diversity</span>
            <p className="font-worksans mt-5 mb-10 md:mr-[20%]">
              From abstract masterpieces to eye-catching graphics, our
              collection boasts a range of prints that appeal to various tastes
              and artistic sensibilities. Whether you seek nature-inspired
              patterns, urban street art, or playful pop culture references, our
              printed clothing offers a canvas to showcase your personal style
              and passions.
            </p>
          </div>
          <div>
            <span className="font-roboto">Wear Your Artistic Spirit</span>
            <p className="font-worksans mt-5 mb-10 md:mr-[20%]">
              Discover our exclusive collection of printed clothing and unlock
              the artist within you. Express yourself through fashion, and let
              your clothing tell a story that is uniquely yours. With our
              printed garments, you can turn every day into a wearable art
              exhibition. Thank you for choosing our LifeNeeds Apparel.
              Embrace your individuality and celebrate creativity with every
              step you take.
            </p>
          </div>
        </div>
        <div className="w-full md:w-[50%] flex flex-col items-center">
          <img src={aboutImg} />
          <span className="my-2 font-worksans italic font-bold">
            " Wear Art. Inspire Creativity. Unleash Your Unique Style. "
          </span>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
