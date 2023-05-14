import { Routes, Route, Navigate } from "react-router-dom";

import Path, { ProtectedRoutes, PublicRoutes } from "../constants/local-path";

import { HomeRoute, ProtectedRoute } from "./app-layout/app-layout";
import NotFound from "./not-found";

const AppRoutes = () => (
  <Routes>
    <Route element={<HomeRoute />}>
      {PublicRoutes.map((item) => (
        <Route key={item.path} element={item.element} path={item.path} />
      ))}
    </Route>

    <Route element={<ProtectedRoute />}>
      {ProtectedRoutes.map((itm) => (
        <Route key={itm.path} element={itm.element} path={itm.path} />
      ))}
    </Route>

    <Route element={<Navigate to={Path.Login} />} path="/" />
    <Route element={<NotFound />} path={Path.NotFound} />
    <Route element={<Navigate to={Path.NotFound} />} path="*" />
  </Routes>
);

export default AppRoutes;
