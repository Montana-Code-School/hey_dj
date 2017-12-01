import React, { Component } from "react";
import { connect } from "react-redux";

class userContent extends Component {
  componentDidMount() {
    fetch("/username/" + this.props.userId)
      .then(response => response.json())
      .then(response => console.log(response));
  }

  render() {
    return (
      <div>
        userContent component for {this.props.username} {this.props.userId}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.username,
  userId: state.userId
});

export default connect(mapStateToProps)(userContent);
