import AssetPage from "../pages/AssetPage";
import AddAssetPage from "../pages/AddAssetPage"
import DashboardHome from "../pages/DashboardHome";
import ReportsPage from "../pages/ReportsPage";
import ProfilePage from "../pages/ProfilePage";

const dashboardRoutes = [
  {
    path: "/dashboard",
    element: <DashboardHome />,
  },

  {
    path: "/assets",
    element: <AssetPage />,
  },

  {
    path: "/add-asset",
    element: <AddAssetPage />,
  },

  {
    path: "/reports",
    element: <ReportsPage />,
  },

  {
    path: "/settings",
    element: <ReportsPage />,
  },

  {
    path: "/profile",
    element: <ProfilePage />,
  },

];

export default dashboardRoutes;
