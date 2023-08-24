import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../url/token";
import { useNavigate, useParams } from "react-router-dom";

const CrudProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productVariation, setProductVariation] = useState({
    name: "",
    description: "",
    price: "",
    size: "",
    color: "",
    image: [],
  });
  const [fetchProduct, setFetchProduct] = useState({});
  const [colorArray, setColorArray] = useState([]);
  const [sizeArray, setSizeArray] = useState([]);
  const [imageArray, setImageArray] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      setProductVariation(res.data);
      setFetchProduct(res.data);
      setColorArray(res.data.color);
      setSizeArray(res.data.size);
      setImageArray(res.data.images);
    };

    if (id !== undefined) {
      getData();
    }
  }, [id]);

  const onChangeProductVariation = (e) => {
    const { name, value, files } = e.target;

    if (name !== "image") {
      setProductVariation((prev) => ({ ...prev, [name]: value }));
    } else if (files) {
      const imagesArray = Array.from(files);
      setImageArray([...imageArray, ...imagesArray]);
    }
  };

  const addSizeHandler = (productVariation) => {
    document.getElementById("size").value = "";
    const { size } = productVariation;
    setSizeArray([...sizeArray, size]);
  };

  const removeSize = (index) => {
    const updatedSizes = sizeArray.filter((size, i) => i !== index);
    setSizeArray(updatedSizes);
  };

  const addColorHandler = (productVariation) => {
    document.getElementById("color").value = "";
    const { color } = productVariation;
    setColorArray([...colorArray, color]);
  };

  const removeColor = (index) => {
    const updatedColors = colorArray.filter((color, i) => i !== index);
    setColorArray(updatedColors);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productVariation.name);
    formData.append("description", productVariation.description);
    formData.append("price", productVariation.price);
    sizeArray.forEach((size) => formData.append("size", size));
    colorArray.forEach((color) => formData.append("color", color));
    imageArray.forEach((file) => formData.append("image", file));

    try {
      if (id === undefined) {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/products`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        if (res.status === 201) {
          document.getElementById("name").value = "";
          document.getElementById("description").value = "";
          document.getElementById("price").value = "";
          document.getElementById("description").value = "";
          document.getElementById("image").value = null;
          setColorArray([]);
          setSizeArray([]);
          setImageArray([]);
          setProductVariation({
            name: "",
            description: "",
            price: "",
            size: "",
            color: "",
            image: [],
          });
        }
      } else if (id !== undefined) {
        const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/products/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        if (res.status === 201) {
          navigate("../product");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white border border-4 rounded-lg shadow relative m-10">
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">
            {id !== undefined ? `Edit` : `Add`} product
          </h3>
        </div>

        <div className="p-6 space-y-6">
          <form onSubmit={onSubmitHandler}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder={
                    id !== undefined ? `${fetchProduct.name}` : "shirt name"
                  }
                  onChange={onChangeProductVariation}
                  required=""
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="price"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder={
                    id !== undefined ? `${fetchProduct.price}` : "shirt price"
                  }
                  onChange={onChangeProductVariation}
                  required=""
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="brand"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Sizes
                </label>
                <div className="flex content-evenly gap-5">
                  <input
                    type="text"
                    name="size"
                    id="size"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-[75%] p-2.5"
                    placeholder="shirt size"
                    onChange={onChangeProductVariation}
                    required=""
                  />

                  <Button
                    className="w-[25%]"
                    type="button"
                    onClick={() => {
                      addSizeHandler(productVariation);
                    }}
                  >
                    Save Size
                  </Button>
                </div>

                <aside className="w-full rounded-lg border-2 mt-5">
                  <h2 className="font-os text-lg font-bold">Sizes</h2>
                  <ul className="flex items-start flex-wrap mt-4">
                    {sizeArray.length > 0 &&
                      sizeArray.map((size, index) => {
                        return (
                          <li className="flex mx-1 cursor-pointer" key={index}>
                            <div className="flex gap-2 p-2 px-3  bg-cyan-600 hover:bg-cyan-700 mb-4 rounded font-medium">
                              <h2 className="text-white">{size}</h2>
                              <span
                                className="material-symbols-outlined text-red-600"
                                onClick={() => {
                                  removeSize(index);
                                }}
                              >
                                cancel
                              </span>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </aside>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="price"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Colors
                </label>

                <div className="flex content-evenly gap-5">
                  <input
                    type="text"
                    name="color"
                    id="color"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-[75%] p-2.5"
                    placeholder="shirt color"
                    onChange={onChangeProductVariation}
                    required=""
                  />

                  <Button
                    className="w-[25%]"
                    type="button"
                    onClick={() => {
                      addColorHandler(productVariation);
                    }}
                  >
                    Save Size
                  </Button>
                </div>

                <aside className="w-full rounded-lg border-2 mt-5">
                  <h2 className="font-os text-lg font-bold">Colors</h2>
                  <ul className="flex items-start flex-wrap mt-4">
                    {colorArray.length > 0 &&
                      colorArray.map((color, index) => {
                        return (
                          <li className="flex mx-1 cursor-pointer" key={index}>
                            <div className="flex gap-2 p-2 px-3 bg-cyan-600 hover:bg-cyan-700 mb-4 rounded font-medium">
                              <h2 className="text-white">{color}</h2>
                              <span
                                className="material-symbols-outlined text-red-600"
                                onClick={() => {
                                  removeColor(index);
                                }}
                              >
                                cancel
                              </span>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </aside>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="product-details"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Product Details
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="6"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                  placeholder={
                    id !== undefined
                      ? `${fetchProduct.description}`
                      : "shirt description"
                  }
                  onChange={onChangeProductVariation}
                ></textarea>
              </div>

              <div className="col-span-6 sm:col-span-3 mb-5">
                <label
                  htmlFor="product-name"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Upload Images
                </label>

                <label
                  className="flex  cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-6 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
                  tabIndex="0"
                >
                  <span
                    htmlFor="photo-dropbox"
                    className="flex items-center space-x-2"
                  >
                    <svg
                      className="h-6 w-6 stroke-gray-400"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="24"
                      ></path>
                      <path
                        d="M80,128a80,80,0,1,1,144,48"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="24"
                      ></path>
                      <polyline
                        points="118.1 161.9 152 128 185.9 161.9"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="24"
                      ></polyline>
                      <line
                        x1="152"
                        y1="208"
                        x2="152"
                        y2="128"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="24"
                      ></line>
                    </svg>
                    <span className="text-xs font-medium text-gray-600">
                      Drop files to Attach, or
                      <span className="text-blue-600 underline"> browse</span>
                    </span>
                  </span>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    multiple
                    onChange={onChangeProductVariation}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 rounded-b">
              <button
                className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                {id !== undefined ? `Edit` : `Add`} Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CrudProduct;
