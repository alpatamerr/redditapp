import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import { format } from 'timeago.js';
import ReactMarkdown from 'react-markdown';
import { loadCommentsForPostId, selectComments, isLoadingComments } from '../../features/comments/commentsSlice';
import CommentsSkeleton from '../../components/Skeletons/CommentsSkeleton/CommentsSkeleton';

const Comments = () => {
  const dispatch = useDispatch();
  const { subreddit, postId } = useParams();
  const comments = useSelector(selectComments);
  const loadingComments = useSelector(isLoadingComments);
  const location = useLocation();
  const post = location.state?.post || {};

  useEffect(() => {
    dispatch(loadCommentsForPostId({ subreddit, postId }));
  }, [dispatch, subreddit, postId]);

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {post.title || 'Loading post title...'}
          </Typography>
          <Typography color="textSecondary">
            {post.created_utc ? format(post.created_utc * 1000) : ''}
          </Typography>
          <ReactMarkdown>
            {post.selftext || 'No content available'}
          </ReactMarkdown>
        </CardContent>
      </Card>
      {loadingComments ? (
        <CommentsSkeleton />
      ) : (
        comments.map((comment) => (
          <Card key={comment.data.id}>
            <CardContent>
              <Typography variant="h6" component="h4">
                {comment.data.author} - {format(comment.data.created_utc * 1000)}
              </Typography>
              <ReactMarkdown>
                {comment.data.body}
              </ReactMarkdown>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Comments;
