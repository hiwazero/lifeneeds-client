import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./components/root_layout/Root";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Login from "./components/Login";
import Register from "./components/Register";
import BlogCard from "./components/BlogCard";
import ProductDetail from "./components/ProductDetail";
import AboutUs from "./components/AboutUs";
import Profile from "./components/Profile";
import ProfileDetail from "./components/ProfileDetail";
import ProfilePurchase from "./components/ProfilePurchase";
import ProfileEdit from "./components/ProfileEdit";
import InvoiceCard from "./components/InvoiceCard";
import AdminSideNav from "./components/admin/AdminSideNav";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProduct from "./components/admin/AdminProduct";
import CrudProduct from "./components/admin/CrudProduct";
import AdminAccount from "./components/admin/AdminAccount";
import AdminOrder from "./components/admin/AdminOrder";
import AdminBlog from "./components/admin/AdminBlog";
import CrudBlog from "./components/admin/CrudBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/cart", element: <Cart /> },
      { path: "/blog", element: <BlogCard /> },
      { path: "/shop", element: <Shop /> },
      { path: "/product/:id", element: <ProductDetail /> },
      {
        path: "/profile",
        element: <Profile />,
        children: [
          { path: "", element: <ProfileDetail /> },
          { path: "edit", element: <ProfileEdit /> },
          { path: "transaction", element: <ProfilePurchase /> },
          { path: "transaction/:id", element: <InvoiceCard /> },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/shop", element: <Shop /> },
  { path: "/cart", element: <Cart /> },
  { path: "/blog", element: <BlogCard /> },
  { path: "/shop", element: <Shop /> },
  { path: "product/:id", element: <ProductDetail /> },
  { path: "/profile", element: <Profile /> },
  { path: "/admin", element: <AdminSideNav /> },
  {
    path: "/admin",
    element: <AdminSideNav />,
    children: [
      { path: "", element: <AdminDashboard /> },
      {
        path: "products",
        element: <AdminProduct />,
      },
      { path: "products/add", element: <CrudProduct /> },
      { path: "products/edit/:id", element: <CrudProduct /> },
      { path: "orders", element: <AdminOrder /> },
      { path: "products/add", element: <CrudProduct /> },
      { path: "products/edit/:id", element: <CrudProduct /> },
      { path: "orders", element: <AdminOrder /> },
      { path: "blogs", element: <AdminBlog /> },
      { path: "blogs/add", element: <CrudBlog /> },
      { path: "blogs/edit/:id", element: <CrudBlog /> },
      { path: "users", element: <AdminAccount /> },
    ],
  },
]);

function App() {
  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
