import Logo from "../assets/logo-white.png";
import Cover from "../assets/cover/cover.png";

const Footer = () => {
  return (
    <>
      <footer className="bg-black">
        <div className="w-full max-w-screen-xl p-4 md:py-8 mx-auto ">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0"
            >
              <img src={Cover} className="w-auto h-8 lg:h-16" />
              <img src={Logo} className="h-20 mr-3" alt="Flowbite Logo" />
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a
                  href="https://www.facebook.com/lifeneedsapparel"
                  target="_blank"
                  className="mr-4 hover:underline md:mr-6 "
                >
                  <i className="fa-brands fa-square-facebook fa-2xl"></i>
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">
                  <i className="fa-brands fa-instagram fa-2xl"></i>
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-3" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              LifeNeeds Apparel
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
