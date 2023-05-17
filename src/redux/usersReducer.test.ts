import usersReducer, { actions, inicialState } from "./usersReducer";

let state: inicialState;

beforeEach(()=>{
  state = {
    users: [
      { id: 0, name: 'Kirill 0', followed: false, photos: { small: null, large: null }, status: 'status 0' },
      { id: 1, name: 'Kirill 1', followed: false, photos: { small: null, large: null }, status: 'status 1' },
      { id: 2, name: 'Kirill 2', followed: true, photos: { small: null, large: null }, status: 'status 2' },
      { id: 3, name: 'Kirill 3', followed: true, photos: { small: null, large: null }, status: 'status 3' }
    ],
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    toggleIsFetching: []
  }
})

test("Follow success", () => {

  const newState = usersReducer(state, actions.followSuccess(1))

  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[1].followed).toBeTruthy()

})

test("Unfollow success", () => {

  const newState = usersReducer(state, actions.unFollowSuccess(3))

  expect(newState.users[2].followed).toBeTruthy()
  expect(newState.users[3].followed).toBeFalsy()

})