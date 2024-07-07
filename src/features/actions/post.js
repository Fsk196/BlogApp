// export const SET_POSTS = "SET_POSTS";
// export const ADD_POSTS = "ADD_POSTS";

// export const setPosts = (posts) => ({
//   type: SET_POSTS,
//   payload: posts,
// });

// export const addPosts = (posts) => ({
//   type: ADD_POSTS,
//   payload: posts,
// });

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    },
  },
});

export const { setPosts, addPosts } = postsSlice.actions;
export default postsSlice.reducer;
