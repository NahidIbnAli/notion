import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CompletedTask from "./components/CompletedTask/CompletedTask";
import MyTask from "./components/MyTask/MyTask";
import NotFound from "./components/NotFound/NotFound";
import Main from "./layout/Main";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/mytask",
          element: <MyTask></MyTask>,
        },
        {
          path: "/completedtask",
          element: <CompletedTask></CompletedTask>,
        },
        {
          path: "/signup",
          element: <SignUp></SignUp>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound></NotFound>,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
