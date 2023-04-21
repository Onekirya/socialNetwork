import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import {
  getUserProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile
} from "../../redux/profileReducer";
import Profile from "./Profile";
import { withRouter } from "../../hoc/withRouter";

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.router.navigate("/login");
      }
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.router.params.userId != prevProps.router.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.router.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
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
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
