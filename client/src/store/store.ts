import { configureStore } from "@reduxjs/toolkit";
import cafeReducer from "./cafeSlice";
import employeeSlice from "./employeeSlice";
// ...

export const store = configureStore({
  reducer: {
    cafe: cafeReducer,
    employee: employeeSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
