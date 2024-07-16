// src/pages/post/Comments.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { format } from 'timeago.js';
import CommentsSkeleton from '../../components/Skeletons/CommentsSkeleton/CommentsSkeleton';
import { loadCommentsForPostId, selectComments, isLoadingComments } from '../../features/comments/commentsSlice';

const useStyles = makeStyles({
  comment: {
    padding: '10px',
    marginBottom: '10px',
  },
});

const Comments = ({ reddit, postId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  const loadingComments = useSelector(isLoadingComments);

  useEffect(() => {
    console.log('Dispatching loadCommentsForPostId action');
    dispatch(loadCommentsForPostId({ reddit, id: postId }));
  }, [dispatch, reddit, postId]);

  if (loadingComments) {
    return <CommentsSkeleton />;
  }

  return (
    <div>
      {comments.map((comment) => (
        <Card className={classes.comment} key={comment.data.id}>
          <CardContent>
            <Typography variant="h6" component="h3">
              {comment.data.author}
            </Typography>
            <Typography color="textSecondary">
              {format(comment.data.created_utc * 1000)}
            </Typography>
            <ReactMarkdown>
              {comment.data.body}
            </ReactMarkdown>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Comments;
