import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "@/app/layouts/Dashboard/Dashboard";
import FullScreen from "@/app/layouts/FullScreen";
import { Box, CircularProgress, Skeleton } from "@mui/material";

const Login = React.lazy(() => import("@/features/auth/login.view"));
const Home = React.lazy(() => import("@/features/home/home.view"));
const Clients = React.lazy(() => import("@/features/worker/worker.view"));
const Parts = React.lazy(() => import("@/features/products/parts.view"));
const Category = React.lazy(() => import("@/features/category/category.view"));
const Watchcam = React.lazy(() => import("@/features/watchcam/watchcam"));
const Settings = React.lazy(() => import("@/features/settings/settings.view"));

const camera = React.lazy(
  () => import("@/features/settings/camera/camera.view")
);
const Pathes = React.lazy(
  () => import("@/features/settings/pathes/pathes.view")
);

function Router() {
  const routes = [
    {
      layout: FullScreen,
      name: Login,
      path: "/login",
    },
    {
      layout: Dashboard,
      name: Home,
      path: "/",
    },
    {
      layout: Dashboard,
      name: Clients,
      path: "/worker",
    },
    {
      layout: Dashboard,
      name: Parts,
      path: "/products",
    },
    {
      layout: Dashboard,
      name: Category,
      path: "/category",
    },
    {
      layout: Dashboard,
      name: Watchcam,
      path: "/Watchcam",
    },
    {
      layout: Dashboard,
      name: Settings,
      path: "/settings",
    },

    // {
    //   layout: Dashboard,
    //   name: Pathes,
    //   path: "/pathes",
    // },

    // {
    //   layout: Dashboard,
    //   name: Brands,
    //   path: "/brands",
    // },
    // {
    //   layout: Dashboard,
    //   name: Cars,
    //   path: "/cars",
    // },

    // {
    //   layout: Dashboard,
    //   name: Invoces,
    //   path: "/invoces",
    // },
  ];

  return (
    <Routes>
      {routes.map((Ele, i) => (
        <Route
          key={i}
          element={
            <Ele.layout>
              <Suspense>
                <main>
                  <Ele.name />
                </main>
              </Suspense>
            </Ele.layout>
          }
          path={Ele.path}
        ></Route>
      ))}
    </Routes>
  );
}

export default Router;
