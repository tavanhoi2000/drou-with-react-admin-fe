import React, {Component} from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {LayoutSplashScreen} from "../../../layout";
import * as auth from "../../../../redux/auth";

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    const { hasAuthToken } = this.props;
    return hasAuthToken ? <LayoutSplashScreen /> : <Navigate to="/auth/login" />;
  }
}

export default connect(
  ({ auth }) => ({ hasAuthToken: Boolean(auth.authToken) }),
  auth.actions
)(Logout);
