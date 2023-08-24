import axios from "axios";
import { useEffect, useState } from "react";
import { getToken } from "../url/token";
import TransactionCard from "./TransactionCard";
import { Pagination } from "flowbite-react";
import OrderSkeleton from "./skeleton/OrderSkeleton";
import { Card } from "flowbite-react";

const ProfilePurchase = () => {
  const [fetchTransactions, setFetchTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/order?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        setFetchTransactions(res.data.order);
        setTotalPages(res.data.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {loading ? (
        <OrderSkeleton />
      ) : fetchTransactions.length !== 0 ? (
        <>
          <div className="h-[95%] overflow-y-auto">
            {fetchTransactions.map((order, index) => {
              return (
                <>
                  <TransactionCard key={index} order={order} />
                </>
              );
            })}
          </div>

          <Pagination
            className="flex justify-center items-center"
            currentPage={currentPage}
            onPageChange={onPageChange}
            showIcons
            totalPages={totalPages}
          />
        </>
      ) : (
        <Card>
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            No Transactions yet
          </h5>
        </Card>
      )}
    </>
  );
};

export default ProfilePurchase;
