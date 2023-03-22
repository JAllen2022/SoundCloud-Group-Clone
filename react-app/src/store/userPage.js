import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
// Store for visiting user pages that are not the current, logged in user

// constants
const LOAD_USER = "userPage/SET_USER";
const ADD_HEADER = "userPage/ADD_HEADER";
// const LOAD_USER_LIKES = "userPage/LOAD_USER_LIKES";
// const DELETE_USER_LIKE = "userPage/DELETE_USER_LIKE";

// Action Creators
export const loadUser = (user) => ({
    type: LOAD_USER,
    user
});

export const headerUserPage = (image) => ({
    type: ADD_HEADER,
    image
});

// export const deleteUserLike = (songId, userId) => ({
//     type: DELETE_USER_LIKE,
//     payload:{songId, userId}
// })

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
    } else {
        const data = await res.json();
        if (data.errors) {
          return data;
        }
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
            newState = { ...state.userProfile };
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
        // case DELETE_USER_LIKE:{
        //     const {songId, userId} = action.payload
        //     newState = {
        //       ...state,
        //       userProfile: { ...state.userProfile },
        //     };
        //     newState.userProfile.user_likes = { ...state.userProfile.user_likes }
        //     // Look through array where songId==song.id, find index
        //     let index = newState.userProfile.user_likes.findIndex((song)=> songId === song.id)
        //     newState.userProfile.user_likes.splice(index, 1)
        //     // [{songId, userId}, {}, {}]
        //     // Remove that index from the array, and then return the new state
        //     // newState.userProfile
        //     return newState
        //     }
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
