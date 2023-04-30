import React, { ChangeEvent } from "react";
import s from "./ProfileInfo.module.css";

type PropsType = {
 status:string
 updateStatus: (newStatus:string) => void
}

type StateType = {
  editMode: boolean,
  status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
  state = {
    editMode: false,
    status: this.props.status
  };

  activatedEditMode = () =>{
    this.setState({
      editMode: true
    })
  }

  deactivatedEditMode = () => {
    this.setState({
      editMode: false
    })
    this.props.updateStatus(this.state.status)
  }

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value
    })
  }

  componentDidUpdate (prevProps: PropsType, prevState: StateType) {
    if (prevProps.status !== this.props.status){
      this.setState({
        status: this.state.status
      })
    }

  }

  render() {
    console.log('render');
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span
              onDoubleClick={this.activatedEditMode}
            >
              {this.props.status}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivatedEditMode} value={this.state.status} />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
