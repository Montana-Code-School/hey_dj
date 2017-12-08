import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import "./header.css";

class Header extends Component {
  render() {
    const { pathname } = this.props;
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
              {[
                {
                  link: "/user",
                  text: "New playlist"
                },
                {
                  link: "/createmusicset",
                  text: "New music collection"
                },
                {
                  link: "/profile",
                  text: "My account"
                }
              ].map(link => (
                <li className={pathname === link.link ? "current" : ""}>
                  <Link to={link.link}>
                    <a className="gabe">{link.text}</a>
                  </Link>
                </li>
              ))}
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
  spotifyToken: state.tokenReducer.spotifyToken,
  pathname: state.router.location.pathname
});

export default connect(mapStateToProps)(Header);
