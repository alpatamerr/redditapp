import { Skeleton } from "@material-ui/lab";
import classes from "./CommentsSkeleton.module.css";

export const CommentsSkeleton = () => {
  return (
    <div className={classes.CommentsSkeleton}>
      <div className={classes.headerSkeleton}>
        <Skeleton animation="wave" variant="text" width={80} />
      </div>
      <Skeleton
        animation="wave"
        variant="rect"
        width={380}
        className={classes.paragraphSkeleton}
      />
      <Skeleton
        className={classes.footerSkeleton}
        animation="wave"
        variant="text"
        width={50}
      />
    </div>
  );
};