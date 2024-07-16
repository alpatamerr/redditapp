import React from "react";
import classes from "./Comment.module.css";
import { format } from "timeago.js";
import { HashLink as Link } from "react-router-hash-link";
import { Helpers } from "../../helpers/helpers";
import PublishIcon from '@mui/icons-material/Publish';
import ReactMarkdown from "react-markdown";

export const Comment = ({ comment }) => {
  const commentAuthor = comment.author;
  const timeCreated = format(comment.created_utc * 1000);
  const upvotes = comment.ups;
  const commentBody = <ReactMarkdown source={comment.body}></ReactMarkdown>;

  return (
    <div className={classes.Comment}>
      <div className={classes.header}>
        <Link to={`/user/${commentAuthor}#top`}>
          <p className={classes.author}>{commentAuthor}</p>
        </Link>
        <p className={classes.timeCreated}>{timeCreated}</p>
      </div>
      <p className={classes.selfText}>{commentBody}</p>
      <div className={classes.footer}>
        <PublishIcon />
        <p className={classes.upvotes}>{Helpers.kFormatter(upvotes)} UPVOTES</p>
      </div>
    </div>
  );
};