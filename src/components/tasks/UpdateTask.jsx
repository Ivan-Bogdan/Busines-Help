import React, { Component } from "react";
import { update_task, get_task } from "../../API/http";
import RouteUpdate from "./RouteUpdate";

export default class UpdateTask extends Component {
  componentWillMount() {
    setTimeout(() => {
      let payload = {
        task_id: this.props.task,
      };
      get_task(payload).then((data) => {
        if (data.message) {
          console.log(data.message);
        } else {
          console.log(data);
          this.setState({
            name: data.task.name,
            date: data.task.date.toLocaleString().substr(0, 10),
            price: data.task.price,
            status: Number(data.task.status),
            type: data.task.type,
            paid: data.task.paid,
          });
          if (data.task.additional_task) {
            this.setState((prevState) => ({
              additional_task: {
                ...prevState.additional_task,
                cert_of_complete:
                  data.task.additional_task.cert_of_complete.name,
                cert_of_complete_date_sig: data.task.additional_task.cert_of_complete.date_sig
                  .toLocaleString()
                  .substr(0, 10),
                contract: data.task.additional_task.contract.name,
                contract_date_sig: data.task.additional_task.contract.date_sig
                  .toLocaleString()
                  .substr(0, 10),
                waybill: data.task.additional_task.waybill.name,
                waybill_date_sig: data.task.additional_task.waybill.date_sig
                  .toLocaleString()
                  .substr(0, 10),
                route: data.task.additional_task.route,
              },
            }));
          } else {
            this.setState((prevState) => ({
              additional_task: {
                ...prevState.additional_task,
                cert_of_complete: "",
                contract: "",
                waybill: "",
                route: [],
              },
            }));
          }
        }
      });
    }, 200);
  }

  componentDidMount() {
    if (this.state.obj) {
      this.selectLocationHandler(this.state.obj.point);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      client: "",
      date: "",
      price: 0,
      performer: "",
      status: 0,
      type: "",
      paid: "",
      additional_task: {
        route: [],
        cert_of_complete: "",
        cert_of_complete_date_sig: "",
        contract: "",
        contract_date_sig: "",
        waybill: "",
        waybill_date_sig: "",
      },
    };
  }

  updateData = (address, city, point, id) => {
    this.setState((prevState) => ({
      obj: {
        ...prevState.obj,
        address: address,
        city: city,
        point: point,
        id: id,
      },
    }));
  };

  selectLocationHandler = (id) => {
    let theLocations = this.state.additional_task.route.map((l) =>
      Object.assign({}, l)
    );
    theLocations[id].city = this.state.obj.city;
    theLocations[id].address = this.state.obj.address;
    theLocations[id].point = this.state.obj.point;
    theLocations[id].id = this.state.obj.id;
    this.setState((prevState) => ({
      additional_task: {
        ...prevState.additional_task,
        route: theLocations,
      },
    }));
    this.state.additional_task.route = theLocations;
    console.log(theLocations);
  };

