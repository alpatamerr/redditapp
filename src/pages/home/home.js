import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Posts } from "../../features/posts/Posts";
import { Subreddits } from "../../features/subreddits/Subreddits";
import { Container } from "@mui/material";
import { Filter } from "../../components/Filter/Filter";
import classes from "./home.module.css";

// Landing Page of Reddit Minimal
export const Home = () => {
  return (
    <div className={classes.App}>
      <header className="App-header">
        <Navbar />
      </header>
      <Container className={classes.mainContainer}>
        <main>
          <Container className={classes.subredditContainer}>
            <Filter />
            <Posts />
          </Container>
          <aside className={classes.subreddits}>
            <Subreddits />
          </aside>
        </main>
      </Container>
    </div>
  );
};