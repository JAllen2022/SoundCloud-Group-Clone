// constants

const GET_SONGS = "songs/GET_SONGS";
const GET_SONG = "songs/GET_SONG";
const CREATE_SONG = "songs/CREATE_SONG";
const EDIT_SONG = "songs/EDIT_SONG";
const DELETE_SONG = "songs/DELETE_SONG";
const ADD_LIKE = "songs/ADD_LIKE";
const DELETE_LIKE = "songs/DELETE_LIKE";
const RESET_SINGLE_SONG = "songs/RESET_SINGLE_SONG";
const PLAY_SONG = "songs/PLAY_SONG";
const IS_PLAYING = "songs/IS_PLAYING";
const SET_PLAYER_REF = "songs/SET_PLAYER_REF"
const SET_CURRENT_TIME = "songs/SET_CURRENT_TIME"


// Constants for the User Page
const GET_USER_SONGS = "songs/GET_USER_SONGS";
const GET_USER_LIKED_SONGS = "songs/GET_USER_LIKED_SONGS";

// Action Creators
const loadSongs = (songs) => ({
  type: GET_SONGS,
  songs,
});

const loadUserSongs = (songs) => ({
  type: GET_USER_SONGS,
  songs,
});

const loadSong = (song) => ({
  type: GET_SONG,
  song,
});

const createSong = (song) => ({
  type: CREATE_SONG,
  song,
});

const editSong = (song) => ({
  type: EDIT_SONG,
  song,
});

const deleteSong = (songId) => ({
  type: DELETE_SONG,
  songId,
});

const addLike = (songId, current_user, song) => ({
  type: ADD_LIKE,
  payload: { songId, current_user, song }
});

const deleteLike = (songId, current_user, userId) => ({
  type: DELETE_LIKE,
  payload: { songId, current_user, userId },
});

export const playSong = (song) => ({
  type: PLAY_SONG,
  song,
});

export const getUserLikedSongs = (songs) => ({
  type: GET_USER_LIKED_SONGS,
  songs,
});

export const resetSingleSong = () => ({
  type: RESET_SINGLE_SONG,
});

export const isPlaying = (bool) => ({
  type: IS_PLAYING,
  bool
});

export const setPlayerReference = (ref) => ({
  type: SET_PLAYER_REF,
  ref
});

export const setCurrentTime = (time) => ({
  type: SET_CURRENT_TIME,
  time
})


// Thunk Action Creators

// Get Songs
export const getSongsThunk = () => async (dispatch) => {
  const res = await fetch("/api/songs");
  if (res.ok) {
    const songs = await res.json();
    dispatch(loadSongs(songs));
    return songs;
  } else {
    return res;
  }
};

// Get User Songs
export const getUserSongsThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/songs`);

  if (res.ok) {
    const songs = await res.json();
    dispatch(loadUserSongs(songs));
    return songs;
  } else {
    return res;
  }
};

// Get User Liked Songs
export const getUserLikedSongsThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/likes`);

  if (res.ok) {
    const likedSongs = await res.json();
    dispatch(getUserLikedSongs(likedSongs));
    return likedSongs;
  } else {
    return res;
  }
};

// Get song
export const getSongThunk = (songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}`);

  if (res.ok) {
    const song = await res.json();
    dispatch(loadSong(song));
    return song;
  }
};

// Create Song
export const createSongThunk = (data) => async (dispatch) => {
  const res = await fetch("/api/songs", {
    method: "POST",
    body: data,
  });

  if (res.ok) {
    const createdSong = await res.json();
    dispatch(createSong(createdSong));
    return createdSong;
  } else {
    const data = await res.json();
    if (data.errors) {
      return data;
    }
  }
};

// Edit Song
export const editSongThunk = (song, songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}`, {
    method: "PUT",
    body: song,
  });
  if (res.ok) {
    const song = await res.json();
    dispatch(editSong(song));
    return song;
  } else {
    const data = await res.json();
    if (data.errors) {
      return data;
    }
  }
};

// Delete Song
export const deleteSongThunk = (songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const deletedSong = await res.json();
    dispatch(deleteSong(songId));
    return deletedSong;
  } else {
    const data = await res.json();
    if (data.errors) {
      return data;
    }
  }
};

