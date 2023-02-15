// Store for visiting user pages that are not the current, logged in user

// constants
const LOAD_USER = "userPage/SET_USER";

// Action Creators
export const loadUser = (user) => ({
    type: LOAD_USER,
    user
});

// Thunk Action Creators
export const loadUserThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`);

    if (res.ok) {
        const userId = await res.json();
        dispatch(loadUser(userId))
        return userId;
    }
}

// Default state
const initialState = {
    userProfile:{}
}

export default function userPageReducer(state=initialState, action) {
    switch (action.type) {
        case LOAD_USER:
            const newState = { ...state }
            newState.userProfile = action.user;
            return newState;
        default:
            return state;
    }

}
