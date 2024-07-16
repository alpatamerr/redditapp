import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadPosts, selectAllPosts, isLoading } from "./postsSlice";
import { PostListItem } from "../../components/PostListItem/PostListItem";
import { PostListItemSkeleton } from "../../components/Skeletons/PostListItemSkeleton/PostListItem";
import classes from "./Posts.module.css";

export const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const loading = useSelector(isLoading);
  const { filterTopic } = useParams();

  useEffect(() => {
    dispatch(loadPosts(filterTopic));
  }, [dispatch, filterTopic]);

  return (
    <section className={classes.Posts}>
      {loading
        ? Array(5)
            .fill(0)
            .map((skeleton, key) => (
              <div key={key} style={{ marginBottom: "20px" }}>
                <PostListItemSkeleton />
              </div>
            ))
        : posts.map((post, key) => (
            <PostListItem key={post.data.id} post={post} loading={loading} />
          ))}
    </section>
  );
};