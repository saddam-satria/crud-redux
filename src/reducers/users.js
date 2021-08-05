import { GET_USERS, POST_USER, UPDATE_USER, DELETE_USER, LOADING } from '../constant';

const initialState = {
  users: [],
  loading: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, loading: false, users: action.users };
    case POST_USER:
      return { ...state, users: [action.user, ...state.users], loading: false };
    case DELETE_USER:
      return { ...state, users: state.users.filter((user) => user.id !== action.id) };
    case UPDATE_USER:
      return { ...state, users: state.users.map(user=> user.id !== action.user.id ? user : action.user), loading: false };

    case LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default users;
