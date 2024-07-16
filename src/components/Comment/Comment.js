import React from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { format } from 'timeago.js';

const useStyles = makeStyles({
  comment: {
    padding: '10px',
    marginBottom: '10px',
  },
});

const Comment = ({ comment }) => {
  const classes = useStyles();
  return (
    <Card className={classes.comment}>
      <CardContent>
        <Typography variant="body2" component="p">
          {comment.author} - {format(comment.created_utc * 1000)}
        </Typography>
        <ReactMarkdown>{comment.body}</ReactMarkdown>
      </CardContent>
    </Card>
  );
};

export default Comment;
