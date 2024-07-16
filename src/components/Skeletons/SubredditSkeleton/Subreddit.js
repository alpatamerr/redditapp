import { Skeleton } from "@mui/material";
import classes from "./Subreddit.module.css";

export const SubredditSkeleton = () => {
  return (
    <div className={classes.SubredditSkeleton}>
      <Skeleton animation="wave" variant="circle" width={40} height={40} />
      <div className={classes.subContent}>
        <Skeleton
          style={{ marginLeft: "8px" }}
          animation="wave"
          variant="text"
          width={80}
        />
        <Skeleton
          style={{ marginLeft: "8px" }}
          animation="wave"
          variant="text"
          width={120}
        />
      </div>
    </div>
  );
};