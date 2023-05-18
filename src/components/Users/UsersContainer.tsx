import React, { FC } from "react";
import { useSelector } from "react-redux";
import Preloader from "../common/Preloader/Preloader";
import { getIsFetching } from "../../redux/users-selectors";
import { Users } from "./Users";

type UsersPagePropsType = {
  pageTitle: string;
  portionSize: number;
  selectedPage: number;
};
const UsersPage: FC<UsersPagePropsType> = (props) => {
  const isFetching = useSelector(getIsFetching);
  return (
    <>
      <h2>{props.pageTitle}</h2>
      {isFetching ? <Preloader /> : null}
      <Users
        portionSize={props.portionSize}
        selectedPage={props.selectedPage}
      />
    </>
  );
};
export default UsersPage;
