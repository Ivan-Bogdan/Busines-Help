import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { create_task } from "../../API/http";
import Route from "./Route";

const renderSuggestion = (cleints) => <span>{cleints.name}</span>;

export default class CreateTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
        cert_of_complete: "",
        cert_of_complete_date_sig: "",
        contract: "",
        contract_date_sig: "",
        waybill: "",
        waybill_date_sig: "",
      },
      error: "",
      suggestions: [],
      city: "",
      city_id: "",
      clients: [],
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
      client: "40b29214-03d8-4955-b946-e8e2ccbe1f6e", //dont update
      date: this.state.date,
      price: this.state.price,
      performer: "8adac476-098d-4622-bce3-8bcfeae7f8c0", //dont update
      status: Number(this.state.status),
      type: Number(this.state.type),
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
    create_task(payload).then((data) => {
      if (data.message) {
        this.setState({ error: data.message });
      } else {
        window.location.reload();
      }
    });
  };

  getSuggestionValue = (suggestion) => {
    this.setState({ client: suggestion.id });
    return suggestion.name;
  };

  onChange = (event, { newValue, method }) => {
    this.setState({
      client: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    fetch(`http://altproduction.ru/rest/client/get_client_list/`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        limit: 5,
        offset: 0,
        sort: "name",
        desc: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ clients: data.clients });
      });
  }; // нужно поле для поиска в боди

  onSuggestionsClearRequested = () => {
    this.setState({ clients: [] });
  };

  render() {
    const { clients, client } = this.state;
    const inputProps = {
      placeholder: "Клиент",
      value: client,
      onChange: this.onChange,
    };
    return (
      <div className="modal" id="id01">
        <form className="modal-content2 animate">
          <div className="imgcontainer">
            <span
              className="close"
              onClick={this.props.onClose}
              title="Close Modal"
            >
              ×
            </span>
            <p className="reg">Создать услугу</p>
            <p style={{ color: "red" }}>{this.state.error}</p>
          </div>
          {this.props.children}

          <div className="container3">
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
              placeholder="Клиент (ТУТ БУДЕТ АВТОКОМПЛИТ)"
              value={this.state.client}
              name="client"
              onChange={(data) => {
                this.setState({ client: data.target.value });
              }}
            />
            <Autosuggest
              suggestions={clients}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
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
                this.setState({ price: Number(data.target.value) });
              }}
            />
            <input
              type="text"
              placeholder="Исполнитель (ТУТ БУДЕТ АВТОКОМПЛИТ)"
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
              <option
                value=""
                disabled
                defaultValue
                style={{ display: "none" }}
              >
                Тип
              </option>
              <option type="number" value={Number(0)}>
                Грузоперевозка
              </option>
            </select>

            {this.state.type === "0" && (
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
                  value={this.state.additional_task.contract_number}
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
              value={this.state.status}
              onChange={(data) => {
                this.setState({ status: data.target.value });
              }}
            >
              <option
                value=""
                disabled
                defaultValue
                style={{ display: "none" }}
              >
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
            <select
              className="select1"
              value={this.state.paid}
              onChange={(data) => {
                this.setState({ paid: data.target.value });
              }}
            >
              <option
                value=""
                disabled
                defaultValue
                style={{ display: "none" }}
              >
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
                onClick={this.props.onClose}
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
