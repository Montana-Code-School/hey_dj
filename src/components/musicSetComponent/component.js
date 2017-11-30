import React, { Component } from "react";
import {
  editMusicSetCustomFields,
  editMusicSetCustomFieldValue,
  loadMusicSetFromSpotify
} from "../../actions/musicSetActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class MusicSetComponent extends Component {
  render() {
    return <div>Music Sets</div>;
  }
}

const mapStateToProps = state => ({
  musicSet: {
    customValues: state.customValues
  },
  spotifyPlaylists: state.spotifyPlaylists
});

const mapDispatchToProps = dispatch => ({
  emscf: () => dispatch(editMusicSetCustomFields()),
  emscfv: () => dispatch(editMusicSetCustomFieldValue()),
  lmsfs: () => dispatch(loadMusicSetFromSpotify())
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicSetComponent);
