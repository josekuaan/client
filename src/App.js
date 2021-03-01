import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import { DataProvider } from "./pageContext";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheAdminLayout = React.lazy(() => import("./containers/TheAdminLayout"));
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const ResetPassword = React.lazy(() =>
  import("./views/pages/resetpassword/ResetPassword")
);
const ForggottenPage = React.lazy(() =>
  import("./views/pages/forggotpassword/ForggotPassword")
);
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <DataProvider>
            <Switch>
              {/* <Route path="/" name="Home" /> */}
              <Route
                exact
                path="/login"
                name="Login Page"
                render={(props) => <Login {...props} />}
              />
              <Route
                exact
                path="/register"
                name="Register Page"
                render={(props) => <Register {...props} />}
              />
              <Route
                exact
                path="/forggotten-password"
                name="ForggottenPage Page"
                render={(props) => <ForggottenPage {...props} />}
              />
              <Route
                exact
                path="/reset-password/:id"
                name="Reset Password Page"
                render={(props) => <ResetPassword {...props} />}
              />
              <Route
                exact
                path="/404"
                name="Page 404"
                render={(props) => <Page404 {...props} />}
              />
              <Route
                exact
                path="/500"
                name="Page 500"
                render={(props) => <Page500 {...props} />}
              />
              <Route
                path="/admin/dashboard"
                name="Admin"
                render={(props) => <TheAdminLayout {...props} />}
              />
              <Route
                path="/user/dashboard"
                name="Home"
                render={(props) => <TheLayout {...props} />}
              />
            </Switch>
          </DataProvider>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
