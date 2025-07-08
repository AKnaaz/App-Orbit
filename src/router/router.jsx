import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Error from "../pages/Home/Error/Error";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error></Error>,
    children: [
        {
            index: true,
            Component: Home,
        },
        {
          path: "/login",
          Component: Login
        },
        {
          path: "/register",
          Component: Register
        }
    ]
  },
  
]);