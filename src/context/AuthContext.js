import AsyncStorage from "@react-native-community/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from "../api/trackerApi";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_err":
      return { ...state, errMsg: action.payload };

    case "signup" || "signin" || "localSignin":
      return { token: action.payload, errMsg: "" };

    case "clear_err_msg":
      return { ...state, errMsg: "" };

    case "signout":
      return { token: null, errMsg: "" };

    default:
      return state;
  }
};

const signup = (dispatch) => async (email, password) => {
  try {
    const body = { email, password };
    const response = await trackerApi.post("signup", body);

    const token = response.data.token;
    await AsyncStorage.setItem("token", token);
    dispatch({ type: "signup", payload: token });
    navigate("TrackList");
  } catch (error) {
    dispatch({
      type: "add_err",
      payload: "Something went wrong with signup",
    });
  }
};

const signin = (dispatch) => async (email, password) => {
  try {
    const body = { email, password };
    const response = await trackerApi.post("signin", body);

    const token = response.data.token;
    await AsyncStorage.setItem("token", token);
    dispatch({ type: "signin", payload: token });
    navigate("TrackList");
  } catch (error) {
    dispatch({
      type: "add_err",
      payload: "Something went wrong with signin",
    });
  }
};

const clearErrMsg = (dispatch) => () => {
  dispatch({ type: "clear_err_msg" });
};

const tryLocalSignin = (dispatch) => async () => {
  let token = null;
  token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "localSignin", payload: token });
    navigate("TrackList");
  } else navigate("Signup");
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("Signup");
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrMsg, tryLocalSignin },
  { token: null, errMsg: "" }
);
