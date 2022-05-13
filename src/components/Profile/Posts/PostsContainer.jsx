import { connect } from "react-redux";
import {
  addPostAcrionCreator,
  updateNewPostTextActionCreator,
} from "../../../redux/store";
import Posts from "./Posts";

const mapStateToProps = (state) => {
  return {
    postData: state.profilePage.postData,
    newPostText: state.profilePage.newPostText
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text) => {
      let action = updateNewPostTextActionCreator(text);
      dispatch(action)
    },
    addPost: () => {
      dispatch(addPostAcrionCreator());
    }
  }
}

const PostsContainer = connect(mapStateToProps,mapDispatchToProps)(Posts);

export default PostsContainer;
