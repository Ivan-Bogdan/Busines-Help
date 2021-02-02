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
      client_id: "",
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
      client: this.state.client_id,
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
    this.setState({ client_id: suggestion.id });
    return suggestion.name;
  };

  onChange = (event, { newValue, method }) => {
    this.setState({
      client: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    fetch(`http://altproduction.ru/rest/client/find_client/`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        limit: 5,
        offset: 0,
        name: value,
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
            <p className="reg">СОЗДАНИЕ УСЛУГИ</p>
            <p style={{ color: "red" }}>{this.state.error}</p>
          </div>
          {this.props.children}

          <div className="container3">
            {this.props.children}
            <p className="black">Наименование услуги</p>
            <input
              type="text"
              placeholder="Создание сервиса поиска"
              value={this.state.name}
              name="name"
              onChange={(data) => {
                this.setState({ name: data.target.value });
              }}
            />
            <p className="black">Клиент</p>
            <Autosuggest
              suggestions={clients}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
            <p className="black">Дата</p>
            <input
              type="text"
              placeholder="18.10.2021"
              value={this.state.date}
              name="date"
              onChange={(data) => {
                this.setState({ date: data.target.value });
              }}
            />
            <p className="black">Сумма</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                type="number"
                placeholder="Сумма"
                value={this.state.price}
                name="price"
                onChange={(data) => {
                  this.setState({ price: Number(data.target.value) });
                }}
              />
              <select style={{ height: 55, border: "1px solid lightgrey" }}>
                <option value="BYN" defaultValue>
                  BYN
                </option>
                <option value="USD">USD</option>
                <option value="RUB">RUB</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <p className="black">Исполнитель</p>
            <input
              type="text"
              placeholder="Исполнитель (ТУТ БУДЕТ АВТОКОМПЛИТ)"
              value={this.state.performer}
              name="performer"
              onChange={(data) => {
                this.setState({ performer: data.target.value });
              }}
            />
            <p className="black">Тип услуги</p>
            <select
              style={{ color: "lightgray" }}
              className="select1"
              value={this.state.type}
              onChange={(data) => {
                this.setState({ type: data.target.value });
              }}
            >
              <option
                value=""
                selected
                hidden
                disabled
                defaultValue
                style={{ display: "none", color: "lightgray" }}
              >
                Грузоперевозка
              </option>
              <option style={{ color: "black" }} value={Number(0)}>
                Грузоперевозка
              </option>
            </select>

            {this.state.type === "0" && (
              <div>
                <p className="black">Номер договора</p>
                <input
                  type="text"
                  placeholder="154"
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
                <p className="black">Дата договора</p>
                <input
                  type="text"
                  placeholder="15.10.2021"
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
                <p className="black">Номер накладной</p>
                <input
                  type="text"
                  placeholder="154"
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
                <p className="black">Дата накладной</p>
                <input
                  type="text"
                  placeholder="15.10.2021"
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
                <p className="black">Номер путевого листа</p>
                <div className="form__field">
                  <input
                    type="text"
                    placeholder="Контракт"
                    pattern=".{1,}"
                    required
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
                  <span className="form__error">Заполните поле</span>
                </div>
                <p className="black">Дата путевого листа</p>
                <input
                  type="text"
                  placeholder="115.10.2021"
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
                <p className="black">Маршрут погрузки</p>
                {/*  <div style={{ marginLeft: "20px" }}></div> */}
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
