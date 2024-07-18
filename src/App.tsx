import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Tv from "./pages/Tv";
import Header from "./components/Header";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "tv", element: <Tv /> },
]);

const App = () => {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
