import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Tv from "./pages/Tv";
import Header from "./components/Header";
import Movies from "./pages/Movies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/tv",
        element: <Tv />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
