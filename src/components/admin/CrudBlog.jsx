import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getToken } from "../../url/token";

const CrudBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [fetchBlog, setFetchBlog] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setFetchBlog(res.data);
      setSelectedFile(res.data.image);
    };
    getData();
  }, []);

  const onChangeHandler = (e) => {
    const { name, value, files } = e.target;

    if (name !== "imageblog") {
      setBlog((prev) => ({ ...prev, [name]: value }));
    } else if (files) {
      setSelectedFile(files[0]);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const title = blog.title !== undefined ? blog.title : fetchBlog.title;
    const description =
      blog.description !== undefined ? blog.description : fetchBlog.description;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("imageblog", selectedFile);

    try {
      if (id === undefined) {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/blog`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        if (res.status === 201) {
          document.getElementById("title").value = "";
          document.getElementById("description").value = "";
          document.getElementById("imageblog").value = null;
        }
      } else {
        const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/blog/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        if (res.status === 200) {
          navigate("../blogs")
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
            {id !== undefined ? `Edit` : `Add`} blog
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
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder={
                    id !== undefined ? `${fetchBlog.title}` : "blog title"
                  }
                  onChange={onChangeHandler}
                  required=""
                />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="product-details"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="6"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                  placeholder={
                    id !== undefined
                      ? `${fetchBlog.description}`
                      : "blog description"
                  }
                  onChange={onChangeHandler}
                ></textarea>
              </div>

              <div className="col-span-6 sm:col-span-3 mb-5">
                <label
                  htmlFor="product-name"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Upload Image
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
                    id="imageblog"
                    name="imageblog"
                    type="file"
                    multiple
                    onChange={onChangeHandler}
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
                {id !== undefined ? `Edit` : `Post`} Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CrudBlog;
