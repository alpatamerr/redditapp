import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSubredditPosts,
  loadPostsBySubreddit,
  isLoadingSubredditPosts,
  selectSubredditsAbouts,
  loadAboutDetailsBySubreddit,
  reset,
} from "../../features/subreddit/subredditSlice";
import { PostListItem } from "../../components/PostListItem/PostListItem";
import { Navbar } from "../../components/Navbar/Navbar";
import { Subreddits } from "../../features/subreddits/Subreddits";
import { PostListItemSkeleton } from "../../components/Skeletons/PostListItemSkeleton/PostListItem";
import { SubredditHeader } from "../../components/SubredditHeader/SubredditHeader";
import { About } from "../../components/About/About";
import { Helpers } from "../../helpers/helpers";
import classes from "./subreddit.module.css";

export const Subreddit = () => {
  const dispatch = useDispatch();
  const subredditPosts = useSelector(selectSubredditPosts);
  const loadingSubredditPosts = useSelector(isLoadingSubredditPosts);
  const subredditAbout = useSelector(selectSubredditsAbouts);

  const { reddit } = useParams();

  useEffect(() => {
    dispatch(reset());
    dispatch(loadPostsBySubreddit(reddit));
    dispatch(loadAboutDetailsBySubreddit(reddit));
  }, [dispatch, reddit]);

  const bannerBackground = Helpers.ampersandConverter(
    subredditAbout.banner_img
      ? subredditAbout.banner_img
      : subredditAbout.banner_background_image
  );

  const headerImg = Helpers.ampersandConverter(subredditAbout.header_img);
  const backColor = subredditAbout.key_color;
  const iconImg = subredditAbout.icon_img;
  const redditTitle = subredditAbout.title;

  //get info to pass to About component
  const name = subredditAbout.display_name_prefixed;
  const description = subredditAbout.public_description;
  const activeCount = subredditAbout.accounts_active;
  const createdDate = subredditAbout.created_utc;
  const subCount = subredditAbout.subscribers;

  const showSubredditsByName = subredditPosts.map((subredditPost, i) => (
    <PostListItem key={i} post={subredditPost} />
  ));

  return (
    <>
      <Navbar />
      <SubredditHeader
        title={redditTitle}
        icon={iconImg}
        img={bannerBackground || headerImg}
        backColor={backColor}
        reddit={reddit}
      />
      <Container>
        <main className={classes.Subreddit}>
          <aside>
            <About
              name={name}
              title={description}
              created={createdDate}
              subCount={subCount}
              active={activeCount}
            />
            <Subreddits />
          </aside>
          <div className={classes.post}>
            {loadingSubredditPosts
              ? Array(8)
                  .fill(0)
                  .map((el, i) => (
                    <div key={i} className={classes.skeleton}>
                      <PostListItemSkeleton />
                    </div>
                  ))
              : showSubredditsByName}
          </div>
        </main>
      </Container>
    </>
  );
};