import React, { Component } from "react";

export default class FilterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      desc: this.props.desc,
      sort: this.props.sort,
    };
  }
  render() {
    return (
      <form className="modal-content4">
        <div className="flex">
          <p>Сортировать по</p>
          <select
            style={{ border: "1px solid lightgrey" }}
            value={this.state.sort}
            onChange={(data) => {
              this.setState({ sort: data.target.value });
            }}
          >
            <option value="name">Название</option>
            <option value="date">Дата</option>
          </select>
        </div>
        <div className="flex">
          <p>По убыванию</p>
          <input
            type="checkbox"
            value={this.state.desc}
            onClick={() => {
              this.setState({ desc: !this.state.desc });
            }}
          ></input>
        </div>
        <div className="" align="right">
          <button
            className="button5"
            onClick={() => {
              this.props.onClose();
              this.props.dataFilter(this.state.desc, this.state.sort);
            }}
          >
            Применить
          </button>
        </div>
      </form>
    );
  }
}
