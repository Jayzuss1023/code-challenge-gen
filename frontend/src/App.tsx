import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/layout";
import ChallengeGenerator from "./challenge/ChallengeGenerator";
import HistoryPanel from "./history/HistoryPanel";
import { AuthenticationPage } from "./auth/AuthenticationPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/sign-in/*",
      element: <AuthenticationPage />,
    },
    {
      path: "/sign-up",
      element: <AuthenticationPage />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <ChallengeGenerator />,
        },
        {
          path: "/history",
          element: <HistoryPanel />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
