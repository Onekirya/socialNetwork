const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

let inicialState = {
  users: [
    // { id: 1, userPhoto:'https://www.clipartmax.com/png/full/267-2671061_yükle-youssefdibeyoussefdibe-profile-picture-user-male.png', 
    // followed: true,  fullName: 'Ivan', status: 'I like football', location: 'Moscow'},
    // { id: 2, userPhoto:'https://www.clipartmax.com/png/full/267-2671061_yükle-youssefdibeyoussefdibe-profile-picture-user-male.png', 
    // followed: false, fullName: 'Vasya', status: 'I hate internet', location: 'Minsk'},
    // { id: 3, userPhoto:'https://www.clipartmax.com/png/full/267-2671061_yükle-youssefdibeyoussefdibe-profile-picture-user-male.png', 
    // followed: true,  fullName: 'Petr', status: 'Hi there', location: 'Astana' }
  ],
};

const usersReducer = (state = inicialState, action) => {
  switch (action.type) {
  case FOLLOW: {
    return {
      ...state,
      users: state.users.map(u => {
        if (u.id === action.userId) {
          return {...u, followed: true}
        }
        return u;
      })
    }
}
case UNFOLLOW : {
  return {
    ...state,
    users: state.users.map(u => {
      if (u.id === action.userId) {
        return {...u, followed: false}
      }
      return u;
    })
  }

}
case SET_USERS : {
  return {...state, users: [...state.users, ...action.users]}
}
  
default:
  return state;
  }
}

export const followAC = (userId) => ({type: FOLLOW, userId});
export const unFollowAC = (userId) => ({type: UNFOLLOW, userId});
export const setUsersAC = (users) => ({type: SET_USERS, users});

export default usersReducer;
