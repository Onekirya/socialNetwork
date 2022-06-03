import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { setUserProfile } from "../../redux/profileReducer";
import Profile from "./Profile";

class ProfileContainer extends React.Component {
  componentDidMount(){
    let userId = this.props.param.userID

    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/profile/` + userId
      )
      .then((response) => {

        this.props.setUserProfile(response.data);

      });
  }
  render() {
    return <Profile {...this.props} profile = {this.props.profile}/>;
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile
});

const TakeParams = (props) => {
  return <ProfileContainer {...props} param={useParams()} />
}

export default connect(mapStateToProps, {setUserProfile})(TakeParams);