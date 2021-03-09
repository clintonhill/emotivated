const SET_USER = 'user/setUser';

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const getProfileUser = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/profile/${userId}`);
  if(response.ok) {
    const user = await response.json();
    dispatch(setUser(user));
  }
}

const userReducer = (state = {}, action) => {
    let newState = {...state};
    switch (action.type){
        case SET_USER:
            let id = action.payload.id
            newState[id] = action.payload
            return newState;
        default:
          return state;
    }
}

export default userReducer
