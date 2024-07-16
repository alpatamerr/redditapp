import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Subreddit } from "./pages/subreddit/subreddit";
import { Home } from "./pages/home/home";
import { Post } from "./pages/post/post";
import { User } from "./pages/user/user";
import NotFound from "./pages/notFound/notFound";

const appRoutes = [
  {
    path: "/",
    page: Home,
  },
  {
    path: "/filter/:filterTopic",
    page: Home,
  },
  {
    path: "/subreddit/:reddit",
    page: Subreddit,
  },

  {
    path: "/post/:reddit/comments/:id",
    page: Post,
  },
  {
    path: "/user/:user",
    page: User,
  },
];

export const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        {appRoutes.map(({ path, page }, i) => (
          <Route path={path} component={page} exact key={`${path}=${i}`} />
        ))}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </HashRouter>
  );
};