import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import {
  actions
} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { AppStateType } from "../../redux/reduxStore";


let mapStateToProps = (state: AppStateType) => {
  return {
    dialogsePage: state.dialogsePage
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    ...actions
  }),
  withAuthRedirect
)(Dialogs);
