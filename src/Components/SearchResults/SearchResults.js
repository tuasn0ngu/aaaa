import React from "react";
import "./SearchResult.css";
import TrackList from "../TrackList/TrackList";

const SearchResults = ({ SearchResults, onAdd }) => {
  return (
    <div className="SearchResults">
      <h2>Results</h2> <TrackList tracks={SearchResults} onAdd={onAdd} />{" "}
    </div>
  );
};

export default SearchResults;
