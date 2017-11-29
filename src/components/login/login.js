import React, { Component } from "react";
import NewUser from "../newUser/newUser";
import {
  Button,
  Modal,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModal: false,
      signUpModal: false,
      username: "",
      password: ""
    };
  }
  loginToggle = () => this.setState({ loginModal: !this.state.loginModal });
  signUpToggle = () => this.setState({ signUpModal: !this.state.signUpModal });

  render() {
    return (
      <div>
        <h4> Hey DJ </h4>
        <p>
          {" "}
          Login or create and account to create your own music collections and
          playlists{" "}
        </p>
        <Button
          onClick={this.loginToggle}
          bsStyle="primary"
          bsSize="large"
          block
        >
          Login
        </Button>

        <Modal bsSize="small" show={this.state.loginModal}>
          <Modal.Body>
            <form>
              <FormGroup>
                <ControlLabel>Username</ControlLabel>
                <FormControl
                  type="text"
                  onChange={e => this.setState({ username: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="password"
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </FormGroup>
              <Button
                bsStyle="primary"
                onClick={e => {
                  this.validateLogin({
                    username: this.state.username,
                    password: this.state.password
                  });
                }}
              >
                Login
              </Button>{" "}
              <Button
                onClick={e => {
                  e.preventDefault();
                  this.signUpToggle();
                }}
              >
                Sign Up!
              </Button>
            </form>
            {this.state.signUpModal ? (
              <NewUser signUpToggle={this.signUpToggle.bind(this)} />
            ) : (
              ""
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.loginToggle}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Login;
