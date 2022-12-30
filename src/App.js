import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CompletedTask from "./components/CompletedTask/CompletedTask";
import MyTask from "./components/MyTask/MyTask";
import NotFound from "./components/NotFound/NotFound";
import Main from "./layout/Main";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

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
          element: (
            <PrivateRoute>
              <MyTask></MyTask>
            </PrivateRoute>
          ),
        },
        {
          path: "/completedtask",
          element: (
            <PrivateRoute>
              <CompletedTask></CompletedTask>
            </PrivateRoute>
          ),
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
      <Toaster></Toaster>
    </div>
  );
}

export default App;
