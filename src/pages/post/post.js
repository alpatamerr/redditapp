import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { format } from 'timeago.js';
import { loadCommentsForPostId, selectComments, isLoadingComments } from '../../features/comments/commentsSlice';
import CommentsSkeleton from '../../components/Skeletons/CommentsSkeleton/CommentsSkeleton';
import Comment from '../../components/Comment/Comment'; // Import Comment component

const useStyles = makeStyles({
  post: {
    padding: '10px',
  },
});

const Post = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { reddit, id } = useParams();
  const comments = useSelector(selectComments);
  const loadingComments = useSelector(isLoadingComments);

  useEffect(() => {
    dispatch(loadCommentsForPostId({ reddit, id }));
  }, [dispatch, reddit, id]);

  useEffect(() => {
    console.log('Comments:', comments);
  }, [comments]);

  return (
    <Card className={classes.post}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Post Title
        </Typography>
        <Typography color="textSecondary">
          {format(new Date())}
        </Typography>
        <ReactMarkdown>
          {`# Markdown content`}
        </ReactMarkdown>
        <Link to="/">Back to home</Link>
        {loadingComments ? (
          <CommentsSkeleton />
        ) : (
          <div>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Comment key={comment.data.id} comment={comment.data} />
              ))
            ) : (
              <p>No comments available</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Post;
