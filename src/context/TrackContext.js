import createDataContext from "./createDataContext";
import trackerApi from "../api/trackerApi";
import { navigate } from "../navigationRef";
const trackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_tracks":
      return { ...state, data: action.payload, errMsg: "" };
    case "add_err":
      return { ...state, errMsg: action.payload };
    default:
      return state;
  }
};

const fetchTracks = (dispatch) => async () => {
  const response = await trackerApi.get("tracks");
  dispatch({ type: "fetch_tracks", payload: response.data });
  return true;
};
const createTrack = (dispatch) => async (name, locations) => {
  await trackerApi.post("tracks", { name, locations });
};

const deleteTack = (dispatch) => async (id) => {
  try {
    await trackerApi.post("track", { id }); //delete vern not working
    navigate("TrackList");
  } catch (error) {
    dispatch({
      type: "add_err",
      payload: "SomeThing went wrong with delete",
    });
  }
};

const renameTack = (dispatch) => async (id, name) => {
  try {
    await trackerApi.put("track", { id, name });
    navigate("TrackList");
  } catch (error) {
    dispatch({
      type: "add_err",
      payload: "SomeThing went wrong with rename",
    });
  }
};

export const { Context, Provider } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack, deleteTack, renameTack },
  { data: [], errMsg: "" }
);
