import { configureStore } from "@reduxjs/toolkit";
import { commentsSlice } from "./features/comments/commentsSlice";
import { postsSlice } from "./features/posts/postsSlice";
import { subredditsSlice } from "./features/subreddits/subredditsSlice";
import { postSlice } from "./features/post/postSlice";
import { subredditSlice } from "./features/subreddit/subredditSlice";
import { userSlice } from "./features/user/userSlice";

export default configureStore({
  reducer: {
    post: postSlice.reducer,
    posts: postsSlice.reducer,
    subreddit: subredditSlice.reducer,
    subreddits: subredditsSlice.reducer,
    comments: commentsSlice.reducer,
    user: userSlice.reducer,
  },
});