import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { HashLink as HLink } from "react-router-hash-link";
import { useSelector, useDispatch } from "react-redux";
import {
  loadCommentsForPostId,
  selectComments,
  isLoadingComments,
} from "../../features/comments/commentsSlice";
import {
  selectPost,
  isLoadingPost,
  loadPost,
} from "../../features/post/postSlice";
import { Comment } from "../../components/Comment/Comment";
import { Helpers } from "../../helpers/helpers";
import { Subreddits } from "../../features/subreddits/Subreddits";
import { Navbar } from "../../components/Navbar/Navbar";
import { PostSkeleton } from "../../components/Skeletons/PostSkeleton/Post";
import { CommentsSkeleton } from "../../components/Skeletons/CommentsSkeleton/CommentsSkeleton";
import { format } from "timeago.js";
import ReactMarkdown from "react-markdown";
import classes from "./post.module.css";

export const Post = () => {
  let { reddit, id } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  const post = useSelector(selectPost);
  const loadingComments = useSelector(isLoadingComments);
  const loadingPost = useSelector(isLoadingPost);

  useEffect(() => {
    dispatch(loadPost({ reddit, id }));
    dispatch(loadCommentsForPostId({ reddit, id }));
  }, [dispatch, reddit, id]);

  const image = Helpers.getImage(post);
  const selfText = <ReactMarkdown source={Helpers.getSelfText(post)} />;
  const video = !loadingPost && Helpers.getVideo(post);
  const url = post.url;

  return (
    <>
      <Navbar id="top" />
      <main>
        <Container className={classes.postContainer}>
          {/* Post */}
          <div className={classes.PostContainer}>
            <div className={classes.Post}>
              {loadingPost ? (
                <PostSkeleton />
              ) : video ? (
                <>
                  <div className={classes.header}>
                    <HLink to={`/user/${post.author}`}>
                      <p className={classes.headerAuthor}>{post.author}</p>
                    </HLink>
                    <p className={classes.headerTime}>
                      {format(post.created_utc * 1000)}
                    </p>
                  </div>
                  <div className={classes.title}>
                    <h2>{Helpers.ampersandConverter(post.title)}</h2>
                    <hr />
                  </div>
                  <div className={classes.video}>
                    <video src={video} controls autoPlay>
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </>
              ) : image ? (
                <>
                  <div className={classes.header}>
                    <HLink to={`/user/${post.author}`}>
                      <p className={classes.headerAuthor}>{post.author}</p>
                    </HLink>
                    <p className={classes.headerTime}>
                      {format(post.created_utc * 1000)}
                    </p>
                    <Link to={`/subreddit/${post.subreddit}`}>
                      <p className={classes.headerTopic}>
                        {post.subreddit_name_prefixed}
                      </p>
                    </Link>
                  </div>
                  <div className={classes.title}>
                    <h2>{Helpers.ampersandConverter(post.title)}</h2>
                    <hr />
                  </div>
                  <div className={classes.postImgContainer}>
                    <img
                      className={classes.postImg}
                      src={image}
                      alt={post.title}
                    />
                  </div>
                  <a href={url} target="_blank" rel="noreferrer">
                    Click here to follow link
                  </a>
                </>
              ) : (
                <>
                  <div className={classes.header}>
                    <HLink to={`/user/${post.author}`}>
                      <p className={classes.headerAuthor}>{post.author}</p>
                    </HLink>
                    <p className={classes.headerTime}>
                      {format(post.created_utc * 1000)}
                    </p>
                  </div>
                  <div className={classes.title}>
                    <h2>{post.title}</h2>
                    <hr />
                  </div>
                  <a href={url} target="_blank" rel="noreferrer">
                    Click here to follow link
                  </a>
                </>
              )}
              <div className={classes.selfText}>{selfText}</div>

              {/* Comments */}
              <div className={classes.Comments}>
                <h3 id="comments">Comments</h3>
                {!loadingComments
                  ? comments.map((comment, i) => (
                      <Comment key={`${comment}${i}`} comment={comment.data} />
                    ))
                  : Array(5)
                      .fill(0)
                      .map((comment, id) => (
                        <CommentsSkeleton key={`${comment}${id}`} />
                      ))}
              </div>
            </div>
            <aside>
              <Subreddits />
            </aside>
          </div>
        </Container>
      </main>
    </>
  );
};