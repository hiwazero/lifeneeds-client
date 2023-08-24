import { useEffect, useState } from "react";
import ListPlaceholder from "../skeleton/ListSkeleton";
import { getToken } from "../../url/token";
import { Link } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import axios from "axios";
import { Buffer } from "buffer";

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const base64Image = (data) => {
    return Buffer.from(data).toString("base64");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setIsLoading(false);
      setBlogs(res.data);
    };
    fetchData();
  }, [isClicked]);

  const onDeleteHandler = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setIsClicked(!isClicked);
    } catch (error) {}
  };

  return (
    <>
      <div className="m-5 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <Link to={"add"}>
                <Button gradientMonochrome="info" size="lg" className="m-5">
                  Add Blog Post
                </Button>
              </Link>
              {isLoading ? (
                <ListPlaceholder />
              ) : blogs.length === 0 ? (
                <Card>
                  <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <p>No orders yet!</p>
                  </h5>
                </Card>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Blog ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                      <th scope="col" className="relative px-6 py-3  text-xs">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {blogs.map((blog, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {blog.image && (
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={`data:image/png;base64,${base64Image(
                                      blog.image
                                    )}`}
                                    alt="test"
                                  />
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {blog._id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {blog.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {blog.description}
                          </td>
                          <td className="cursor-pointer px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={`edit/${blog._id}`}
                              className="mx-5 text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </Link>
                            <span
                              className="mx-5 text-indigo-600 hover:text-indigo-900"
                              onClick={() => onDeleteHandler(blog._id)}
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

export default AdminBlog;
