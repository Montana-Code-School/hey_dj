import React, { Component } from "react";

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: "",
      password: ""
    };
  }

  async handleNewUser() {
    const user = await fetch("/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.newUser,
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
        <h4> Create User Account</h4>
        <h4> {this.state.newUser}</h4>
        <h4> {this.state.password}</h4>
        <input
          type="text"
          placeholder="Enter User Name"
          onChange={e => this.setState({ newUser: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter Password"
          onChange={e => this.setState({ password: e.target.value })}
        />
        <button onClick={this.handleNewUser.bind(this)}>
          {" "}
          Create Account{" "}
        </button>
      </div>
    );
  }
}

export default NewUser;
