import { useEffect, useRef, useState } from "react";
import Logo from "../assets/logo.jpg";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../url/token";
import moment from "moment";
import { Button } from "flowbite-react";

const InvoiceCard = () => {
  const componentPDF = useRef();
  const { id } = useParams();
  const [invoice, setInvoice] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/order/${id}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        const data = await res.data;
        setInvoice(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Invoice",
  });

  return (
    <div className="flex flex-col gap-5">
      <div
        ref={componentPDF}
        className="h-full overflow-y-auto bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8 sm:gap-2">
          <div className="flex items-center">
            <img className="h-8 w-8 mr-2" src={Logo} alt="Logo" />
            <div className="text-gray-700 font-semibold text-lg">
              LifeNeeds Apparel
            </div>
          </div>
          <div className="text-gray-700">
            <div className="font-bold text-xl mb-2">INVOICE</div>
            <div className="text-sm">
              Date:{" "}
              {invoice !== undefined
                ? moment(invoice.createdAt).format("ll")
                : ""}
            </div>
            <div className="text-sm">
              Invoice: {invoice !== undefined ? invoice._id : ""}
            </div>
          </div>
        </div>
        <div className="border-b-2 border-gray-300 pb-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
          <div className="text-gray-700 mb-2">
            {invoice !== undefined
              ? invoice.customer.firstname + " " + invoice.customer.lastname
              : ""}
          </div>
          <div className="text-gray-700 mb-2">
            {invoice !== undefined ? invoice.customer.address : ""}
          </div>
          <div className="text-gray-700">
            {invoice !== undefined ? invoice.customer.email : ""}
          </div>
        </div>
        <table className="w-full text-left mb-8">
          <thead>
            <tr>
              <th className="text-gray-700 font-bold uppercase py-2">Name</th>
              <th className="text-gray-700 font-bold uppercase py-2">Qty</th>
              <th className="text-gray-700 font-bold uppercase py-2">Price</th>
              <th className="text-gray-700 font-bold uppercase py-2">
                Item Total
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice !== undefined
              ? invoice.product.map((prod, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-4 flex flex-col">
                        <span className="text-gray-700">
                          {prod.productname.name}
                        </span>
                        <div className="flex gap-2">
                          <span className="text-sm">Size: {prod.size}</span>
                          <span className="text-sm"> Color: {prod.color}</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-700">{prod.quantity}</td>
                      <td className="py-4 text-gray-700">
                        &#8369;{prod.productname.price.toFixed(2)}
                      </td>
                      <td className="py-4 text-gray-700">
                        &#8369;{prod.subtotal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        <div className="flex justify-end mb-8">
          <div className="text-gray-700 mr-2">Subtotal:</div>
          <div className="text-gray-700">
            &#8369;
            {invoice !== undefined ? (invoice.total - 50).toFixed(2) : ""}
          </div>
        </div>
        <div className="text-right mb-8">
          <div className="text-gray-700 mr-2">Shipping:</div>
          <div className="text-gray-700">&#8369;50.00</div>
        </div>
        <div className="flex justify-end mb-8">
          <div className="text-gray-700 mr-2">Total:</div>
          <div className="text-gray-700 font-bold text-xl">
            &#8369; {invoice !== undefined ? invoice.total.toFixed(2) : ""}
          </div>
        </div>
      </div>
      <Button color="success" onClick={generatePDF}>
        DONWLOAD INVOICE
      </Button>
    </div>
  );
};

export default InvoiceCard;
