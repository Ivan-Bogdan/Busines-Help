import React, { Component } from "react";
import icon_delete from "../../assets/img/удалить.png";

export default class Doc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      docs_type: "TTN",
      number: "",
      date: "",
    };
  }

  render() {
    return (
      <div>
        <div>
          {this.props.index === -1 && <p className="black">Документы</p>}
          <select
            className="select1"
            style={{ border: "1px solid lightgrey" }}
            value={this.state.docs_type}
            onChange={({ target }) => {
              this.setState({ docs_type: target.value });
              if (this.state.number && this.state.date) {
                this.props.updateDoc(
                  this.state.docs_type,
                  this.state.number,
                  this.state.date
                );
                this.props.updateObjDoc(
                  target.value,
                  this.state.number,
                  this.state.date
                );
              }
            }}
          >
            <option value="" disabled selected>
              Добавить документ
            </option>
            <option value={`TTN`}>TTN</option>
            <option value={`TN`}>TN</option>
            <option value={`WAYBILL`}>WAYBILL</option>
            <option value={`CONTRACT`}>CONTRACT</option>
          </select>
        </div>
        <div className="flex m25-0">
          <input
            type="text"
            value={this.state.number}
            placeholder="Номер"
            onChange={({ target }) => {
              this.setState({ number: target.value });
              if (this.state.number && this.state.date) {
                this.props.updateObjDoc(
                  this.state.docs_type,
                  target.value,
                  this.state.date
                );
              }
            }}
          />
          <input
            style={{ marginLeft: 10 }}
            type="date"
            value={this.state.date}
            placeholder="Дата"
            onChange={({ target }) => {
              this.setState({ date: target.value });
              if (this.state.number && this.state.date) {
                this.props.updateObjDoc(
                  this.state.docs_type,
                  this.state.number,
                  target.value
                );
              }
            }}
          />
          <img
            src={icon_delete}
            className="delete_icon"
            height={34}
            onClick={() => {
              this.setState({ number: "", date: "" });
            }}
            alt="delete"
          />
        </div>
        <div>
          <select
            className={
              this.props.count <= this.props.index + 1 ? "select1" : "d-none"
            }
            style={{ border: "1px solid lightgrey" }}
            onChange={() => {
              if (this.state.number && this.state.date)
                this.props.updateDoc(
                  this.state.docs_type,
                  this.state.number,
                  this.state.date
                );
              else {
                alert("Заполните поля");
              }
            }}
          >
            <option value="" disabled selected>
              Добавить документ
            </option>
            <option value={`TTN`}>TTN</option>
            <option value={`TN`}>TN</option>
            <option value={`WAYBILL`}>WAYBILL</option>
            <option value={`CONTRACT`}>CONTRACT</option>
          </select>
        </div>
      </div>
    );
  }
}
