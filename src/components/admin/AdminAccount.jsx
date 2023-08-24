import { useEffect, useState } from "react";
import ListSkeleton from "../skeleton/ListSkeleton";
import axios from "axios";
import { getToken } from "../../url/token";

const AdminAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedRole, setSelectedRole] = useState(undefined);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setAccounts(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccounts();
  }, [isClicked]);

  const onChangeRole = (e) => {
    const { name, value } = e.target;
    setSelectedRole({ [name]: value });
  };

  const onDeleteHandler = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (res.status === 200) {
        setIsClicked(!isClicked);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSaveHandler = async (id) => {
    if (selectedRole === undefined) {
      return;
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${id}`,
        selectedRole,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (res.status === 200) {
        setIsClicked(!isClicked);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="m-5 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              {accounts.length === 0 ? (
                <ListSkeleton />
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Age
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Role
                      </th>
                      <th scope="col" className="relative px-6 py-3  text-xs">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {accounts.map((account, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={`/src/assets/avatars/${account.avatar}`}
                                  alt="test"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {account.firstname} {account.lastname}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {account.age}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {account.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {account.address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <select
                              id="large"
                              className="block w-full px-4 py-3 text-sm text-gray-500 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              name="role"
                              onChange={onChangeRole}
                            >
                              <option defaultValue={account.role}>
                                {account.role}
                              </option>
                              <option
                                value={
                                  account.role === `user` ? `admin` : `user`
                                }
                              >
                                {account.role === `user` ? `admin` : `user`}
                              </option>
                            </select>
                          </td>

                          <td className="cursor-pointer px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <span
                              className="mx-5 text-indigo-600 hover:text-indigo-900"
                              onClick={() => onSaveHandler(account._id)}
                            >
                              Save
                            </span>
                            <span
                              className="mx-5 text-indigo-600 hover:text-indigo-900"
                              onClick={() => onDeleteHandler(account._id)}
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

export default AdminAccount;
