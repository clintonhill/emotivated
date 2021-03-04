const SET_USER = 'session/setUser';

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

const sessionReducer = (state = { user: null }, action) => {
    let newState = {...state};
    switch (action.type){
        case SET_USER:
            newState = action.payload
            return newState
        default:
            return state
    }
}

export default sessionReducer
