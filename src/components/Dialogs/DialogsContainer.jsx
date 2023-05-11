import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import {
  actions
} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";


let mapStateToProps = (state) => {
  return {
    dialogsePage: state.dialogsePage
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (sendMessage) => {
      dispatch(actions.sendMessageCreator(sendMessage));
    }
  }
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
