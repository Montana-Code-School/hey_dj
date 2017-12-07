import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import "./header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: ""
    };
  }
  render() {
    return (
      <header>
        <div className="container">
          <div id="branding">
            <LinkContainer to="user">
              <h1>Hey DJ</h1>
            </LinkContainer>
          </div>
          <nav>
            <ul>
              <li
                className={this.state.activeLink === 1 ? "current" : ""}
                onClick={() => {
                  this.setState({ activeLink: 1 });
                }}
              >
                <Link to="user">
                  <a className="gabe">New playlist</a>
                </Link>
              </li>
              <li
                className={this.state.activeLink === 2 ? "current" : ""}
                onClick={() => {
                  this.setState({ activeLink: 2 });
                }}
              >
                <Link to="createmusicset">
                  <a className="gabe">New music collection</a>
                </Link>
              </li>
              <li
                className={this.state.activeLink === 3 ? "current" : ""}
                onClick={() => {
                  this.setState({ activeLink: 3 });
                }}
              >
                <LinkContainer to="profile">
                  <a className="gabe">My account</a>
                </LinkContainer>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  username: state.userReducer.username,
  userId: state.userReducer.userId,
  spotifyToken: state.tokenReducer.spotifyToken
});

export default connect(mapStateToProps)(Header);
