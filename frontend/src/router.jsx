import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import { lazy } from "react";
import NotFound from "./views/NotFound";
import GuestPost from "./views/GuestPost";
import ActivePost from "./views/ActivePost";


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
        path: "/active",
        element: <ActivePost/>,
      },
      {
        path: "/local",
        element: <GuestPost/>,
      },
      {
        path: "/guest",
        element: <GuestPost/>,
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
