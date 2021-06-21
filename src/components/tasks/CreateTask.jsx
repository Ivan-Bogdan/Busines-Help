import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { create_task } from "../../API/http";
import Route from "./Route";
import Doc from "./Doc";
import Payment from "./Payment";
import { getNameOtype } from "../../helpers";

const renderSuggestion = (clients) => <span>{clients.name}</span>;

export default class CreateTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      client: "",
      client_id: "",
      date: "",
      price: { price: 0, currency: "BYN" },
      performer: "",
      status: "",
      type: "",
      paid: "",
      route: [],
      payments: [],
      docs: [],
      error: "",
      suggestions: [],
      city: "",
      city_id: "",
      clients: [],
      countRoute: 0,
      countDoc: 0,
      countPayments: 0,
      objRoute: {},
      objDoc: {},
      objPayment: {},
    };
  }

  updateData = (address, city) => {
    this.setState({
      route: [
        ...this.state.route,
        { address, city, point: this.state.countRoute },
      ],
    });
    this.setState({ countRoute: this.state.countRoute + 1 });
  };

  updateDoc = (docsType, number, date) => {
    this.setState({
      docs: [...this.state.docs, { docs_type: docsType, number, date }],
    });
    this.setState({ countDoc: this.state.countDoc + 1 });
  };

  updatePayments = (payments_type, price, payment_number, date_pay) => {
    this.setState({
      payments: [
        ...this.state.payments,
        { payments_type, price, payment_number, date_pay },
      ],
    });
    this.setState({ countPayments: this.state.countPayments + 1 });
  };

  updateObjRoute = (address, city) => {
    this.setState({
      objRoute: { address, city, point: this.state.countRoute },
    });
  };

  updateObjDoc = (docsType, number, date) => {
    this.setState({
      objDoc: { docs_type: docsType, number, date },
    });
  };

  updateObjPayment = (payments_type, price, payment_number, date_pay) => {
    this.setState({
      objPayment: { payments_type, price, payment_number, date_pay },
    });
  };

  Create_Task = (event) => {
    event.preventDefault();
    let payload = {
      name: this.state.name,
      client: this.state.client_id,
      date: this.state.date,
      price: {
        price: Number(this.state.price.price),
        currency: this.state.price.currency,
      },
      performer: "8adac476-098d-4622-bce3-8bcfeae7f8c0",
      customer_id: null,
      status: Number(this.state.status),
      type: Number(this.state.type),
      paid: Number(this.state.paid),
      route:
        this.state.objRoute.point === this.state.countRoute
          ? [...this.state.route, this.state.objRoute]
          : this.state.route,
      payments: this.state.objPayment.payments_type
        ? [...this.state.payments, this.state.objPayment]
        : this.state.payments,
      docs: this.state.objDoc.date
        ? [...this.state.docs, this.state.objDoc]
        : this.state.docs,
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
    console.log(suggestion);
    this.setState({ client_id: suggestion.id });
    return `${getNameOtype(suggestion.otype)} "${suggestion.name || `${suggestion.full_name.family} ${suggestion.full_name.name} ${suggestion.full_name.patronymic}`}"`;
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
  };

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
          <div className="container3">
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
              type="date"
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
                value={this.state.price.price}
                name="price"
                onChange={(data) => {
                  const newValue = data.target.value;
                  this.setState((prevState) => ({
                    price: {
                      ...prevState.price,
                      price: newValue,
                    },
                  }));
                }}
              />
              <select
                className="select_price"
                value={this.state.price.currency}
                onChange={(data) => {
                  const newValue = data.target.value;
                  this.setState((prevState) => ({
                    price: {
                      ...prevState.price,
                      currency: newValue,
                    },
                  }));
                }}
                style={{ border: "1px solid lightgrey" }}
              >
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
              style={{ border: "1px solid lightgrey" }}
              required
              className="select1"
              value={this.state.type}
              onChange={(data) => {
                this.setState({ type: data.target.value });
              }}
            >
              <option value="" disabled selected>
                Грузоперевозка
              </option>
              <option style={{ color: "black" }} value={Number(0)}>
                Грузоперевозка
              </option>
            </select>

            {this.state.type === "0" && (
              <div>
                <p className="black">Маршрут погрузки</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Route
                    number={-1}
                    count={this.state.countRoute}
                    updateData={this.updateData}
                    updateObjRoute={this.updateObjRoute}
                  />

                  <div className="routelist">
                    {[...Array(this.state.countRoute)].map((item, index) => (
                      <div>
                        <Route
                          key={index}
                          updateData={this.updateData}
                          number={index}
                          count={this.state.countRoute}
                          updateObjRoute={this.updateObjRoute}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <p className="black">Статус услуги</p>
            <select
              style={{ border: "1px solid lightgrey" }}
              className="select1"
              value={this.state.status}
              onChange={(data) => {
                this.setState({ status: data.target.value });
              }}
            >
              <option type="number" defaultValue value={Number(0)}>
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
            <p className="black">Оплата услуги</p>
            <select
              style={{ border: "1px solid lightgrey" }}
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
            {this.state.paid === "1" && (
              <div>
                <Payment
                  index={-1}
                  key={-1}
                  count={this.state.countPayments}
                  updatePayment={this.updatePayments}
                  updateObjPayment={this.updateObjPayment}
                />

                {[...Array(this.state.countPayments)].map((item, index) => (
                  <div key={index}>
                    <Payment
                      index={index}
                      key={index}
                      count={this.state.countPayments}
                      updatePayment={this.updatePayments}
                      updateObjPayment={this.updateObjPayment}
                    />
                  </div>
                ))}
              </div>
            )}

            <Doc
              count={this.state.countDoc}
              updateDoc={this.updateDoc}
              updateObjDoc={this.updateObjDoc}
              index={-1}
              key={-1}
            />

            {[...Array(this.state.countDoc)].map((item, index) => (
              <div key={index}>
                <Doc
                  index={index}
                  key={index}
                  count={this.state.countDoc}
                  updateDoc={this.updateDoc}
                  updateObjDoc={this.updateObjDoc}
                />
              </div>
            ))}

            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                className="button5"
                onClick={this.Create_Task}
              >
                СОЗДАТЬ
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
