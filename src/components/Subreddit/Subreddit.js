import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import { Avatar } from "@material-ui/core";
import { Helpers } from "../../helpers/helpers";
import classes from "./Subreddit.module.css";

export const Subreddit = ({ subreddit }) => {
  const subredditTopic = subreddit.data.display_name_prefixed;
  const subs = Helpers.kFormatter(subreddit.data.subscribers);
  const hasIcon =
    subreddit.data.community_icon.length !== 0 || subreddit.data.icon_img;

  const iconLink = hasIcon
    ? Helpers.ampersandConverter(subreddit.data.icon_img)
    : null;

  const displayIcon = hasIcon ? (
    <Avatar
      className={classes.icon}
      src={iconLink}
      alt={subreddit.data.display_name}
    />
  ) : (
    <Avatar alt={subreddit.data.display_name}>
      {subreddit.data.display_name_prefixed.substring(2, 3)}
    </Avatar>
  );

  return (
    <Link to={`/subreddit/${subreddit.data.display_name}#top`}>
      <div className={classes.Subreddit}>
        {displayIcon}
        <div className={classes.subInfo}>
          <p className={classes.topic}>{subredditTopic}</p>
          <p className={classes.subs}>{subs} subscribers</p>
        </div>
      </div>
    </Link>
  );
};