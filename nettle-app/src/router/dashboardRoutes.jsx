import AssetPage from "../pages/AssetPage";
import AddAssetPage from "../pages/AddAssetPage"
import DashboardHome from "../pages/DashboardHome";
import ReportsPage from "../pages/ReportsPage";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";
import AiAssistant from "../pages/AIAssistant";
import ReportPage from "../pages/ReportPage";

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
    path: "/reports/:id",
    element: <ReportPage />,
  },

  {
    path: "/ai-assistant",
    element: <AiAssistant />,
  },

  {
    path: "/settings",
    element: <SettingsPage/>,
  },

  {
    path: "/profile",
    element: <ProfilePage />,
  },

];

export default dashboardRoutes;
