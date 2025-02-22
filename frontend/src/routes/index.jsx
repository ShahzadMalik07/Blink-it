import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Home from "../pages/Home"
import SearchPage from "../pages/SearchPage"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import ForgotPassword from "../pages/ForgotPassword"
import VerifyOtp from "../pages/VerifyOtp"
import ResetPassword from "../pages/ResetPassword"
import UserMenuMobile from "../components/UserMenuMobile"
import Dashboard from "../layouts/Dashboard"
import Profile from "../pages/Profile"
import MyOrders from "../pages/MyOrders"
import Address from "../pages/Address"
import Category from "../pages/Category"
import SubCategory from "../pages/SubCategory"
import UploadProducts from "../pages/UploadProducts"
import Products from "../pages/Products"
import AdminAccess from "../layouts/AdminAccess"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "search",
                element: <SearchPage />

            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "/verify-otp",
                element: <VerifyOtp />
            },
            {
                path: "/reset-password",
                element: <ResetPassword />
            },
            {
                path: "user",
                element: <UserMenuMobile />

            },
            {
                path: "/dashboard",
                element: <Dashboard />,
                children: [
                    {
                        path: "profile",
                        element: <Profile />
                    },
                    {
                        path: "myorders",
                        element: <MyOrders />
                    },
                    {
                        path: "address",
                        element: <Address />
                    },
                    {
                        path: "category",
                        element: <AdminAccess><Category /></AdminAccess>
                    },
                    {
                        path: "subcategory",
                        element: <AdminAccess><SubCategory /></AdminAccess>
                    },
                    {
                        path: "upload-products",
                        element: <AdminAccess><UploadProducts /></AdminAccess>
                    },
                    {
                        path: "products",
                        element: <AdminAccess><Products /></AdminAccess>
                    },
                ]
            }
        ]
    }
])

export default router