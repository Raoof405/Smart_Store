import { configureStore } from "@reduxjs/toolkit";
import { BrandReducer } from "@/features/brands/brands.reducer";
import PartSlice from "@/features/products/parts.reducer";
export const store = configureStore({
  reducer: {
    brand: BrandReducer,
    part: PartSlice,
  },
});

type x = { name: string; phone: number };
type y = { username: string; mobile: number };

type z = x & y;

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
