import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/authReducer";
import Header, {MapPropsType, DispatchPropsType} from "./Header";
import { AppStateType } from "../../redux/reduxStore";

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
});

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { logout })(HeaderContainer);
