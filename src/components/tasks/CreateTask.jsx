import React, { Component } from "react";
<<<<<<< HEAD
import { create_task } from "../../API/http";
import Route from "./Route";

export default class CreateTask extends Component {
  componentDidMount() {
    const modal = document.getElementById("id01");
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  }

=======
import { createTask } from "../../API/http";

export default class CreateTask extends Component {
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
  constructor(props) {
    super(props);

    this.state = {
<<<<<<< HEAD
      obj: {
        address: "",
        city: "",
      },
      name: "",
      client: "",
      date: "",
      price: 0,
      performer: "",
      status: "",
      type: "",
      paid: "",
      additional_task: {
        route: [],
        ttn: "",
        contract_number: "",
        waybill: "",
      },
      error: "",
      suggestions: [],
      city: "",
      city_id: "",
      count: 0,
    };
  }

  updateData = (address, city, point) => {
    this.setState((prevState) => ({
      obj: {
        ...prevState.address,
        address: address,
        city: city,
        point: point,
      },
    }));
  };

  Create_Task = (event) => {
    event.preventDefault();
    this.state.additional_task.route.push(this.state.obj);
    let payload = {
      name: this.state.name,
      client: "1b99a4c0-c679-4245-a00c-7be79799f98e", //dont update
      date: this.state.date,
      price: this.state.price,
      performer: "8adac476-098d-4622-bce3-8bcfeae7f8c0", //dont update
      status: Number(this.state.status),
      type: Number(this.state.type),
      paid: Number(this.state.paid),
      customer_id: null,
      additional_task: {
        route: this.state.additional_task.route,
        ttn: this.state.additional_task.ttn,
        contract_number: this.state.additional_task.contract_number,
        waybill: this.state.additional_task.waybill,
      },
    };
    create_task(payload).then((data) => {
      if (data.message) {
        this.setState({ error: data.message });
      } else {
        window.location.reload();
      }
    });
  };

  render() {
    return (
      <div className="modal" id="id01">
=======
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
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
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
<<<<<<< HEAD
            <p style={{ color: "red" }}>{this.state.error}</p>
=======
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
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
<<<<<<< HEAD
              placeholder="Клиент (ТУТ БУДЕТ АВТОКОМПЛИТ)"
=======
              placeholder="Клиент"
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
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
<<<<<<< HEAD
                this.setState({ price: Number(data.target.value) });
=======
                this.setState({ price: data.target.value });
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
              }}
            />
            <input
              type="text"
<<<<<<< HEAD
              placeholder="Исполнитель (ТУТ БУДЕТ АВТОКОМПЛИТ)"
=======
              placeholder="Исполнитель"
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
              value={this.state.performer}
              name="performer"
              onChange={(data) => {
                this.setState({ performer: data.target.value });
              }}
            />
            <select
<<<<<<< HEAD
              className="select1"
              value={this.state.type}
              onChange={(data) => {
                this.setState({ type: data.target.value });
              }}
            >
              <option value="" disabled selected style={{ display: "none" }}>
                Тип
              </option>
              <option type="number" value={Number(0)}>
                Грузоперевозка
              </option>
            </select>

            {this.state.type == "0" && (
              <div style={{ marginLeft: "20px" }}>
                <input
                  type="text"
                  placeholder="ТТН"
                  value={this.state.additional_task.ttn}
                  name="ttn"
                  onChange={(data) => {
                    const newValue = data.target.value;
                    this.setState((prevState) => ({
                      additional_task: {
                        ...prevState.additional_task,
                        ttn: newValue,
                      },
                    }));
                  }}
                />
                <input
                  type="text"
                  placeholder="Накладная"
                  value={this.state.additional_task.waybill}
                  name="waybill"
                  onChange={(data) => {
                    const newValue = data.target.value;
                    this.setState((prevState) => ({
                      additional_task: {
                        ...prevState.additional_task,
                        waybill: newValue,
                      },
                    }));
                  }}
                />
                <input
                  type="text"
                  placeholder="Контактный номер"
                  value={this.state.additional_task.contract_number}
                  name="contract_number"
                  onChange={(data) => {
                    const newValue = data.target.value;
                    this.setState((prevState) => ({
                      additional_task: {
                        ...prevState.additional_task,
                        contract_number: newValue,
                      },
                    }));
                  }}
                />
                <div style={{ marginLeft: "20px" }}></div>
                <Route point={0} updateData={this.updateData} />
                {[...Array(this.state.count)].map((item, acc) => (
                  <Route point={acc + 1} updateData={this.updateData} />
                ))}
                <button
                  disabled={this.state.isClickable}
                  style={{ backgroundColor: "#4caf50" }}
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState(({ count }) => ({
                      count: count + 1,
                    }));
                    this.state.additional_task.route.push(this.state.obj);
                    this.setState((prevState) => ({
                      obj: {
                        ...prevState.obj,
                        address: "",
                        city: "",
                      },
                    }));
                  }}
                >
                  +
                </button>
              </div>
            )}

            <select
              className="select1"
=======
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
              value={this.state.status}
              onChange={(data) => {
                this.setState({ status: data.target.value });
              }}
            >
<<<<<<< HEAD
              <option value="" disabled selected style={{ display: "none" }}>
=======
              <option disabled selected style={{ display: "none" }}>
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
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
<<<<<<< HEAD
            <select
              className="select1"
              value={this.state.paid}
              onChange={(data) => {
                this.setState({ paid: data.target.value });
              }}
            >
              <option value="" disabled selected style={{ display: "none" }}>
                Оплачено/Неоплачено
              </option>
              <option type="number" value={Number(0)}>
                Не оплачено
              </option>
              <option type="number" value={Number(1)}>
                Оплачено
              </option>
            </select>
=======
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
            <div className="services">
              <button
                type="submit"
                className="button_create"
<<<<<<< HEAD
                onClick={this.props.onClose}
=======
                onClick={this.LoginUser}
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
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
