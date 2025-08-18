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
import Update from "../pages/Home/Update/Update";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import ProductReviewQueue from "../pages/Dashboard/ProductReviewQueue/ProductReviewQueue";
import ReportedContents from "../pages/Dashboard/ReportedContents/ReportedContents";
import Products from "../pages/Products/Products";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AdminStatistics from "../pages/Dashboard/AdminStatistics/AdminStatistics";
import ManageCoupons from "../pages/Dashboard/ManageCoupons/ManageCoupons";
import UpdateCoupon from "../pages/Dashboard/UpdateCoupon/UpdateCoupon";
import AdminRoute from "../routes/AdminRoute";
import ModeratorRoute from "../routes/ModeratorRoute";
import UserRoute from "../routes/UserRoute";
import AboutUs from "../pages/AboutUs/AboutUs";
import TermsPrivacy from "../pages/TermsPrivacy/TermsPrivacy";
import Contact from "../pages/Contact/Contact";
import ProfilePage from "../pages/Dashboard/ProfilePage/ProfilePage";
import UserStatistics from "../pages/Dashboard/UserStatistics/UserStatistics";
import ModeratorStatistics from "../pages/Dashboard/ModeratorStatistics/ModeratorStatistics";
import ModeratorProfile from "../pages/Dashboard/ModeratorProfile/ModeratorProfile";



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
        },
        {
          path: "/product/:id",
          element: <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        },
        {
          path: "/products",
          Component: Products
        },
        {
          path: "/about",
          Component: AboutUs
        },
        {
          path: "/terms",
          Component: TermsPrivacy
        },
        {
          path: "/contact",
          Component: Contact
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
        path: "my-profile",
        element: <UserRoute>
          <MyProfile></MyProfile>
        </UserRoute>
  
      },
      {
        path: "user-statistics",
        element: <UserRoute>
          <UserStatistics></UserStatistics>
        </UserRoute>
  
      },
      {
        path: "payment/:email",
        element: <UserRoute>
           <Payment></Payment>
        </UserRoute>
      },
      {
        path: "add-product",
        element: <UserRoute>
          <AddProduct></AddProduct>
        </UserRoute>
      },
      {
        path: "my-products",
        element: <UserRoute>
          <MyProducts></MyProducts>
        </UserRoute>
      },
      {
        path: "update/:id",
        element: <UserRoute>
          <Update></Update>
        </UserRoute>
      },
      {
        path: "moderator-profile",
        element: <ModeratorRoute>
           <ModeratorProfile></ModeratorProfile>
        </ModeratorRoute>
      },
      {
        path: "moderator-statistics",
        element: <ModeratorRoute>
           <ModeratorStatistics></ModeratorStatistics>
        </ModeratorRoute>
      },
      {
        path: "product-review-queue",
        element: <ModeratorRoute>
           <ProductReviewQueue></ProductReviewQueue>
        </ModeratorRoute>
      },
      {
        path: "reported-contents",
        element: <ModeratorRoute>
          <ReportedContents></ReportedContents>
        </ModeratorRoute>
      },
      {
        path: "profile-page",
        element: <AdminRoute>
          <ProfilePage></ProfilePage>
        </AdminRoute>
      },
      {
        path: "manage-users",
        element: <AdminRoute>
          <ManageUsers></ManageUsers>
        </AdminRoute>
      },
      {
        path: "admin-statistics",
        element: <AdminRoute>
          <AdminStatistics></AdminStatistics>
        </AdminRoute>
      },
      {
        path: "manage-coupons",
        element: <AdminRoute>
          <ManageCoupons></ManageCoupons>
        </AdminRoute>
      },
      {
        path: "update-coupon/:id",
        element: <AdminRoute>
          <UpdateCoupon></UpdateCoupon>
        </AdminRoute>
      }
    ]
  }
]);