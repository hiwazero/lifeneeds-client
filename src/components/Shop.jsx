import { useEffect, useState } from "react";
import axios from "axios";
import ShopCard from "./ShopCard";
import ShopSkeleton from "./skeleton/ShopSkeleton";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        const data = await res.data;
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <section className="min-h-screen body-font text-gray-600">
        <div className="container mx-auto px-5 py-10">
          <div className="-m-4 flex flex-wrap">
            {products.length > 0 ? (
              products.map((product) => {
                return <ShopCard key={product._id} product={product} />;
              })
            ) : (
              <ShopSkeleton />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
