import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./features/comments/commentsSlice";
import postsReducer from "./features/posts/postsSlice";
import subredditsReducer from "./features/subreddits/subredditsSlice";
import postReducer from "./features/post/postSlice";
import subredditReducer from "./features/subreddit/subredditSlice";
import userReducer from "./features/user/userSlice";

export default configureStore({
  reducer: {
    post: postReducer,
    posts: postsReducer,
    subreddit: subredditReducer,
    subreddits: subredditsReducer,
    comments: commentsReducer,
    user: userReducer,
  },
});
