import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Error from "../pages/Home/Error/Error";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoutes";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import Payment from "../pages/Dashboard/Payment/Payment";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";
import MyProducts from "../pages/Dashboard/MyProducts/MyProducts";


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
  {
    path: "/dashboard",
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {
        path: "myProfile",
        element: <PrivateRoute>
         <MyProfile></MyProfile>
        </PrivateRoute>
      },
      {
        path: "payment/:email",
        element: <PrivateRoute>
          <Payment></Payment>
        </PrivateRoute>
      },
      {
        path: "add-product",
        element: <PrivateRoute>
          <AddProduct></AddProduct>
        </PrivateRoute>
      },
      {
        path: "my-products",
        element: <PrivateRoute>
          <MyProducts></MyProducts>
        </PrivateRoute>
      }
    ]
  }
  
]);