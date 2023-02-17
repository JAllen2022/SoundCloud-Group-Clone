// Constant Action Variables

import { compose } from "redux";

const LOAD_SONG_COMMENTS = "comments/LOAD_SONG_COMMENTS";
const LOAD_USER_COMMENTS = "comments/LOAD_USER_COMMENTS"
const CREATE_COMMENT = "comments/CREATE_COMMENT";
const EDIT_COMMENT = "comments/EDIT_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";

// Action Creators

const loadSongComments = (comments) => {
    return {
        type: LOAD_SONG_COMMENTS,
        comments
    }
}

const loadUserComments = (comments) => {
    return {
        type: LOAD_USER_COMMENTS,
        comments
    }
}


const createComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    }
}


const editComment = (comment) => {
    return {
        type: EDIT_COMMENT,
        comment
    }
}


const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}


// Thunk Action Creators

// LOAD SONG COMMENTS
export const loadSongCommentsThunk = (songId) => async (dispatch) => {
    const res = await fetch(`/api/songs/${songId}/comments`)
    // console.log(res);

    if (res.ok) {
        const comments = await res.json()
        // console.log(comments)
        dispatch(loadSongComments(comments))
        return comments
    }
}


// LOAD USER COMMENTS
export const loadUserCommentsThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/comments`);

    console.log("checking whats going on", res)
    if (res.ok) {
        console.log("checking res", res)
        const comments = await res.json();
        console.log("checking comments",comments)
        dispatch(loadUserComments(comments))
        return comments
    }
}


// CREATE COMMENT
export const createCommentThunk = (songId, newComment) => async (dispatch) => {
    const res = await fetch(`/api/songs/${songId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment)
    })

    if (res.ok) {
        const createdComment = await res.json()
        dispatch(createComment(createdComment))
        return createdComment
    }
}

// EDIT COMMENT
export const editCommentThunk = (comment) => async (dispatch) => {
    const res = await fetch(`/api/comments/${comment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })
    if (res.ok) {
        const editedComment = await res.json()
        dispatch(editComment(editedComment))
        return editedComment
    }
}


// DELETE COMMENT
export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    });

    if (res.ok) {
        const deletedComment = await res.json();
        dispatch(deleteComment(commentId))
        return deletedComment
    }
}


// Initial State

const initialState = {
    song: {},
    user: {}
};

// Reducer

export default function commentsReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {

        // Load Song Comments
        case LOAD_SONG_COMMENTS:
            if (Array.isArray(action.comments)) {
                action.comments.forEach(comment => {
                    newState.song[comment.id] = comment
                })
            }
            return newState;

        // Load User Comments
        case LOAD_USER_COMMENTS:
            // newState.user = action.comments;
            console.log("checking user comments", action.comments)
            // newState.user=
            newState.user = {...state.user}
            Object.values(action.comments).forEach(comment => {
                newState.user[comment.id] = comment
            })
            return newState;

        // Create Comment
        case CREATE_COMMENT:
            newState.song = { ...state.song, [action.comment.id]: action.comment }
            return newState;

        // Edit Comment
        case EDIT_COMMENT:
            return { ...state, [action.comment.id]: action.comment };
            // newState.song = {...state.song}
            // newState.song[action.comment.id] = action.comment
            // return newState;


        // Delete Comment
        case DELETE_COMMENT:
            newState.song = { ...state.song }
            delete newState.song[action.commentId]
            return newState;

        // Default
        default:
            return state;
    }
}
