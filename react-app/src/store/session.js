// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const EDIT_USER = "session/EDIT_USER";
const SET_HEADER = "session/SET_HEADER";

// ~~~~~~~~~~~~~~~~~~~~~~ Action Creators ~~~~~~~~~~~~~~~~~~~~~~
const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const editUser = (user) => ({
  type: EDIT_USER,
  user,
});

const setHeader = (image) => ({
  type: SET_HEADER,
  image,
});

// ~~~~~~~~~~~~~~~~~~~~~~ User Session Thunks ~~~~~~~~~~~~~~~~~~~~~~

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    console.log("what is happening", data)
    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const editUserThunk = (user, userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`, {
    method: "PUT",
    body: user,
  });

  console.log("what is res and why is it ok", res.ok, res);
  if (res.ok) {
    const editedUser = await res.json();
    console.log("checking edited user", editedUser);
    dispatch(editUser(editedUser));
    return editedUser;
  } else {
    const data = await res.json();
    if (data.errors) {
      return data;
    }
  }
};

export const setHeaderImageThunk = (data, userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/header-image`, {
    method: "POST",
    body: data,
  });
  if (res.ok) {
    const user = await res.json();
    dispatch(setHeader(user.header_image_url));
    return user.header_image_url;
  } else {
    return res;
  }
};

const initialState = { user: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case EDIT_USER: {
      const newState = { ...state };
      newState.user = { ...state.user, ...action.user };
      return newState;
    }
    case SET_HEADER:
      const newState = { ...state, user: { ...state.user } };
      newState.header_image_url = action.image;
      return newState;
    default:
      return state;
  }
}
