import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import authRoutes from "./authRoutes";
import dashboardRoutes from "./dashboardRoutes";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <AuthLayout />,
        children: authRoutes,
      },
      {
        element: <DashboardLayout />,
        children: dashboardRoutes,
      },
    ],
  },
]);

export default router;
