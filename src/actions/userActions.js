import axios from "axios";

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "./../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/Login",
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};
export const register =
  (first_name, email, password, pic) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users",
        { first_name, email, password, pic },
        config
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const updateProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post( "/api/users/update", user, config);
        console.log(data)

        if (data.status == "SUCCESS") {
            dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data))
            console.log(data)
        }
        if (data.status == "FAILED") {
            dispatch({ type: USER_UPDATE_FAIL, payload: data.message });
            dispatch({ type: USER_LOGIN_FAIL, payload: data.message });
            console.log(data)
        }

    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getAllUsers = () => async (dispatch, getState) => {
  

      const config = {
          headers: {
              "Content-Type": "application/json",
          },
      };


      const { users } = await axios.get( "/api/users/users", config);
      console.log(users);
      console.log("fetching user");


};
