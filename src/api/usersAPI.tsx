
import { GetItemsType, ResponseType, instance } from "./api";

export const usersAPI = {
  getUsers(
    currentPage = 1,
    pageSize = 10,
    term: string = "",
    friend: null | boolean = null
  ) {
    return instance
      .get<GetItemsType>(
        `users?page=${currentPage}&count=${pageSize}&term=${term}` +
          (friend === null ? "" : `&friend=${friend}`)
      )
      .then((res) => res.data);
  },
  follow(userId: number) {
    return instance
      .post<ResponseType>(`follow/${userId}`)
      .then((res) => res.data);
  },
  unfollow(userId: number) {
    return instance
      .delete<ResponseType>(`follow/${userId}`)
      .then((res) => res.data) as Promise<ResponseType>;
  },
};
