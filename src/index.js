import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Zudowin from "./pages/ZudoWin";

// import { AuthContextProvider } from "./context/AuthContext";
import ErrorCom from "./Components/ErrorCom";





const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorCom />,
    children: [
      { path: "", element: <Zudowin /> },
      // { path: "ref", element: <Refer /> },
      // { path: "rank", element: <Rank /> },
      // { path: "cashout", element: <Cashout /> },
      // { path: "editpay", element: <EditPay /> },
      // { path: "withdrawal-history", element: <WithdrawalHestory /> },
      // { path: "dashboardlogin", element: <NotAdmin236 /> },
    ],
  },
  // {
  //   path: "/dashboardAdx",
  //   element: <Dashboard />,
  //   errorElement: <ErrorCom />,
  //   children: [
  //     { path: "settings", element: <Settings /> }, 
  //     // { path: "managetasks", element: <EditTasks /> },
  //     // { path: "externaltasks", element: <ExtrenalTasks /> },
  //     // { path: "promo", element: <AdminAdvertTasks /> },
  //     // { path: "youtube", element: <AdminYoutube /> },
  //     { path: "payouts", element: <Adminpayout /> },
  //     { path: "ranks", element: <AdminRanks /> },
  //     { path: "search", element: <Search /> },
  //     { path: "stats", element: <Statistics /> },
  //   ],
  // },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <AuthContextProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  // </AuthContextProvider>
);
