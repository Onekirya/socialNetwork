import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { getUserProfile } from "../../redux/profileReducer";
import Profile from "./Profile";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.params.userId;
    debugger
    if (!userId) {
      userId = 2;
    }
    this.props.getUserProfile(userId);
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile
});

const TakeParams = (props) => {
  return <AuthRedirectComponent {...props} params={useParams()} />;
};

export default connect(mapStateToProps, { getUserProfile })(TakeParams);

// compose(
//   connect(mapStateToProps, { getUserProfile }),
//   TakeParams,
//   withAuthRedirect
// )(ProfileContainer)