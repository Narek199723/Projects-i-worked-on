import { useState, useEffect } from "react";
// import { Outlet } from 'react-router-dom';
import { Redirect } from "react-router-dom";
// material
import { styled, useTheme } from "@material-ui/core/styles";
// hooks
import useCollapseDrawer from "../../hooks/useCollapseDrawer";
import useAuth from "../../hooks/useAuth";
//
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

import { CollapseDrawerProvider } from "../../contexts/CollapseDrawerContext";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  useEffect(() => {
    document.title = "Dashboard - bluecap™";
  }, []);

  const { user, logout, fireStoreuserObj } = useAuth();
  const theme = useTheme();
  const { collapseClick } = useCollapseDrawer();
  const [open, setOpen] = useState(false);

  if (!fireStoreuserObj.organizationId) {
    return <Redirect to="/welcome" />;
  }

  return (
    <CollapseDrawerProvider>
      <RootStyle>
        <DashboardNavbar
          onOpenSidebar={() => setOpen(true)}
          user={user}
          logout={logout}
        />

        <DashboardSidebar
          isOpenSidebar={open}
          user={user}
          logout={logout}
          onCloseSidebar={() => setOpen(false)}
        />
        <MainStyle
          sx={{
            transition: theme.transitions.create("margin", {
              duration: theme.transitions.duration.complex,
            }),
            ...(collapseClick && {
              ml: "102px",
            }),
          }}
        >
          {children}
        </MainStyle>
      </RootStyle>
    </CollapseDrawerProvider>
  );
}