  Update_Task = (e) => {
    e.preventDefault();
    let payload = {
      task_id: this.props.task,
      status: Number(this.state.status),
      name: this.state.name,
      date: this.state.date,
      price: this.state.price,
      type: 0,
      paid: Number(this.state.paid),
      customer_id: null,
      additional_task: {
        route: this.state.additional_task.route,
        cert_of_complete: {
          name: this.state.additional_task.cert_of_complete,
          date_sig: this.state.additional_task.cert_of_complete_date_sig,
        },
        contract: {
          name: this.state.additional_task.contract,
          date_sig: this.state.additional_task.contract_date_sig,
        },
        waybill: {
          name: this.state.additional_task.waybill,
          date_sig: this.state.additional_task.waybill_date_sig,
        },
      },
    };
    update_task(payload).catch((err) => {
      console.log(err);
    });
    setTimeout(() => {
      window.location.href = `/myservices/`;
    }, 100);
  };
  render() {
    const items = this.state.additional_task.route.map((item, key) => (
      <RouteUpdate
        updateData={this.updateData}
        point={key}
        id={item.id}
        city={item.city}
        address={item.address}
      />
    ));
    if (this.state.obj) {
      let theLocations = this.state.additional_task.route.map((l) =>
        Object.assign({}, l)
      );
      theLocations[this.state.obj.point].city = this.state.obj.city;
      theLocations[this.state.obj.point].address = this.state.obj.address;
      theLocations[this.state.obj.point].point = this.state.obj.point;
      theLocations[this.state.obj.point].id = this.state.obj.id;
      this.state.additional_task.route = theLocations;
      console.log(theLocations);
    }
    return (
      <div className="modal" id="id03">
        <form class="modal-content2 animate" style={{ padding: "0 25px" }}>
          <div class="imgcontainer">
            <span
              className="close"
              onClick={(event) => {
                event.preventDefault();
                window.location.href = `/myservices/`;
              }}
              title="Close Modal"
            >
              ×
            </span>
            <p class="reg">Изменение услуги</p>
          </div>
          {this.props.children}

          <div class="">
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
              placeholder="Клиент (ПОКА НЕ ЗАПОЛНЯЕМ)"
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
              min="0"
              onChange={(data) => {
                this.setState({ price: Number(data.target.value) });
              }}
            />
            <input
              type="text"
              placeholder="Исполнитель (ПОКА НЕ ЗАПОЛНЯЕМ)"
              value={this.state.performer}
              name="performer"
              onChange={(data) => {
                this.setState({ performer: data.target.value });
              }}
            />
            <select
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

            {this.state.type === 0 && (
              <div style={{ marginLeft: "20px" }}>
                <input
                  type="text"
                  placeholder="ТТН"
                  value={this.state.additional_task.cert_of_complete}
                  name="cert_of_complete"
                  onChange={(data) => {
                    const newValue = data.target.value;
                    this.setState((prevState) => ({
                      additional_task: {
                        ...prevState.additional_task,
                        cert_of_complete: newValue,
                      },
                    }));
                  }}
                />
                <input
                  type="date"
                  placeholder="Дата ТТН"
                  value={this.state.additional_task.cert_of_complete_date_sig}
                  name="cert_of_complete_date"
                  onChange={(data) => {
                    const newValue = data.target.value;
                    this.setState((prevState) => ({
                      additional_task: {
                        ...prevState.additional_task,
                        cert_of_complete_date_sig: newValue,
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
                  type="date"
                  placeholder="Дата накладной"
                  value={this.state.additional_task.waybill_date_sig}
                  name="waybill_date"
                  onChange={(data) => {
                    const newValue = data.target.value;
                    this.setState((prevState) => ({
                      additional_task: {
                        ...prevState.additional_task,
                        waybill_date_sig: newValue,
                      },
                    }));
                  }}
                />
                <input
                  type="text"
                  placeholder="Контракт"
                  value={this.state.additional_task.contract}
                  name="contract"
                  onChange={(data) => {
                    const newValue = data.target.value;
                    this.setState((prevState) => ({
                      additional_task: {
                        ...prevState.additional_task,
                        contract: newValue,
                      },
                    }));
                  }}
                />
                <input
                  type="date"
                  placeholder="Дата контракта"
                  value={this.state.additional_task.contract_date_sig}
                  name="contract_date"
                  onChange={(data) => {
                    const newValue = data.target.value;
                    this.setState((prevState) => ({
                      additional_task: {
                        ...prevState.additional_task,
                        contract_date_sig: newValue,
                      },
                    }));
                  }}
                />
                {items}
                <div style={{ marginLeft: "20px" }}></div>
              </div>
            )}

            <select
              className="select1"
              value={this.state.status}
              onChange={(data) => {
                this.setState({ status: data.target.value });
              }}
            >
              <option disabled selected style={{ display: "none" }}>
                Статус
              </option>
              <option type="number" value={0}>
                К выполнению
              </option>
              <option type="number" value={1}>
                В работе
              </option>
              <option type="number" value={2}>
                Завершен
              </option>
              <option type="number" value={3}>
                Отменён
              </option>
            </select>
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
            <div className="services">
              <button
                type="submit"
                className="button_create"
                onClick={this.Update_Task}
              >
                Изменить
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
