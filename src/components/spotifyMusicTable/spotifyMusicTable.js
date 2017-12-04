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
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

class SpotifyMusicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NewField: "",
      NewFieldValue: "",
      ExistingFields: [<th>Song Title</th>, <th>Artist</th>],
      ExistingFieldsValues: ["", ""]
    };
  }

  addToFields(field, fieldValue) {
    let fields = this.state.ExistingFields;
    let fieldsValues = this.state.ExistingFieldsValues;
    fields.push(<th>{field}</th>);
    fieldsValues.push(fieldValue);
    this.setState({
      ExistingFields: fields,
      ExistingFieldsValues: fieldsValues
    });
  }

  // <CarouselProvider
  //   naturalSlideWidth={0.1}
  //   naturalSlideHeight={0.1}
  //   totalSlides={3}
  // >
  //   <Slider>
  //     <Slide index={0}>I am the first Slide.</Slide>
  //     <Slide index={1}>I am the second Slide.</Slide>
  //     <Slide index={2}>I am the third Slide.</Slide>
  //   </Slider>
  // </CarouselProvider>

  render() {
    let songs = [];
    if (this.props.spotifySongs !== undefined) {
      this.props.spotifySongs.map(index =>
        songs.push(
          <tr>
            {index.track.name}
            {index.track.artists[0].name}
          </tr>
        )
      );
    }
    return (
      <div>
        <div>
          <Table>
            <div className="header">
              <thead>
                <tr>{this.state.ExistingFields}</tr>
                <tr>{this.state.ExistingFieldsValues}</tr>
              </thead>
            </div>
            <div className="songs">
              <tbody>{songs}</tbody>
            </div>
          </Table>
        </div>
        <div>
          <FormGroup>
            <div>
              <ControlLabel>Add a new field</ControlLabel>
            </div>
            <FormControl
              onChange={e => this.setState({ NewField: e.target.value })}
              type="text"
            />
            <div>
              <ControlLabel>Set field value</ControlLabel>
            </div>
            <FormControl
              onChange={e => this.setState({ NewFieldValue: e.target.value })}
              type="text"
            />
          </FormGroup>
          <Button
            onClick={() =>
              this.addToFields(this.state.NewField, this.state.NewFieldValue)}
          >
            Submit New Field
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spotifySongs: state.spotifySongsReducer.spotifySongs
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyMusicTable);
