// constants

const GET_SONGS = "songs/GET_SONGS";
const GET_SONG = "songs/GET_SONG";
const CREATE_SONG = "songs/CREATE_SONG";
const EDIT_SONG = "songs/EDIT_SONG";
const DELETE_SONG = "songs/DELETE_SONG";

// Action Creators
const loadSongs = (songs) => ({
  type: GET_SONGS,
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

// Thunk Action Creators

// Get Songs
export const getSongsThunk = () => async (dispatch) => {
  const res = await fetch("/api/songs");
  if (res.ok) {
    const songs = await res.json();
    dispatch(loadSongs(songs));
    return songs;
  } else {
    return res.errors;
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
  // else {
  //     return res.Error
  // }
};

// Create Song
export const createSongThunk =
  (newSongData) => async (dispatch) => {
    const res = await fetch(`/api/songs/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSongData),
    });
    console.log("res ", res);
    if (res.ok) {
      const createdSong = await res.json();
      console.log("new song ", createdSong);
      dispatch(createSong(createdSong));
      return createdSong;
    } else {
      return res;
    }
  };

// Edit Song
export const editSongThunk = (song) => async (dispatch) => {
  const res = await fetch(`/api/songs/${song.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  });
  if (res.ok) {
    const song = await res.json();
    dispatch(editSong(song));
    return song;
  }
  // else {
  //     return res.Error
  // }
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
  }
  // else {
  //     return res.Error
  // }
};

// Reducer
const initialState = { allSongs: {}, singleSong: {} };

const songsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    // Get All Songs
    case GET_SONGS:
      newState = { allSongs: {}, singleSong: {} };
      action.songs.forEach((song) => (newState.allSongs[song.id] = song));
      return newState;

    // Get Song
    case GET_SONG:
      // newState = { singleSong: { ...state.singleSong, ...action.song }}
      // return newState

      // return { ...state, singleSpot: action.spot }

      return { ...state, singleSong: action.song };

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

    // Default
    default:
      return state;
  }
};

export default songsReducer;
