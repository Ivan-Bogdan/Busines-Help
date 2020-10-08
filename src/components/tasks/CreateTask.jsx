import React, { Component } from "react";
import { createTask } from "../../API/http";

export default class CreateTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      client: "",
      date: "",
      price: "int",
      performer: "",
      status: "",
      type: 0,
      paid: "",
      additional_task: {},
    };
  }

  Create_Task = (event) => {
    event.preventDefault();
    let payload = {
      name: "shok",
      client: "1b99a4c0-c679-4245-a00c-7be79799f98e",
      date: "2020-10-02 16:48:16",
      price: 123,
      performer: "8adac476-098d-4622-bce3-8bcfeae7f8c0",
      status: 1,
      type: 0,
      paid: 0,
      customer_id: null,
      additional_task: {
        route: [
          {
            city: "0",
            address: "0",
            point: 0,
          },
          {
            city: "1",
            address: "1",
            point: 1,
          },
        ],
        ttn: "thas",
        contract_number: "215ga1",
        waybill: "sadads",
      },
    };
    createTask(payload);
  };
  render() {
    return (
      <div className="modal">
        <form class="modal-content2 animate">
          <div class="imgcontainer">
            <span
              className="close"
              onClick={this.props.onClose}
              title="Close Modal"
            >
              ×
            </span>
            <p class="reg">Создать услугу</p>
          </div>
          {this.props.children}

          <div class="container3">
            {this.props.children}
            <input
              type="text"
              placeholder="Наименование"
              value={this.state.name}
              name="name"
              onChange={(data) => {
                this.setState({ name: data.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Клиент"
              value={this.state.client}
              name="client"
              onChange={(data) => {
                this.setState({ client: data.target.value });
              }}
            />
            <input
              type="date"
              placeholder="Дата"
              value={this.state.date}
              name="date"
              onChange={(data) => {
                this.setState({ date: data.target.value });
              }}
            />
            <input
              type="number"
              placeholder="Сумма"
              value={this.state.price}
              name="price"
              onChange={(data) => {
                this.setState({ price: data.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Исполнитель"
              value={this.state.performer}
              name="performer"
              onChange={(data) => {
                this.setState({ performer: data.target.value });
              }}
            />
            <select
              value={this.state.status}
              onChange={(data) => {
                this.setState({ status: data.target.value });
              }}
            >
              <option disabled selected style={{ display: "none" }}>
                Статус
              </option>
              <option type="number" value={Number(0)}>
                К выполнению
              </option>
              <option type="number" value={Number(1)}>
                В работе
              </option>
              <option type="number" value={Number(2)}>
                Завершен
              </option>
              <option type="number" value={Number(3)}>
                Отменён
              </option>
            </select>
            <div className="services">
              <button
                type="submit"
                className="button_create"
                onClick={this.LoginUser}
              >
                Отмена
              </button>
              <button
                type="submit"
                className="button_create"
                onClick={this.Create_Task}
              >
                Добавить
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
