import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { increment, decrement } from "./actions/exampleActions";
import Login from "./Login";
class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.username ? "Hello " + this.props.username : <Login />}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Counter!!!</h1>
        </header>
        <p className="App-intro">
          {this.props.count}
          <button onClick={this.props.incr}>+1</button>
          <button onClick={this.props.decr}>-1</button>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.username,
  count: state.count
});

const mapDispatchToProps = dispatch => ({
  incr: () => dispatch(increment()),
  decr: () => dispatch(decrement())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
