import { connect } from "react-redux";
import { fakeLogin } from "./fakeFetch";
import { login } from "./actions/exampleActions";
import React from "react";

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  login: async () => {
    const { username } = await fakeLogin();
    dispatch(login(username));
  }
});

const Login = props => (
  <div>
    <button onClick={props.login}>Log In</button>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
