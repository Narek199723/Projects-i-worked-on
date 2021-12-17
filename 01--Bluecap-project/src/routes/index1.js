import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";

// guards
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";

// layouts
//import MainLayout from '../layouts/main';
import DashboardLayout from "../components/dashboard";
//import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from "../components/common/Loader/LoadingScreen";
import Login from "../components/login/login";
import Welcome from "../components/landing/welcome";
import PageOne from "../components/pages/PageOne";
// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes("/dashboard");

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: "fixed",
            }),
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  let routes = useRoutes([
    {
      path: "/",
      element: (
        <AuthGuard>
          <Welcome />
        </AuthGuard>
      ),
    },
    {
      path: "/welcome",
      element: (
        <AuthGuard>
          <Welcome />
        </AuthGuard>
      ),
    },
    {
      path: "/login",
      element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <AuthGuard>
          <PageOne />
        </AuthGuard>
      ),
    },
  ]);
  return routes;
}

// IMPORT COMPONENTS

//const Welcome = Loadable(lazy(() => import('../components/landing/welcome')));

// Dashboard
// const PageOne = Loadable(lazy(() => import('../components/pages/PageOne')));
