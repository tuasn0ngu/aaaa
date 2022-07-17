import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ search }) => {
  const [term, setTerm] = useState("");

  return (
    <div className="SearchBar">
      <input
        placeholder="Enter Song, album or artist"
        onChange={(e) => setTerm(e.target.value)}
        onKeyUp={term}
      ></input>
      <button className="SearchButton" onClick={search}>
        {" "}
        Search{" "}
      </button>
    </div>
  );
};

export default SearchBar;
