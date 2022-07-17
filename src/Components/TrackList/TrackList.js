import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

const TrackList = (props) => {
  return (
    <div className="TrackList">
      {this.props.tracks.map((track) => {
        return (
          <Track
            track={track}
            key={track.id}
            onAdd={props.onAdd}
            isRemoval={props.isRemoval}
            onRemove={props.noRemove}
          />
        );
      })}{" "}
    </div>
  );
};

export default TrackList;
