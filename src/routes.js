import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Subreddit } from "./pages/subreddit/subreddit";
import { Home } from "./pages/home/home";
import Post from "./pages/post/post";
import { User } from "./pages/user/user";
import NotFound from "./pages/notFound/notFound";

const appRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/filter/:filterTopic",
    element: <Home />,
  },
  {
    path: "/subreddit/:reddit",
    element: <Subreddit />,
  },
  {
    path: "/post/:reddit/comments/:id",
    element: <Post />,
  },
  {
    path: "/user/:user",
    element: <User />,
  },
];

export const RoutesComponent = () => {
  return (
    <HashRouter>
      <Routes>
        {appRoutes.map(({ path, element }, i) => (
          <Route path={path} element={element} key={`${path}=${i}`} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};
