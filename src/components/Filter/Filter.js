import React from "react";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import { NavLink } from "react-router-dom";
import classes from "./Filter.module.css";

export const Filter = () => {
  return (
    <div className={classes.Filter}>
      <div className={classes.FilterIcons}>
        <div>
          <NavLink
            className={classes.hot}
            to="/filter/popular"
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            <WhatshotIcon />
            <h3>Popular</h3>
          </NavLink>
        </div>
        <div>
          <NavLink
            className={classes.trending}
            to="/filter/rising"
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            <TrendingUpIcon />
            <h3>Rising</h3>
          </NavLink>
        </div>
        <div>
          <NavLink
            className={classes.top}
            to="/filter/top"
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            <BarChartIcon />
            <h3>Top</h3>
          </NavLink>
        </div>
      </div>
    </div>
  );
};