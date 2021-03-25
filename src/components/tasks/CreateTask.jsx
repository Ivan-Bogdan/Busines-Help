import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { faPlusSquare } from "@fortawesome/fontawesome-free-regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { create_task } from "../../API/http";
import Route from "./Route";
import icon_delete from "../../assets/img/удалить.png";

const renderSuggestion = (clients) => <span>{clients.name}</span>;

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
      price: { price: 0, currency: "" },
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
      count: 0,
    };
  }

  updateData = (address, city, point) => {
    this.setState((prevState) => ({
      obj: {
        ...prevState.obj,
        address: address,
        city: city,
        point: point,
      },
    }));
  };

  Create_Task = (event) => {
    event.preventDefault();
    this.state.route.push(this.state.obj);
    let payload = {
      name: this.state.name,
      client: this.state.client_id,
      date: this.state.date,
      price: {
        price: Number(this.state.price),
        currency: this.state.price.currency,
      },
      performer: "8adac476-098d-4622-bce3-8bcfeae7f8c0",
      status: Number(this.state.status),
      type: Number(this.state.type),
      paid: Number(this.state.paid),
      route: this.state.route,
      payments: this.state.payments,
      docs: this.state.docs,
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
                  // this.setState({ price: Number(data.target.value) });
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
                <p className="black">Номер договора</p>
                {/* <input
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
                /> */}
                <p className="black">Дата договора</p>
                {/* <input
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
                /> */}
                <p className="black">Номер накладной</p>
                {/* <input
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
                /> */}
                <p className="black">Дата накладной</p>
                {/* <input
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
                /> */}
                <p className="black">Номер путевого листа</p>
                <div className="form__field">
                  {/* <input
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
                  /> */}
                  <span className="form__error">Заполните поле</span>
                </div>
                <p className="black">Дата путевого листа</p>
                {/* <input
                  type="text"
                  placeholder="15.10.2021"
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
                /> */}
                <p className="black">Маршрут погрузки</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Route point={0} updateData={this.updateData} />

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      position: "relative",
                    }}
                  >
                    {[...Array(this.state.count)].map((item, acc) => (
                      <Route
                        key={acc}
                        point={acc + 1}
                        updateData={this.updateData}
                      />
                    ))}
                  </div>
                </div>
                <p className="black">Маршрут погрузки</p>
                {/* <input
                  type="text"
                  placeholder="Примечание"
                  value={this.state.additional_task.note}
                  name="note"
                  onChange={(data) => {
                    const newValue = data.target.value;
                    this.setState((prevState) => ({
                      additional_task: {
                        ...prevState.additional_task,
                        note: newValue,
                      },
                    }));
                  }}
                /> */}
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
              {/* <option
                value=""
                disabled
                
                style={{ display: "none" }}
              >
                Статус
              </option> */}
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
                <p className="black">Вид оплаты</p>
                <select
                  className="select1"
                  style={{ border: "1px solid lightgrey" }}
                  value={this.state.typepaid}
                  onChange={(data) => {
                    this.setState({ typepaid: data.target.value });
                  }}
                >
                  <option type="number" value={Number(0)}>
                    Платежное поручение (банк)
                  </option>
                  <option type="number" value={Number(1)}>
                    Квитанция (наличные)
                  </option>
                  <option type="number" value={Number(2)}>
                    Чек КСА (наличные)
                  </option>
                  <option type="number" value={Number(3)}>
                    Терминал (по карте)
                  </option>
                  <option type="number" value={Number(4)}>
                    Иной платеж
                  </option>
                </select>

                <p className="black">Номер платежа</p>
                <input
                  type="text"
                  placeholder="154"
                  value={this.state.number_paid}
                  name="price"
                  onChange={(data) => {
                    this.setState({ number_paid: data.target.value });
                  }}
                />

                <p className="black">Сумма</p>
                {/* <input
                  type="number"
                  placeholder="Сумма"
                  value={this.state.price2}
                  name="price"
                  onChange={(data) => {
                    this.setState({ price2: Number(data.target.value) });
                  }}
                /> */}

                <p className="black">Дата оплаты</p>
                {/* <input
                  type="text"
                  placeholder="15.10.2021"
                  value={this.state.date_of_paid}
                  name="price"
                  onChange={(data) => {
                    this.setState({ date_of_paid: data.target.value });
                  }}
                /> */}
              </div>
            )}
            <p className="black">Документы</p>
            <select
              className="select1"
              style={{ border: "1px solid lightgrey" }}
            >
              <option type="number" value={Number(0)}>
                Путевой лист
              </option>
            </select>

            <div className="flex m25-0">
              <input type="text" placeholder="Номер" />
              <input
                style={{ marginLeft: 10 }}
                type="text"
                placeholder="Дата"
              />
              <img
                src={icon_delete}
                className="delete_icon"
                height={34}
                alt="delete"
              />
            </div>
            <select
              className="select1"
              style={{ border: "1px solid lightgrey" }}
            >
              <option value="" disabled selected>
                Добавить документ
              </option>
              <option type="number" value={Number(0)}>
                Договор
              </option>
              <option type="number" value={Number(1)}>
                Путевой лист
              </option>
              <option type="number" value={Number(2)}>
                ТТИ-1
              </option>
              <option type="number" value={Number(3)}>
                ТН
              </option>
            </select>
            <div className="services">
              <button
                style={{ padding: "15px 50px" }}
                type="submit"
                className="button_create"
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
