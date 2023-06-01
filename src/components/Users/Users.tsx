import React, { FC, useEffect } from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UsersSearchForm } from "./UsersSearchForm";
import {
  FilterType,
  follow,
  requestUsers,
  unfollow,
} from "../../redux/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from "../../redux/users-selectors";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";

type PropsType = {
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
  portionSize: number;
  selectedPage: number;
};

export const Users: FC<PropsType> = ({ selectedPage, ...props }) => {
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const users = useSelector(getUsers);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch = useDispatch();

  const useNavigateSearch = () => {
    const history = useNavigate();
    return (pathname, params) =>
      history(`${pathname}?${createSearchParams(params)}`);
  };

  const navigateSearch = useNavigateSearch();
  const location = useLocation();
  useEffect(() => {
    navigateSearch("/users", {
      page: `${currentPage}`,
      count: `${pageSize}`,
      term: `${filter.term}`,
      friend: `${filter.friend}`,
    });
  }, [filter, currentPage, pageSize]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    let actualPage = currentPage;
    let actualFilter = filter;

    const queryFriend = query.get("friend");
    const queryPage = query.get("page");
    const queryTerm = query.get("term");

    if (queryPage) actualPage = +queryPage;

    if (queryTerm) actualFilter = { ...actualFilter, term: queryTerm };

    switch (queryFriend) {
      case "null":
        actualFilter = { ...actualFilter, friend: null };
        break;
      case "true":
        actualFilter = { ...actualFilter, friend: true };
        break;
      case "false":
        actualFilter = { ...actualFilter, friend: false };
        break;
      default:
        break;
    }
    dispatch(requestUsers(actualPage, pageSize, actualFilter));
  }, [location.search]);

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter));
  }, []);

  const onPageChanged = (pageNumber) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };

  const followUsers = (userId: number) => {
    dispatch(follow(userId));
  };
  const unfollowUsers = (userId: number) => {
    dispatch(unfollow(userId));
  };

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
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
            followingInProgress={followingInProgress}
            unfollow={unfollowUsers}
            follow={followUsers}
            key={u.id}
          />
        ))}
      </div>
    </div>
  );
};
