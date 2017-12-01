import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
  PageHeader,
  Grid,
  Row,
  Col,
  Table
} from "react-bootstrap";
import { delete_cookie } from "sfcookies";

class userProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch("/getUser/" + this.props.userId)
      .then(response => response.json())
      .then(response => console.log(response));
  }

  deleteProfile = () => {
    fetch("/delete/" + this.props.userId, {
      method: "DELETE"
    }).then(() => {
      delete_cookie("userKey");
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <div>
        user profile page <button onClick={this.deleteProfile}> Delete </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.userId
});

export default connect(mapStateToProps)(userProfile);
