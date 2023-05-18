import React from "react";
import { connect } from "react-redux";
import {
  requestUsers,
  follow,
  unfollow,
  FilterType
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from "../../redux/users-selectors";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/reduxStore";

type MapStatePropsType = {
  currentPage: number,
  pageSize: number,
  isFetching: boolean,
  totalUsersCount: number
  users: Array<UserType>
  followingInProgress:Array<number>
  filter: FilterType
}

type MapDispatchPropsType = {
  requestUsers: (currentPage: number, pageSize: number, filter: FilterType)=>void,
  unfollow: (userId:number)=>void,
  follow: (userId:number)=>void
}

type OwnProps = {
  pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps;

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const {currentPage, pageSize, filter} = this.props;
    this.props.requestUsers(currentPage, pageSize, filter);
  }

  onPageChanged = (pageNumber: number) => {
    const {pageSize, filter} = this.props
    this.props.requestUsers(pageNumber, pageSize, filter);
  };

  onFilterChanged = (filter : FilterType) => {
    const {pageSize} = this.props
    this.props.requestUsers(1, pageSize, filter);
  }

  render() {
    return <>
      <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          onFilterChanged={this.onFilterChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    
  }
}

let mapStateToProps = (state:AppStateType):MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state)
  };
};

let AuthRedirectComponent = withAuthRedirect(UsersContainer);



export default connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, {
  follow,
  unfollow,
  requestUsers,
})(AuthRedirectComponent);
