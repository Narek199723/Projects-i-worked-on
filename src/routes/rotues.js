import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useLocation,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
//import Home from '../components/home/home';
import Welcome from "../components/landing/welcome";
import Login from "../components/login/login";
// import Signin from '../components/Signin';
import DashboardLayout from "../components/dashboard";
import PastMeetingDetails from "../components/past-meetings/pastMeetingDetails";
import UpcomingMeetingDetails from "../components/upcoming-meetings/upcomingMeetingDetails";

import Dashboard from "../components/_dashboard/Dashboard";
import Main from "../components/Main";
import Meetings from "../components/meetings";
import Settings from "../components/settings/settings";
import Help from "../components/help/help";
import PendingApproval from "../components/PendingApproval";
import firebaseAnalytics from "./../firebase/firebaseAnalytics";
import Plans from "../components/plans/plans";
import Payment from "../components/payment/payment";
import Contacts from "../components/Contacts";
import EditContact from "../components/Contacts/EditContact";

function withLayout(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <Main>
          <WrappedComponent></WrappedComponent>
        </Main>
      );
    }
  };
}

const Routes = () => {
  let location = useLocation();
  React.useEffect(() => {
    firebaseAnalytics.logEvent("spa_page_view", {
      url: location.pathname,
      title: document.title,
    });
  }, [location]);

  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <PrivateRoute
        exact
        path="/pending-approval"
        component={withLayout(PendingApproval)}
      />
      <PrivateRoute exact path={"/"} component={Welcome} />
      <PrivateRoute exact path={"/welcome"} component={Welcome} />
      <PrivateRoute
        exact
        path="/meeting/:id"
        component={withLayout(PastMeetingDetails)}
      />
      {/* <PrivateRoute exact path='/past-meeting-details' component={withLayout(PastMeetingDetails)} /> */}

      <PrivateRoute exact path="/dashboard" component={withLayout(Dashboard)} />
      <PrivateRoute
        exact
        path="/meetings/:type"
        component={withLayout(Meetings)}
      />
      <PrivateRoute exact path="/contacts" component={withLayout(Contacts)} />
      <PrivateRoute
        exact
        path="/contact/:id"
        component={withLayout(EditContact)}
      />
      <PrivateRoute exact path="/settings" component={withLayout(Settings)} />
      <PrivateRoute exact path="/help" component={withLayout(Help)} />
      {/* <PrivateRoute exact path='/dashboard' component={DashboardLayout} /> */}
      {/* <PrivateRoute exact path='/past-meeting-details' component={PastMeetingDetails} /> */}

      <PrivateRoute
        exact
        path="/upcoming-meeting-details"
        component={UpcomingMeetingDetails}
      />
      <PrivateRoute exact path="/plans" component={Plans} />
      <PrivateRoute exact path="/payment" component={Payment} />
    </Switch>
  );
};
export default Routes;
