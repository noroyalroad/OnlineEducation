import "./style.scss";
import { createBrowserRouter, RouterProvider, Route, Outlet } from "react-router-dom";

import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Search from "./pages/Search";
import Courses from "./pages/Courses";
import OnlineStudy from "./pages/OnlineStudy";
import Profile from "./pages/Profile";
import MyOnline from "./pages/MyOnline";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Resgister1 from "./pages/auth/Resgister1";
import DetailLeture from "./components/DetailLeture";
import PaymentPage from "./pages/pay/Pay";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/detailleture",
        element: <DetailLeture />,
      },
      {
        path: "/myonline",
        element: <MyOnline />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
      },
    ],
  },
  {
    path: "/register",
    element: <Resgister1 />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/onlinestudy",
    element: <OnlineStudy />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
