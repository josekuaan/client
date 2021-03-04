import React, { Component } from "react";
import { Route, Switch,Redirect } from "react-router-dom";
import IdleTimer from "react-idle-timer";
import Cookies from "js-cookie";

import TheAdminLayout from "./containers/TheAdminLayout";
import TheLayout from "./containers/TheLayout";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeout: 10000 * 15 * 1,
      showModal: false,   
      userLoggedIn: false,
      isTimedOut: false,
    };

    this.idleTimer = null;
    this.onAction = this._onAction.bind(this);
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);
    // const history = useHistory();
    const isLoggedIn =window.localStorage.getItem('loggedIn');
  }

  _onAction(e) {
    console.log("user did something", e);
    this.setState({ isTimedOut: false });
  }

  _onActive(e) {
    console.log("user is active", e);
    this.setState({ isTimedOut: false });
  }

  _onIdle(e) {
    console.log("user is idle", e);
    const isTimedOut = this.state.isTimedOut;
    if (isTimedOut) {
        window.localStorage.removeItem("userId");
        window.localStorage.removeItem("loggedIn");
        Cookies.remove("token");
        this.props.history.push("/login");
    } else {
      this.idleTimer.reset();
      this.setState({ isTimedOut: true });
      
    }
  }
  render() {
    // if (this.isLoggedIn) {   
    //   return <Redirect to="/login" />;
    // }
    return (
      <>
        <IdleTimer
          ref={(ref) => {
            this.idleTimer = ref;
          }}
          element={document}
          onActive={this.onActive}
          onIdle={this.onIdle}
          onAction={this.onAction}
          debounce={250}
          timeout={this.state.timeout}
        />
        <div>
          <Switch>
            <Route
              path="/user/dashboard"
              name="Dashboard"
              render={(props) => <TheLayout {...props} />}
            />
            <Route
              path="/admin/dashboard"
              name="Admin"
              render={(props) => <TheAdminLayout {...props} />}
            />
          </Switch>
        </div>
      </>
    );
  }
}


export default Layout