import Home from "./pages/Home";
import Prompt from "./pages/Prompt";
import Tools from "./pages/Tools";
import Knowledge from "./pages/Knowledge";
import Setting from "./pages/Setting";

export default [
  {
    path: "/",
    element: <Prompt />,
  },
  {
    path: "/prompt",
    element: <Prompt />,
  },
  {
    path: "/tools",
    element: <Tools />,
  },
  {
    path: "/knowledge",
    element: <Knowledge />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
];
