import React, { Component } from "react";
import {
  Button,
  Modal,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      phonenumber: "",
      password: "",
      email: "",
      passwordConfirm: "",
      showModal: true,
      validPassword: ""
    };
  }

  showModalToggle = () => this.setState({ showModal: !this.state.showModal });

  async createUser() {
    const user = await fetch("/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    });
    if (user.status === 200) {
      alert("Account Created Successfully!!");
    } else alert("Account Creation Failed"); //needs error handling improvement
    //after new account created needs to redirect to another page - maybe user page
  }

  render() {
    return (
      <div>
        <Modal
          bsSize="small"
          show={this.state.showModal}
          onHide={() => {
            this.setState({ showModal: false });
            this.props.signUpToggle();
          }}
        >
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
                <ControlLabel>Email</ControlLabel>

                <FormControl
                  onChange={e => this.setState({ email: e.target.value })}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Phone number</ControlLabel>

                <FormControl
                  onChange={e => this.setState({ phonenumber: e.target.value })}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Password</ControlLabel>

                <FormControl
                  onChange={e => this.setState({ password: e.target.value })}
                  type="password"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Confirm password</ControlLabel>

                <FormControl
                  onChange={e =>
                    this.setState({
                      passwordConfirm: e.target.value,
                      validPassword: e.target.value
                    })}
                  type="password"
                />
              </FormGroup>
              <Button
                bsStyle="primary"
                onClick={e => {
                  e.preventDefault();
                  this.createUser();
                }}
              >
                Create Account
              </Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                this.setState({ showModal: false });
                this.props.signUpToggle();
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default NewUser;
