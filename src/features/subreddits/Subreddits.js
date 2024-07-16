import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSubreddits, loadSubreddits, reset } from "./subredditsSlice";
import { Subreddit } from "../../components/Subreddit/Subreddit";
import { SubredditSkeleton } from "../../components/Skeletons/SubredditSkeleton/Subreddit";
import { Button } from "@mui/material";
import classes from "./Subreddits.module.css";

export const Subreddits = () => {
  const [showAll, setShowAll] = useState(false);
  const [itemsShown, setItemsShown] = useState(8);
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);

  const handleClick = () => {
    setShowAll(!showAll);
    !showAll ? setItemsShown(25) : setItemsShown(8);
  };

  const showAllSubreddits = !showAll
    ? subreddits
        .slice(0, itemsShown - 1)
        .map((subreddit, i) => <Subreddit key={i} subreddit={subreddit} />)
    : subreddits.map((subreddit) => <Subreddit subreddit={subreddit} />);

  useEffect(() => {
    dispatch(reset());
    dispatch(loadSubreddits());
  }, [dispatch]);

  return (
    <div className={classes.Subreddits}>
      <p className={classes.header}>POPULAR SUBREDDITS</p>
      {subreddits.length === 0
        ? Array(8)
            .fill(0)
            .map((el, i) => <SubredditSkeleton key={i} />)
        : showAllSubreddits}
      <Button onClick={handleClick} variant="outlined" color="secondary">
        All Subreddits
      </Button>
    </div>
  );
};