import React, { FC } from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UserType } from "../../types/types";
import { UsersSearchForm } from "./UsersSearchForm";
import { FilterType } from "../../redux/usersReducer";

type PropsType = {
  currentPage: number;
  totalUsersCount: number;
  pageSize: number;
  selectedPage: number;
  onPageChanged: (pageNumber: number) => void;
  onFilterChanged: (filter: FilterType)=> void,
  users: Array<UserType>;
  followingInProgress: Array<number>;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
  portionSize: number;
};

const Users: FC<PropsType> = ({
  currentPage,
  totalUsersCount,
  pageSize,
  selectedPage,
  onPageChanged,
  users,
  ...props
}) => {
  return (
    <div>
      <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
      <Paginator
        currentPage={currentPage}
        selectedPage={selectedPage}
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
        portionSize={props.portionSize}
      />
      <div>
        {users.map((u) => (
          <User
            user={u}
            followingInProgress={props.followingInProgress}
            unfollow={props.unfollow}
            follow={props.follow}
            key={u.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
