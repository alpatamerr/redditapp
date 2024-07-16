import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { format } from 'timeago.js';
import Comment from '../../components/Comment/Comment';
import CommentsSkeleton from '../../components/Skeletons/CommentsSkeleton/CommentsSkeleton';
import { loadCommentsForPostId, selectComments, isLoadingComments } from '../../features/comments/commentsSlice';
import { selectPost, loadPost } from '../../features/post/postSlice';

const useStyles = makeStyles({
  post: {
    padding: '10px',
  },
});

const Post = () => {
  const classes = useStyles();
  const { reddit, id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(selectPost);
  const comments = useSelector(selectComments);
  const loadingComments = useSelector(isLoadingComments);

  useEffect(() => {
    console.log("Params:", reddit, id);
    if (id && reddit) {
      dispatch(loadCommentsForPostId({ reddit, id }));
      dispatch(loadPost({ reddit, id }));
    }
  }, [dispatch, reddit, id]);

  return (
    <Card className={classes.post}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {post?.title || "Post Title"}
        </Typography>
        <Typography color="textSecondary">
          {format(post?.created_utc * 1000) || "just now"}
        </Typography>
        <ReactMarkdown>
          {post?.selftext || `# Markdown content`}
        </ReactMarkdown>
        <Link to="/">Back to home</Link>
        {loadingComments ? (
          <CommentsSkeleton />
        ) : (
          comments?.map((comment) => (
            <Comment key={comment.data.id} comment={comment.data} />
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default Post;
