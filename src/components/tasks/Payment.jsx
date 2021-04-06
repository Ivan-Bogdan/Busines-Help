import React, { Component } from "react";

export default class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payments_type: "CASH",
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
      <div>
        <p className="black">Вид оплаты</p>
        <select
          className="select1"
          style={{ border: "1px solid lightgrey" }}
          value={this.state.payments_type}
          onChange={(data) => {
            this.setState({ payments_type: data.target.value });
            if (
              this.state.payments_type &&
              this.state.date_pay &&
              this.state.price.price &&
              this.state.price.currency &&
              this.state.payment_number &&
              this.state.date_pay
            )
              this.props.updateObjPayment(
                this.state.payments_type,
                this.state.price,
                this.state.payment_number,
                this.state.date_pay
              );
          }}
        >
          <option value={`CASH`}>CASH</option>
          <option value={`REMITTANCE`}>REMITTANCE</option>
        </select>

        {this.state.payments_type === "REMITTANCE" && (
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
                  this.state.payment_number &&
                  this.state.date_pay
                )
                  this.props.updateObjPayment(
                    this.state.payments_type,
                    this.state.price,
                    this.state.payment_number,
                    this.state.date_pay
                  );
              }}
            />
          </div>
        )}
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
                this.state.price.price &&
                this.state.price.currency &&
                this.state.payment_number &&
                this.state.date_pay
              )
                this.props.updateObjPayment(
                  this.state.payments_type,
                  this.state.price,
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
                this.state.price.currency &&
                this.state.payment_number &&
                this.state.date_pay
              )
                this.props.updateObjPayment(
                  this.state.payments_type,
                  this.state.price,
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
              this.state.date_pay &&
              this.state.price.price &&
              this.state.price.currency &&
              this.state.payment_number &&
              this.state.date_pay
            )
              this.props.updateObjPayment(
                this.state.payments_type,
                this.state.price,
                this.state.payment_number,
                this.state.date_pay
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
            <option value={`CASH`}>CASH</option>
            <option value={`REMITTANCE`}>REMITTANCE</option>
          </select>
        </div>
      </div>
    );
  }
}
