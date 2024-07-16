import React from "react";
import { Helpers } from "../../helpers/helpers";
import classes from "./About.module.css";

export const About = ({
  name,
  cake_day,
  karma,
  userImg,
  bannerImg,
  title,
  subCount,
  active,
}) => {
  let creationDay = Helpers.getDate(cake_day);

  return (
    <div className={classes.About}>
      <div className={classes.header}>
        {bannerImg ? (
          <img
            className={classes.banner}
            src={bannerImg}
            alt={`${name} banner`}
          />
        ) : (
          <div className={classes.banner} style={{ height: "100px" }}></div>
        )}
        {userImg ? (
          <img
            className={classes.profilePic}
            src={userImg}
            alt={`${name} profile pic`}
          />
        ) : null}
      </div>
      <p className={classes.aboutHeader}>About {name}</p>
      <hr />
      <div className={classes.info}>
        <p>{title}</p>
        <div className={classes.additionalInfo}>
          {karma && cake_day ? (
            <>
              <div className={classes.karma}>
                <h3>Karma</h3>
                <p style={{ textAlign: "center" }}>
                  {Helpers.kFormatter(karma)}
                </p>
              </div>
              <div className={classes.cake_day}>
                <h3>Cake Day</h3>
                <p
                  style={{ textAlign: "center" }}
                >{`${creationDay.month} ${creationDay.day}, ${creationDay.year}`}</p>
              </div>
            </>
          ) : (
            <>
              <div className={classes.karma}>
                <h3>Members</h3>
                <p style={{ textAlign: "center" }}>
                  {Helpers.kFormatter(subCount)}
                </p>
              </div>
              <div className={classes.cake_day}>
                <h3>Online</h3>
                <p style={{ textAlign: "center" }}>
                  {Helpers.kFormatter(active)}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};