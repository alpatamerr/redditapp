import React from "react";
import { Link } from "react-router-dom";
import { Searchbar } from "./Searchbar/Searchbar.js";
import { Container } from "@mui/material";
import RedditIcon from '@mui/icons-material/Reddit';
import classes from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <header id="top">
      <div className={classes.Navbar}>
        <div className={classes.NavbarContent}>
          <Link className={classes.logo} to="/">
            <RedditIcon className={classes.redditLogo} />
            <h2>
              Reddit <span>Minimal</span>
            </h2>
          </Link>
          <Container maxWidth="md">
            <Searchbar />
          </Container>
        </div>
      </div>
    </header>
  );
};
