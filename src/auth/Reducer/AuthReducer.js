export const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("token") || null, 
  loading: false,
  error: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };

    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "LOGOUT":
      return { user: null, token: null, loading: false, error: null };

    default:
      return state;
  }
};
