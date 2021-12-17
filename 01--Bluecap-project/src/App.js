import React from "react";
import ThemeConfig from "./theme";
import { Provider } from "react-redux";
import Loader from "../src/components/common/Loader/Loader";
import Routes from "./routes/rotues";
import store from "./store/store";
import useAuth from "./hooks/useAuth";
import ThemePrimaryColor from "./components/ThemePrimaryColor";
import SnackBarWrapper from "./components/generic/SnackBarWrapper";
import WrapperNotificationCriticals from "./components/generic/WrapperNotificationCriticals";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const { isInitialized } = useAuth();
  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        {/* <Provider store={store}>{isInitialized ? <Routes /> : <Loader />}</Provider> */}
        {isInitialized ? (
          <Router>
            <Routes />
          </Router>
        ) : (
          <Loader />
        )}
        <SnackBarWrapper />
        <WrapperNotificationCriticals />
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}

export default App;
