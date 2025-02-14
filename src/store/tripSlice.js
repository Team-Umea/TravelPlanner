import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trip: {},
  activity: {},
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setTrip(state, action) {
      state.trip = action.payload;
    },
    setActivity(state, action) {
      state.activity = action.payload;
    },
  },
});

export const { setTrip, setActivity } = tripSlice.actions;

export default tripSlice.reducer;
