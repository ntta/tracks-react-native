import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const trackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_tracks":
      return action.payload;
    default:
      return state;
  }
};

const fetchTracks = (dispatch) => async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${trackerApi}/tracks`, {
      method: "GET",
      headers: { ...headers, Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!data.error) {
      dispatch({ type: "fetch_tracks", payload: data });
    }
  } catch (err) {
    console.log(err);
  }
};

const createTrack = () => async (name, locations) => {
  try {
    const token = await AsyncStorage.getItem("token");
    await fetch(`${trackerApi}/tracks`, {
      method: "POST",
      headers: { ...headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name,
        locations,
      }),
    });
  } catch (err) {
    console.log(err);
  }
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack },
  []
);
