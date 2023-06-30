import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface Cafe {}

interface CafeState {
  list: Cafe[];
}

const initialState: CafeState = {
  list: [],
};

export const cafeSlice = createSlice({
  name: "cafe",
  initialState,
  reducers: {
    getCafe: (state, { payload }) => {
      state.list = payload;
    },
    createCafe: (state, { payload }) => {
      state.list.push(payload);
    },
    deleteCafe: (state, { payload }) => {
      return {
        ...state,
        //@ts-ignore
        list: state.list.filter((item) => item.id !== payload),
      };
    },
    updateCafe: (state, { payload }) => {
      const list = state.list.map((cafe) => {
        //@ts-ignore
        if (cafe.id === payload.id) {
          cafe = payload;
        }
        return cafe;
      });
      return { ...state, list };
    },
  },
});

export const { getCafe, createCafe, deleteCafe, updateCafe } =
  cafeSlice.actions;

export const selectCount = (state: RootState) => state.cafe;

export default cafeSlice.reducer;
