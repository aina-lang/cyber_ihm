import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import { lazy } from "react";
import NotFound from "./views/NotFound";
import WifiUsersList from "./views/WifiUsersList";

const Dashboard = lazy(() => import("./views/Dashboard"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/wifi",
        element: <WifiUsersList/>,
      },
    ],
  },
  {
    path: "*",
    element: <DefaultLayout />,
    children: [
        {
          path: "*",
          element: <NotFound/>,
        },
      ],
  },
]);
