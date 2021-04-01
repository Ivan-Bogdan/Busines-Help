import React, { Component } from "react";
import icon_delete from "../../assets/img/удалить.png";

export default class Doc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberDoc: "",
      dateDoc: "",
    };
  }

  render() {
    return (
      <div className="flex m25-0">
        <input
          type="text"
          value={this.state.numberDoc}
          placeholder="Номер"
          onChange={({ target }) => {
            this.setState({ numberDoc: target.value });
          }}
        />
        <input
          style={{ marginLeft: 10 }}
          type="text"
          value={this.state.dateDoc}
          placeholder="Дата"
          onChange={({ target }) => {
            this.setState({ dateDoc: target.value });
          }}
        />
        <img
          src={icon_delete}
          className="delete_icon"
          height={34}
          onClick={() => {}}
          alt="delete"
        />
      </div>
    );
  }
}
