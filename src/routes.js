import { Route, Switch } from "react-router-dom";

import PrivateLayout from "./layouts/Private";
import PublicLayout from "./layouts/Public";
import AuthLayout from "./layouts/Auth";

import Home from "./containers/Home";
import Admin from "./containers/Admin";
import SignIn from "./containers/SignIn";
import NotFound from "./containers/404";

const routes = {
  public: [
    {
      path: `${process.env.REACT_APP_ROUTE_HOME}`,
      component: Home,
    },
  ],
  private: [
    {
      path: `${process.env.REACT_APP_ROUTE_ADMIN}`,
      component: Admin,
    },
  ],
  auth: [
    {
      path: `${process.env.REACT_APP_ROUTE_SIGNIN}`,
      component: SignIn,
    },
  ],
};

const renderPrivateComponentsWithRoutes = (routes) => {
  return routes.map((route, index) => {
    const { path, component: Component } = route;

    return (
      <Route
        key={index}
        path={path}
        exact
        render={(route) => (
          <PrivateLayout route={route}>
            <Component route={route} />
          </PrivateLayout>
        )}
      />
    );
  });
};

const renderPublicComponentsWithRoutes = (routes) => {
  return routes.map((route, index) => {
    const { path, component: Component } = route;

    return (
      <Route
        key={index}
        path={path}
        exact
        render={(route) => (
          <PublicLayout route={route}>
            <Component route={route} />
          </PublicLayout>
        )}
      />
    );
  });
};

const renderAuthComponentsWithRoutes = (routes) => {
  return routes.map((route, index) => {
    const { path, component: Component } = route;

    return (
      <Route
        key={index}
        path={path}
        exact
        render={(route) => (
          <AuthLayout route={route}>
            <Component route={route} />
          </AuthLayout>
        )}
      />
    );
  });
};

export default function Routes() {
  return (
    <Switch>
      {renderAuthComponentsWithRoutes(routes.auth)}
      {renderPrivateComponentsWithRoutes(routes.private)}
      {renderPublicComponentsWithRoutes(routes.public)}
      <Route render={(route) => <NotFound route={route} />} />
    </Switch>
  );
}
