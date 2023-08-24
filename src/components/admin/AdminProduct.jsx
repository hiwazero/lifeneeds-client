import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Buffer } from "buffer";
import axios from "axios";
import { getToken } from "../../url/token";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const base64Image = (data) => {
    return Buffer.from(data).toString("base64");
  };

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
  }, [isClicked]);

  const onDeleteHandler = async (id) => {
    setIsClicked((prev) => !prev);
    await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  };

  return (
    <>
      <div className="m-5 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <Link to={"add"}>
                <Button gradientMonochrome="info" size="lg" className="m-5">
                  Add Product
                </Button>
              </Link>

              {products.length === 0 ? (
                // <ListPlaceholder />
                <h1>LOADING</h1>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Product Name
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Color(s)
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Size(s)
                      </th>
                      <th scope="col" className="relative px-6 py-3  text-xs">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {product.images[0] && (
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={`data:image/png;base64,${base64Image(
                                      product.images[0]
                                    )}`}
                                    alt="test"
                                  />
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            &#8369;{product.price.toFixed(2)}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.color.join(", ")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.size.join(", ")}
                          </td>

                          <td className="cursor-pointer px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={`edit/${product._id}`}
                              className="mx-5 text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </Link>
                            <span
                              className="mx-5 text-indigo-600 hover:text-indigo-900"
                              onClick={() => onDeleteHandler(product._id)}
                            >
                              Delete
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProduct;
