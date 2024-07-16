import { Skeleton } from "@material-ui/lab";
import classes from "./Post.module.css";

export const PostSkeleton = () => {
  return (
    <div className={classes.PostSkeleton}>
      <Skeleton
        style={{ marginLeft: "8px" }}
        animation="wave"
        variant="text"
        width={250}
        height={25}
      />
      <Skeleton
        style={{ marginLeft: "8px" }}
        animation="wave"
        variant="text"
        width={765}
        height={50}
      />
      <Skeleton
        style={{ marginLeft: "8px" }}
        animation="wave"
        variant="text"
        width={765}
        height={50}
      />
      <Skeleton
        style={{ marginLeft: "8px" }}
        animation="wave"
        variant="rect"
        height={800}
      />
    </div>
  );
};