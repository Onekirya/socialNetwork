import { connect } from "react-redux";
import { actions } from "../../../redux/profileReducer";
import Posts, { DispatchPropsType, MapPropsType } from "./Posts";
import { AppStateType } from "../../../redux/reduxStore";

const mapStateToProps = (state: AppStateType) => {
  return {
    postData: state.profilePage.postData,
  } as MapPropsType;
};

const PostsContainer = connect<
  MapPropsType,
  DispatchPropsType,
  {},
  AppStateType
>(mapStateToProps, {
  addPost: actions.addPostActionCreator,
})(Posts);

export default PostsContainer;
