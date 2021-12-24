import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import {
  dashboard as dashboardRoutes,
  page as pageRoutes,
  customer as customerDetails,
} from "./index";
import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";

import ScrollToTop from "../components/ScrollToTop";

import { init as initApm } from "@elastic/apm-rum";
import { ApmRoute } from "@elastic/apm-rum-react";

const apm = initApm({
  serviceName: "Settl BackOffice",
  serverUrl: "https://beba7fc4cdda4a088f2915416b10b02e.apm.eu-west-1.aws.cloud.es.io:443",
  logLevel: "debug",
  serviceHostName: "Settl BackOffice",
  serviceVersion: "1.0",
  serviceSecretToken: "qErPmHdvWQ6ScexmtE",
  serviceEnvironment: "Staging"
    
  // ELASTIC_APM_API_KEY : "YlFHSHczMEJfQm9Ndk0yUkQ0Ym86bTNESl8zX05TUUt5RDdXRTQ2LWFCdw==",
  // ELASTIC_APM_ENVIRONMENT : "Staging",
  // ELASTIC_APM_HOSTNAME : "Settl BackOffice",
  // ELASTIC_APM_SECRETTOKEN : "qErPmHdvWQ6ScexmtE",
  // ELASTIC_APM_SERVER_URL : "https://beba7fc4cdda4a088f2915416b10b02e.apm.eu-west-1.aws.cloud.es.io:443"
});

const childRoutes = (Layout, routes, user) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <ApmRoute
          key={index}
          path={path}
          exact
          render={(props) =>
            user ? (
              <Layout>
                <Component {...props} />
              </Layout>
            ) : (
              <Redirect to="/auth/sign-in" />
            )
          }
        />
      ))
    ) : (
      // Route item without children
      <ApmRoute
        key={index}
        path={path}
        exact
        render={(props) =>
          user ? (
            <Layout>
              <Component {...props} />
            </Layout>
          ) : (
            <Redirect to="/auth/sign-in" />
          )
        }
      />
    )
  );

const Routes = ({ user }) => {
  const [time, setTime] = useState(0);
  const redirect = () => {
    if (time > 29) window.location.pathname = "/";
    setTimeout(() => {
      if (user) {
        setTime((time) => time + 1);
      }
    }, 60000);
  };
  useEffect(() => {
    redirect();
  }, [user, time]);

  return (
    <Router>
      <ScrollToTop>
        <Switch>
          {childRoutes(DashboardLayout, dashboardRoutes, user)}
          {childRoutes(DashboardLayout, customerDetails, user)}
          {childRoutes(AuthLayout, pageRoutes, true)}
          <Route
            render={() => (
              <AuthLayout>
                <Page404 />
              </AuthLayout>
            )}
          />
        </Switch>
      </ScrollToTop>
    </Router>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.details?.token,
});

export default connect(mapStateToProps)(Routes);
