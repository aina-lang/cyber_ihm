import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { SidebarProvider } from "./components/Sidebar/contexts/SidebarContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Suspense>
      <SidebarProvider>
        <RouterProvider router={router} />
      </SidebarProvider>
    </Suspense>
  </React.StrictMode>
);
reportWebVitals();
