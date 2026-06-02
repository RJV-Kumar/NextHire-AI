import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import HomePage from './features/prepPlan/pages/HomePage'
import PrepPlan from "./features/prepPlan/pages/PrepPlan";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }, 
    {
        path: "/",
        element: <Protected><HomePage /></Protected>
    },
    {
        path: "/report/:reportId",
        element: <Protected><PrepPlan /></Protected>
    }
])