import React from "react";
import cx from "classnames";
import DraggableList from "react-draggable-list";
import "./dragMenu.css";

function hashCode(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();
  return "00000".substring(0, 6 - c.length) + c;
}

class Card extends React.Component {
  getDragHeight() {
    return 32;
  }

  iconClick() {
    console.log(this.props);
    this.props.item.setPreviewId(this.props.item.spotifyId);
  }

  render() {
    const { item, itemSelected, dragHandle } = this.props;
    const scale = itemSelected * 0.05 + 1;
    const shadow = itemSelected * 15 + 1;
    const dragged = itemSelected !== 0;
    return (
      <div
        className={cx("item", { dragged })}
        style={{
          transform: `scale(${scale})`,
          boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`
        }}
      >
        {dragHandle(
          <div className="dragHandle">
            <h2>{item.title}</h2>
            <div className="subtitle">{item.artist}</div>
          </div>
        )}
        <img
          style={{
            border: "0px solid #" + intToRGB(hashCode(item.emotion || "")),
            width: "10%"
          }}
          src={require("./icon.png")}
          onClick={() => this.iconClick()}
        />
      </div>
    );
  }
}

export default class DragList extends React.Component {
  constructor(props) {
    super(props);
  }

  _onListChange(newList: Array<Object>) {
    this.setState({ list: newList });
    this.props.updatePlaylistOrder(newList);
  }

  render() {
    return (
      <div
        className="list"
        ref={el => {
          if (el) this._container = el;
        }}
      >
        <DraggableList
          itemKey="title"
          template={Card}
          list={this.props.list}
          onMoveEnd={newList => this._onListChange(newList)}
          container={() => false}
        />
      </div>
    );
  }
}
