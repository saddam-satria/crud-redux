import { GET_USERS, POST_USER, UPDATE_USER, DELETE_USER, LOADING } from '../constant';

export const getUsers = () => (dispatch) => {
  dispatch(setLoading());
  fetch('http://localhost:5000/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((Response) => Response.json())
    .then((users) =>
      dispatch({
        type: GET_USERS,
        users,
      })
    );
};

export const updateUser = (id, user) => (dispatch) => {
  dispatch(setLoading());
  fetch('http://localhost:5000/users/' + id, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((Response) => Response.json())
    .then((user) => {
      console.log(user);
      dispatch({
        type: UPDATE_USER,
        user,
      });
    });
};

export const deleteUser = (id) => (dispatch) => {
  fetch('http://localhost:5000/users/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((Response) => Response.json())
    .then(() => {
      dispatch({
        type: DELETE_USER,
        id,
      });
    });
};

export const postUser = (user) => (dispatch) => {
  dispatch(setLoading());
  setTimeout(
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((Response) => Response.json())
      .then((user) => {
        dispatch({
          type: POST_USER,
          user,
        });
      })
      .catch((err) => console.log(err)),
    1000
  );
};

export const setLoading = () => {
  return {
    type: LOADING,
  };
};
