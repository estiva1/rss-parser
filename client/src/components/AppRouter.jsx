import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../context";
import Login from "../pages/Login";
import Posts from "../pages/Posts";
import { publicRoutes, privateRoutes } from "../router";
import Loader from "./UI/loader/Loader";

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route key={route.element} element={route.element} path={route.path} exact={route.exact} />
      ))}
      <Route exact path="*" element={<Posts />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route  key={route.element} element={route.element} path={route.path} exact={route.exact} />
      ))}
      <Route exact path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
