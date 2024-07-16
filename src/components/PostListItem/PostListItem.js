import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { Avatar } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Button from "@material-ui/core/Button";
import { Helpers } from "../../helpers/helpers";
import { format } from "timeago.js";
import ReactMarkdown from "react-markdown";
import classes from "./PostListItem.module.css";

export const PostListItem = ({ post }) => {
  const [show, setShow] = useState(false);
  const postData = post ? post.data : null;
  const video = Helpers.getVideo(postData);
  const voteCount = Helpers.kFormatter(postData.ups);
  const author = postData.author;
  const overCount = postData.selftext.length >= 100;
  const getText = show
    ? Helpers.getSelfText(postData)
    : Helpers.getSelfText(postData).substring(0, 200);
  const selfText = show ? (
    <ReactMarkdown
      className={classes.selfText}
      aria-label="markdown"
      source={getText}
    />
  ) : (
    <ReactMarkdown
      className={classes.selfText}
      aria-label="markdown"
      source={getText}
    />
  );

  const validLinkCheckForThumbnail = post
    ? Helpers.imageFile(postData.thumbnail)
    : null;

  const validLinkCheckForContentImg = post
    ? Helpers.imageFile(postData.url)
    : null;

  const hasThumbnail = post ? (
    validLinkCheckForThumbnail ? (
      <Avatar alt={postData.subreddit} src={postData.thumbnail} />
    ) : (
      <Avatar>{postData.subreddit.substring(0, 1)}</Avatar>
    )
  ) : null;

  const hasContentImg = post ? (
    validLinkCheckForContentImg ? (
      <Link to={`/post/${postData.subreddit}/comments/${postData.id}#top`}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={postData.subreddit}
              height="140"
              className={classes.cardMedia}
              image={postData.url}
            ></CardMedia>
          </CardActionArea>
        </Card>
      </Link>
    ) : postData.url_overridden_by_dest ? (
      <a
        href={postData.url_overridden_by_dest}
        alt={postData.title}
        target="_blank"
        rel="noreferrer"
        className={classes.contentLink}
      >
        External Link
      </a>
    ) : null
  ) : null;

  return (
    <div className={classes.PostListItem}>
      <div className={classes.header}>
        {hasThumbnail}
        <div className={classes.headerContent}>
          <Link to={`/subreddit/${postData.subreddit}#top`}>
            <p className={classes.subredditName}>
              {postData.subreddit_name_prefixed}
            </p>
          </Link>
          <Link to={`/user/${author}#top`}>
            <p className={classes.author}>Posted by u/{author}</p>
          </Link>
        </div>
      </div>
      <div className={classes.mainContent}>
        <div className={classes.wrapper}>
          <Link
            className={classes.postTitle}
            to={`/post/${postData.subreddit}/comments/${postData.id}#top`}
          >
            <h3>{Helpers.ampersandConverter(postData.title)}</h3>
          </Link>
          {selfText}
          <div className={classes.Btn}>
            {postData.selftext.length ? (
              show ? (
                <Button
                  className={classes.showBtn}
                  onClick={() => setShow(false)}
                  variant="contained"
                  color="primary"
                >
                  Close X
                </Button>
              ) : overCount ? (
                <Button
                  className={classes.showBtn}
                  onClick={() => setShow(true)}
                  variant="contained"
                  color="primary"
                >
                  See Full Post
                </Button>
              ) : null
            ) : null}
          </div>
        </div>
        {video ? (
          <CardMedia
            component="video"
            type="video/mp4"
            alt={postData.subreddit}
            height="140"
            className={classes.cardMedia}
            src={video}
            autoPlay
            controls
            loop
            muted
          ></CardMedia>
        ) : hasContentImg ? (
          <div className={classes.contentImg}>{hasContentImg}</div>
        ) : null}
      </div>
      <div className={classes.footer}>
        <div className={classes.ups}>
          <FavoriteBorderIcon />
          <p>{voteCount}</p>
        </div>
        <div className={classes.comment}>
          <Link
            to={`/post/${postData.subreddit}/comments/${postData.id}#comments`}
            className={classes.commentBtn}
            title="click here to see comments"
          >
            <CommentIcon />
            <p>Comments</p>
          </Link>
          <p className={classes.timeCreated}>
            {format(postData.created_utc * 1000)}
          </p>
        </div>
      </div>
    </div>
  );
};