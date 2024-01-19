import "./style.scss";
import { createBrowserRouter, RouterProvider, Route, Outlet } from "react-router-dom";

import Login from "./pages/Login";
import Write from "./pages/Write";

import Single from "./pages/Single";
import Search from "./pages/Search";
import Courses from "./pages/Courses";
import OnlineStudy from "./pages/OnlineStudy";
import Profile from "./pages/Profile";
import MyOnline from "./pages/MyOnline";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";

import Navbar from "./components/nav/Navbar";
import Footer from "./components/Footer";
import Resgister1 from "./pages/auth/Resgister1";
import DetailLeture from "./components/DetailLeture";
import PaymentPage from "./pages/pay/Pay";

import MoveCategory from "./components/category/MoveCategory";
import Lectureplay from "./pages/playing/Lectureplay";
import Mainplaying from "./pages/playing/Mainplaying";
import MyPage from "./pages/mypage/Mypage";
import Searchre from "./pages/search/Searchre";
import Home from "./pages/main/Home";

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
        path: "/mypage/:vvv",
        element: <MyPage />,
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
        element: <Searchre />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/search/?search=",
        element: <Searchre />,
      },
      {
        path: "/category/:category",
        element: <MoveCategory />,
      },
      {
        path: "/playlecture",
        element: <Mainplaying />,
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
