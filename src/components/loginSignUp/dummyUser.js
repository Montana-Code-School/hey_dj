import React, { Component } from "react";
import { connect } from "react-redux";

class Dummy extends Component {
  render() {
    return <div>dummy component for {this.props.username}</div>;
  }
}

const mapStateToProps = state => ({
  username: state.username
});

export default connect(mapStateToProps)(Dummy);
