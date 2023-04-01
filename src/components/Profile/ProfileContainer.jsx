import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import {
  getUserProfile,
  getStatus
} from "../../redux/profileReducer";
import Profile from "./Profile";
import { withRouter } from "../../hoc/withRouter";

class ProfileContainer extends React.Component {
  componentDidMount() {
    debugger;
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.router.navigate("/login");
      }
    }

    // let userId = this.props.params.userId;
    // if (!userId) {
    //   debugger
    //   userId = this.props.authorizedUserId;
    // }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId)
  }

  render() {
    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
      />
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth,
});

export default compose(
  connect(mapStateToProps, { getUserProfile,getStatus }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
