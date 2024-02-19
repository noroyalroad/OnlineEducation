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
import Testcp from "./components/Testcp";
import Detail from "./pages/detail/Detail";
import Payment from "./pages/pay/Payment";
import Kakao from "./pages/auth/Kakao";
import Google from "./pages/auth/Google";
import Emailcheck from "./pages/auth/Emailcheck";

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
        path: "/payment",
        element: <Payment />,
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
        path: "/detail/:id",
        element: <Detail />,
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
        path: "/cate/:xp",
        element: <Testcp />,
      },
      {
        path: "/payments",
        element: <PaymentPage />,
      },
      {
        path: "/kakao",
        element: <Kakao />,
      },
      {
        path: "/google",
        element: <Google />,
      },
      {
        path: "/emailcheck",
        element: <Emailcheck />,
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
