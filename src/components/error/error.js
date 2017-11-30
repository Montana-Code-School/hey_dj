import React, { Component } from "react";
import { Alert, Button } from "react-bootstrap";
import { connect } from "react-redux";

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: true
    };
  }

  handleAlertDismiss = () => this.setState({ alertVisible: false });

  render() {
    if (this.state.alertVisible) {
      return (
        <div>
          {" "}
          <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
            <h4>Oh snap! You got an error!</h4>
            <p>{this.props.error}</p>
            <p>
              <Button onClick={this.handleAlertDismiss}>Hide</Button>
            </p>
          </Alert>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = state => ({
  error: state.error
});

export default connect(mapStateToProps)(Error);
