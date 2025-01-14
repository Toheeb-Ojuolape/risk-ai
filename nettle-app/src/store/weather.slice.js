import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  unit: "cen",
  unit_title: "°C",
  city: "",
  error: "",
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
   
    setUnit: (state, action) => {
      state.unit = action.payload;
      state.unit_title = action.payload === "cen" ? "°C" : "°F";
    },
   
    setWeather: (state, action) => {
      state.data = action.payload;
    },
   
    setCity: (state, action) => {
      localStorage.getItem("history");
      const _history = JSON.parse(localStorage.getItem("history") || "[]");
      if (!_history.includes(action.payload)) {
        _history.push(action.payload);
        localStorage.setItem("history", JSON.stringify(_history));
      } else {
        const _index = _history.indexOf(action.payload);
        _history.splice(_index, 1);
        _history.push(action.payload);
        localStorage.setItem("history", JSON.stringify(_history));
      }
      state.city = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUnit, setWeather, setCity, setError } = weatherSlice.actions;
export default weatherSlice.reducer;
