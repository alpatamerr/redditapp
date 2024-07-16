import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import fetch from "cross-fetch";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import classes from "./Searchbar.module.css";
import { Helpers } from "../../../helpers/helpers";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      padding: "3.5px 3px",
      "&:hover fieldset": {
        borderColor: "red",
      },
      "&.Mui-focused fieldset": {
        borderColor: "red",
      },
    },
    backgroundColor: "white",
    borderRadius: "4px",
    width: "100%",
  },
})(TextField);

export const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;
    (async () => {
      const response = await fetch(
        `https://www.reddit.com/api/subreddit_autocomplete.json?query=${searchTerm}`
      );
      await sleep(1000); // 1 second delay
      const data = await response.json();
      if (active) {
        setOptions(data.subreddits.map((r) => r));
      }
    })();
    return () => {
      active = false;
    };
  }, [loading, searchTerm]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Autocomplete
      style={{ maxWidth: "600px" }}
      disableClearable={false}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      loadingText="Searching, one sec..."
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <CssTextField
          {...params}
          style={{ padding: "0" }}
          onChange={handleChange}
          placeholder="Search..."
          value={searchTerm}
          aria-label="Search field"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            type: "search",
            startAdornment: <SearchIcon />,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
              </>
            ),
          }}
        />
      )}
      renderOption={(option, { inputValue }) => {
        const matches = match(option.name, inputValue);
        const parts = parse(option.name, matches);
        const redditSubs = option.numSubscribers;
        return (
          <Link to={`/subreddit/${option.name}`}>
            {parts.map((part, index) => (
              <span
                key={index}
                className={classes.searchLinks}
                style={{
                  fontWeight: part.highlight ? 700 : 400,
                  fontSize: "1.13rem",
                  color: "black",
                }}
              >
                {part.text}
              </span>
            ))}
            <p style={{ fontSize: ".85rem" }}>
              {Helpers.kFormatter(redditSubs)} members
            </p>
          </Link>
        );
      }}
    />
  );
};
