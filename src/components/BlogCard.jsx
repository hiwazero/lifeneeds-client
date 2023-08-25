import axios from "axios";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import moment from "moment";

const BlogCard = () => {
  const [blogs, setBlogs] = useState([]);
  const base64Image = (data) => {
    return Buffer.from(data).toString("base64");
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog`);
      setBlogs(res.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="min-h-screen my-10">
        {blogs.length > 0 &&
          blogs.map((blog) => {
            return (
              <div className="my-3 mx-auto w-96 lg:w-[50%] overflow-hidden rounded-lg bg-white shadow-lg border-gray-900 px-2 md:px-0">
                <img
                  src={`data:image/png;base64,${base64Image(blog.image)}`}
                  className="my-3 aspect-video w-full object-contain"
                  alt=""
                />
                <div className="p-4">
                  <p className="mb-1 text-sm text-primary-500">
                    Andrea Felsted •{" "}
                    <time>{moment(blog.createdAt).format(`ll`)}</time>
                  </p>
                  <h3 className="text-xl font-medium text-gray-900">
                    {blog.title}
                  </h3>
                  <p className="mt-1 text-gray-500">{blog.description}</p>
                  <div className="mt-4 flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                      #LifeNeedsApparel
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
                      #SupportLocal
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
                      #ElevateDontHesitate
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default BlogCard;
