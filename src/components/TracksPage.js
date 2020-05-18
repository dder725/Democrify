import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getPlaylistTracks,
  createPlaylistSession,
} from "../redux/actions/thunk";
import Tracks from "./Tracks";
import { Link } from "react-router-dom";
import SearchPage from "./SearchPage";
import { Button } from "reactstrap";
import "./TrackPage.css";

class TracksPage extends Component {
  constructor() {
    super();
    this.state = {
      searchShowing: false,
      refreshList: false,
      removedSong: false,
      isOwnedByTheUser: false,
    };
    this.toggleSearch = this.toggleSearch.bind(this);
    this.createSession = this.createSession.bind(this);
    this.refreshTracklist = this.refreshTracklist.bind(this);
  }

  createSession() {
    this.props.createPlaylistSession(
      this.props.activePlaylist.id,
      this.props.userID
    );
  }

  checkIfOwned(){
    if(this.props.playlistOwnerID === this.props.userID ){
        this.setState({
            isOwnedByTheUser: true
        })
    }
}
  toggleSearch() {
    this.setState({ searchShowing: !this.state.searchShowing });
    if (this.state.searchShowing) {
      this.componentDidMount();
    }
  }

  refreshTracklist() {
    this.props.getPlaylistTracks(this.props.playlistId);
  }

  componentDidMount() {
    this.props.getPlaylistTracks(this.props.playlistId);
    this.checkIfOwned();
  }

  render() {
    return (
      <div>
        <button onClick={this.createSession}>Create Session!</button>
        <Link to="/playlists">Back we go bois</Link>
        <div className="stickyContainer">
          <h1 className="playlistTitle">{this.props.activePlaylist.name}</h1>
          <Button
            className="addButton"
            style={{ backgroundColor: "#c030ed", borderColor: "#c030ed" }}
            onClick={this.toggleSearch}
          >
            {this.state.searchShowing ? "Back" : "Add track"}
          </Button>
        </div>
        {this.state.searchShowing ? (
          <SearchPage />
        ) : (
          <Tracks
            col1Name="Name"
            col2Name="Artist"
            refreshTracklist={this.refrseshTracklist}
            isOwnedByTheUser={this.state.isOwnedByTheUser}
          />
        )}
      </div>
    );
  }
}
//State is entire state tree
function mapStateToProps(state) {
  return {
    activePlaylist: state.playlists.active_playlist,
    playlistOwnerID: state.playlists.active_playlist.owner.id,
    playlistId: window.location.pathname.split("/").pop(), //Grab playlist ID from URL
    deviceId: state.webplayer.deviceId,
    userID: state.user.data.id,
  };
}

const mapDispatchToProps = {
  getPlaylistTracks,
  createPlaylistSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(TracksPage);
