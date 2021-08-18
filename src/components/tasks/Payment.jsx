import React, { Component } from "react";
import icon_delete from "../../assets/img/удалить.png";
import "./styleTask.css";

export default class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payments_type: "PAYMENT_ORDER",
      price: {
        price: 0,
        currency: "BYN",
      },
      payment_number: "",
      date_pay: "",
    };
  }

  render() {
    return (
      <div className="p5-background">
        <p className="black">Вид оплаты</p>
        <div className="flex m25-0">
          <select
            className="select1"
            style={{ border: "1px solid lightgrey" }}
            value={this.state.payments_type}
            onChange={(data) => {
              this.setState({ payments_type: data.target.value });
              if (
                data.target.value &&
                this.state.date_pay &&
                this.state.price.price &&
                this.state.price.currency &&
                this.state.date_pay
              )
                this.props.updateObjPayment(
                  data.target.value,
                  {
                    price: this.state.price.price,
                    currency: this.state.price.currency,
                  },
                  this.state.payment_number,
                  this.state.date_pay
                );
            }}
          >
            <option value={`PAYMENT_ORDER`}>Платежное поручение (банк)</option>
            <option value={`RECEIPT`}>Квитанция (наличные)</option>
            <option value={`CHEQUE`}>Чек КСА (наличные)</option>
            <option value={`POS`}>Терминал (по карте)</option>
            <option value={`OTHER`}>Иное</option>
          </select>
          <img
            src={icon_delete}
            className="delete_icon"
            height={34}
            onClick={() => {
              this.setState({ payment_number: "", date_pay: "" });
              this.setState((prevState) => ({
                price: {
                  ...prevState.price,
                  price: 0,
                  currency: "BYN",
                },
              }));
            }}
            alt="delete"
          />
        </div>


        <div>
          <p className="black">Номер платежа</p>
          <input
            type="text"
            placeholder="154"
            value={this.state.payment_number}
            onChange={(data) => {
              this.setState({ payment_number: data.target.value });
              if (
                this.state.payments_type &&
                this.state.date_pay &&
                this.state.price.price &&
                this.state.price.currency &&
                this.state.date_pay
              )
                this.props.updateObjPayment(
                  this.state.payments_type,
                  {
                    price: this.state.price.price,
                    currency: this.state.price.currency,
                  },
                  data.target.value,
                  this.state.date_pay
                );
            }}
          />
        </div>

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
            onChange={({ target }) => {
              this.setState((prevState) => ({
                price: {
                  ...prevState.price,
                  price: target.value,
                },
              }));
              if (
                this.state.payments_type &&
                this.state.date_pay &&
                target.value &&
                this.state.price.currency &&
                this.state.date_pay
              )
                this.props.updateObjPayment(
                  this.state.payments_type,
                  { price: target.value, currency: this.state.price.currency },
                  this.state.payment_number,
                  this.state.date_pay
                );
            }}
          />
          <select
            className="select_price"
            value={this.state.price.currency}
            onChange={({ target }) => {
              this.setState((prevState) => ({
                price: {
                  ...prevState.price,
                  currency: target.value,
                },
              }));
              if (
                this.state.payments_type &&
                this.state.date_pay &&
                this.state.price.price &&
                target.value
              )
                this.props.updateObjPayment(
                  this.state.payments_type,
                  { price: this.state.price.price, currency: target.value },
                  this.state.payment_number,
                  this.state.date_pay
                );
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
        <p className="black">Дата оплаты</p>
        <input
          type="date"
          placeholder="18.10.2021"
          value={this.state.date_pay}
          name="date"
          onChange={({ target }) => {
            this.setState({ date_pay: target.value });
            if (
              this.state.payments_type &&
              target.value &&
              this.state.price.price &&
              this.state.price.currency
            )
              this.props.updateObjPayment(
                this.state.payments_type,
                {
                  price: this.state.price.price,
                  currency: this.state.price.currency,
                },
                this.state.payment_number,
                target.value
              );
          }}
        />
        <div>
          <select
            className={
              this.props.count <= this.props.index + 1 ? "select1" : "d-none"
            }
            style={{ border: "1px solid lightgrey" }}
            onChange={() => {
              if (
                this.state.payments_type &&
                this.state.date_pay &&
                this.state.price.price &&
                this.state.price.currency
              )
                this.props.updatePayment(
                  this.state.payments_type,
                  this.state.price,
                  this.state.payment_number,
                  this.state.date_pay
                );
              else {
                alert("Заполните поля");
              }
            }}
          >
            <option value="" disabled selected>
              Добавить оплату
            </option>
            <option value={`PAYMENT_ORDER`}>Платежное поручение (банк)</option>
            <option value={`RECEIPT`}>Квитанция (наличные)</option>
            <option value={`CHEQUE`}>Чек КСА (наличные)</option>
            <option value={`POS`}>Терминал (по карте)</option>
            <option value={`OTHER`}>Иное</option>
          </select>
        </div>
      </div>
    );
  }
}