// Add Like
export const addLikeThunk = (songId, current_user) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}/likes`, {
    method: "POST",
  });
  if (res.ok) {
    const song = await res.json();
    dispatch(addLike(songId, current_user, song));
  }
};

// Delete Like
export const deleteLikeThunk =
  (songId, current_user, userId) => async (dispatch) => {
    const res = await fetch(`/api/songs/${songId}/likes`, { method: "DELETE" });
    if (res.ok) {
      dispatch(deleteLike(songId, current_user, userId));
    }
  };

// export const setCurrentTimeThunk =
//   (time) => async (dispatch) => {
//     dispatch(setCurrentTime(songId, current_user, userId));

//   };



// Reducer
const initialState = {
  allSongs: {},
  singleSong: {},
  userSongs: {},
  userLikedSongs: {},
  playSong: {},
  isPlaying: false,
  currentTime: 0
};

const songsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    // Get All Songs
    case GET_SONGS:
      newState = { ...state };
      newState.allSongs = action.songs;
      return newState;

    // Get All User Songs
    case GET_USER_SONGS:
      newState = { ...state };
      // action.songs.forEach((song) => (newState.userSongs[song.id] = song));
      newState.userSongs = { ...action.songs };
      return newState;

    // Get Song
    case GET_SONG:
      // newState = { singleSong: { ...state.singleSong, ...action.song }}
      // return newState

      // return { ...state, singleSpot: action.spot }

      return { ...state, singleSong: action.song };

    case GET_USER_LIKED_SONGS:
      // newState = { singleSong: { ...state.singleSong, ...action.song }}
      // return newState

      // return { ...state, singleSpot: action.spot }

      return { ...state, userLikedSongs: action.songs };

    // Create Song
    case CREATE_SONG:
      newState.allSongs = { ...state.allSongs, [action.song.id]: action.song };
      return newState;

    // Edit Song
    case EDIT_SONG:
      return { ...state, singleSong: action.song };

    // Delete Song
    case DELETE_SONG:
      newState.allSongs = { ...state.allSongs };
      delete newState.allSongs[action.songId];
      return newState;

    // Add Like
    case ADD_LIKE: {
      const { songId, current_user, song } = action.payload;
      if (Object.values(newState.allSongs).length) {
        // console.log("newState.allSongs", newState.allSongs)
        newState.allSongs = { ...state.allSongs };
        // console.log("newState.allSongs pt2", newState.allSongs)

        newState.allSongs[songId] = { ...state.allSongs[songId] };
        // console.log("newState.allSongs pt3", newState.allSongs)

        newState.allSongs[songId].song_likes = {
          ...state.allSongs[songId].song_likes,
        };
        // console.log("newState.allSongs pt4", newState.allSongs)

        newState.allSongs[songId].song_likes[current_user.id] = current_user;
        newState.allSongs[songId].like_count++;
      }
      if (Object.values(newState.singleSong).length) {
        // console.log("newState.singleSongs", newState.singleSong);
        newState.singleSong = { ...state.singleSong };
        if (newState.singleSong.id == songId) {
          newState.singleSong.like_count++;
          newState.singleSong.song_likes = { ...state.singleSong.song_likes };
          newState.singleSong.song_likes[current_user.id] = current_user;
        }
      }
      if (Object.values(newState.userSongs).length) {
        newState.userSongs = { ...state.userSongs };
        if (newState.userSongs[songId]) {
          newState.userSongs[songId] = { ...state.userSongs[songId] };
          newState.userSongs[songId].like_count++;
          newState.userSongs[songId].song_likes[current_user.id] = current_user;
        }
      }
      if (Object.values(newState.userLikedSongs).length) {
        newState.userLikedSongs = { ...state.userLikedSongs };
        if (newState.userLikedSongs[songId]) {
          newState.userLikedSongs[songId] = { ...state.userLikedSongs[songId] };
          newState.userLikedSongs[songId].like_count++;
          newState.userLikedSongs[songId].song_likes[current_user.id] =
            current_user;
        } else {
          newState.userLikedSongs[songId] = song
        }
      }

      return newState;
    }

    // Delete Like
    case DELETE_LIKE: {
      const { songId, current_user, userId } = action.payload;
      if (Object.values(newState.allSongs).length) {
        newState.allSongs = { ...state.allSongs };
        if (newState.allSongs[songId]) {
          newState.allSongs[songId] = { ...state.allSongs[songId] };
          newState.allSongs[songId].song_likes = {
            ...state.allSongs[songId].song_likes,
          };
          delete newState.allSongs[songId].song_likes[current_user.id];
          newState.allSongs[songId].like_count--;
        }
      }
      if (Object.values(newState.singleSong).length) {
        newState.singleSong = { ...state.singleSong };
        if (newState.singleSong.id == songId) {
          newState.singleSong.like_count--;
          newState.singleSong.song_likes = { ...state.singleSong.song_likes };
          delete newState.singleSong.song_likes[current_user.id];
        }
      }
      if (Object.values(newState.userSongs).length) {
        newState.userSongs = { ...state.userSongs };
        if (newState.userSongs[songId]) {
          // console.log("newState.userSongs", newState.userSongs);
          newState.userSongs[songId] = { ...state.userSongs[songId] };
          newState.userSongs[songId].like_count--;
          delete newState.userSongs[songId].song_likes[current_user.id];
        }
      }
      if (Object.values(newState.userLikedSongs).length) {
        // console.log("newState.userSongs", newState.userLikedSongs);
        newState.userLikedSongs = { ...state.userLikedSongs };
        if (newState.userLikedSongs[songId]) {
          newState.userLikedSongs[songId] = { ...state.userLikedSongs[songId] };
          // console.log("current user id vs user id", current_user.id, userId);
          if (current_user.id == userId) delete newState.userLikedSongs[songId];
          else {
            newState.userLikedSongs[songId].like_count--;
            delete newState.userLikedSongs[songId].song_likes[current_user.id];
          }
        }
      }
      return newState;
    }

    // Play Selected Song
    case PLAY_SONG:
      return { ...state, playSong: action.song };

    case RESET_SINGLE_SONG:
      return { ...state, singleSong: {} };

    case IS_PLAYING:
      newState.isPlaying = action.bool;
      return newState;
    case SET_PLAYER_REF:
      newState["playerRef"] = action.ref;
      return newState;
    // Default
    case SET_CURRENT_TIME:
      return { ...state, currentTime: action.time };
    default:
      return state;
  }
};

export default songsReducer;
