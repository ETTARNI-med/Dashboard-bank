import { createBrowserRouter } from "react-router-dom";
import Home from "@/Home";
import Layout from "./Layout";
import Container from "@/Container";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Container />,
      },
    ],
  },
]);

export default Router;
