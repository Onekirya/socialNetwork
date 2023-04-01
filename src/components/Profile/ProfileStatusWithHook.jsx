import React, { useState } from "react";

const ProfileStatusWithHook = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  const activatedEditMode = () => {
    setEditMode(true);
  };

  const deactivatedEditMode = () => {
    setEditMode(false); 
    props.updateStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
  
    <div>
      {!editMode && (
        <div>
          <span onDoubleClick={activatedEditMode}>{props.status || "---"}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            onBlur={deactivatedEditMode}
            autoFocus={true}
            value={status}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHook;
