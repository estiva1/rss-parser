import Posts from "../pages/Posts";
import Login from "../pages/Login";

export const privateRoutes = [
  { path: "/posts", element: <Posts />, exact: true },
];

export const publicRoutes = [
  { path: "/login", element: <Login />, exact: true },
];
