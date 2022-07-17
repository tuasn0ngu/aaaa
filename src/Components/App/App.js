import React from "react";
import "./App.css";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SeachBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from "../Util/Spotify";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      SearchResults: [],
      playlistname: "New Playlist",
      playlisttracks: [],
    };

    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.removeTrackSearch = this.removeTrackSearch.bind(this);
    this.doThese = this.doThese.bind(this);
  }

  search(term) {
    Spotify.search(term).then((SearchResults) => {
      this.setState({ SearchResults: SearchResults });
    });
  }

  addTrack(track) {
    let tracks = this.state.playlisttracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }

    track.push(track);
    this.setState({ playlisttracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlisttracks;
    let trackSearch = this.state.SearchResults;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    trackSearch.unshift(track);
    this.setState({ playlisttracks: tracks });
  }

  removeTrackSearch(track) {
    let tracks = this.state.SearchResults;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    this.setState({ SearchResults: tracks });
  }

  doThese(track) {
    this.addTrack(track);
    this.removeTrackSearch(track);
  }

  updatePlayListName(name) {
    this.setState({ updatePlayListName: name });
  }

  savePlaylist() {
    const trackUris = this.state.playlisttracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistname, trackUris).then(() => {
      this.setState({
        updatePlayListName: "New Playlist",
        playlisttracks: [],
      });
    });
  }
  render() {
    return (
      <div>
        <h1>
          <a href="http://localhost:3000">Musicophile</a>
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              SearchResults={this.state.searchResults}
              onAdd={this.doThese}
            />
            <Playlist
              playlisttracks={this.state.playlisttracks}
              onNameChange={this.updatePlayListName}
              onRemove={this.removeTrack}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}
