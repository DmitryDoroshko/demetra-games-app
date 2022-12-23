import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import GameSpecificPage from "./pages/GameSpecificPage";
import MainPage from "./pages/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "game/:slugId",
    element: <GameSpecificPage/>,
    errorElement: <ErrorPage/>
  }
]);

const App = () => {
  return <RouterProvider router={router}/>;
};

export default App;