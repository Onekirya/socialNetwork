import { actions, follow, unfollow } from "./usersReducer"
import { usersAPI } from "../api/usersAPI";
import { ResponseType, ResultCodesEnum } from "../api/api";

jest.mock("../api/usersAPI")

const UserApiMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: ResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {}
}

const dispatchMock = jest.fn()
const getStateMock = jest.fn()


test("success follow thunk", async () => {
  //@ts-ignore
  usersAPI.follow.mockResolvedValue(result)

  const thunk = follow(1)

  await thunk(dispatchMock, getStateMock, {})
  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})



test("success unfollow thunk", async () => {
  //@ts-ignore
  usersAPI.unfollow.mockResolvedValue(result)

  const thunk = unfollow(1)

  await thunk(dispatchMock, getStateMock, {})
  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unFollowSuccess(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})