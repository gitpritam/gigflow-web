import { createBrowserRouter } from "react-router";
import {
  Home,
  SignInPage,
  SignUpPage,
  ShowGigsPage,
  AddGigPage,
  ShowGigDetailsPage,
  ShowBidsPage,
  DashboardPage,
  NotFoundPage,
} from "@/pages";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/gigs",
            element: <ShowGigsPage />,
          },
          {
            path: "/gigs/add",
            element: <AddGigPage />,
          },
          {
            path: "/gigs/:gigId/bids",
            element: <ShowBidsPage />,
          },
          {
            path: "/gigs/:gigId",
            element: <ShowGigDetailsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
