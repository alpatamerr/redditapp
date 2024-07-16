import React from "react";
import { Avatar, Container } from "@mui/material";
import classes from "./SubredditHeader.module.css";

export const SubredditHeader = ({ img, backColor, title, icon, reddit }) => {
  const chooseBackColor = backColor ? `${backColor}` : "rgb(140, 140, 140)";
  const headerStyles = {
    background: `url(${img})`,
    height: "125px",
  };

  return (
    <div>
      <figure style={headerStyles}></figure>
      <div className={classes.headerDivide}>
        <Container maxWidth="sm">
          <div className={classes.headerContent}>
            <Avatar
              style={{
                width: "100px",
                height: "100px",
                borderColor: `${chooseBackColor}`,
              }}
              className={classes.avatar}
              src={icon}
              alt={title}
            />
            <div className={classes.reddit}>
              <p className={classes.title}>{title}</p>
              <p className={classes.redditTopic}>{`r/${reddit}`}</p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};