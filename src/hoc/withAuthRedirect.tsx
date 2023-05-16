import React, { FC } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../redux/reduxStore"

export function withAuthRedirect(Component: React.ComponentType<MapPropsType>) {
  class RedirectComponent extends React.Component<MapPropsType> {
      render() {
          if (!this.props.isAuth) return <Navigate to={"/login"} />;
          return <Component {...this.props} />;
      }
  }
  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(
      RedirectComponent
  );
  return ConnectedAuthRedirectComponent;
};

type MapPropsType = {
  isAuth: boolean
}


let mapStateToPropsForRedirect = (state: AppStateType): MapPropsType => {
  return {
      isAuth: state.auth.isAuth,
  };
};