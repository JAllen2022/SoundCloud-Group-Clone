// Store for visiting user pages that are not the current, logged in user

// constants
const LOAD_USER = "userPage/SET_USER";
const ADD_HEADER = "userPage/ADD_HEADER";
// const LOAD_USER_LIKES = "userPage/LOAD_USER_LIKES";

// Action Creators
export const loadUser = (user) => ({
    type: LOAD_USER,
    user
});

export const headerUserPage = (image) => ({
    type: ADD_HEADER,
    image
});

// export const loadUserLikes = (likes) => ({
//     type: LOAD_USER_LIKES,
//     likes
// })

// Thunk Action Creators
export const loadUserThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`);

    if (res.ok) {
        const userId = await res.json();
        dispatch(loadUser(userId))
        return userId;
    }
};

// export const getUserLikesThunk = (userId) => async (dispatch) => {
//     const res = await fetch(`api/users/${userId}/likes`);

//     if (res.ok) {
//         const likes = await res.json();
//         dispatch(loadUserLikes(likes));
//         return likes
//     }
// };

// Default state
const initialState = {
    userProfile:{}
}

export default function userPageReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        // Load User
        case LOAD_USER:
            newState = { ...state }
            newState.userProfile = action.user;
            return newState;

        // Add Header
        case ADD_HEADER:
            newState = {
              ...state,
              userProfile: { ...state.userProfile },
            };
			newState.userProfile.header_image_url = action.image;
            return newState;

        // // Get All User Likes
        // case LOAD_USER_LIKES:
        //     newState = { ...state, userProfile: { ...state.userProfile }};
        //     newState.userProfile.user_likes = action.likes
        //     return newState;

        // Default
        default:
            return state;
    }

}
