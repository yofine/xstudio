import routes from "./routes";
import Layout from "./layout/BaseLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 引入 react router 6

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: routes,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
