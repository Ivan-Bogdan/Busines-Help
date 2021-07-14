import React, { useState, useEffect } from 'react';
import icon_delete from "../../assets/img/удалить.png";

const Pay = ({ data, count, index, updatePayment, payments, setPayments }) => {
  const [payments_type, setPayment_type] = useState("CASH");
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("BYN");
  const [payment_number, setPayment_number] = useState("");
  const [date_pay, setDate_pay] = useState("");

  useEffect(() => {
    if (data) {
      setPayment_type(data.payments_type)
      setPrice(data.price.price)
      setCurrency(data.price.currency)
      setPayment_number(data.payment_number)
      setDate_pay(data.date_pay.substr(0, 10))
    }
  }, [data])

  return (
    <div className="p5-background">
      <div className="flex m25-0">
        <select
          className="select1"
          style={{ border: "1px solid lightgrey" }}
          value={payments_type}
          onChange={(data) => setPayment_type(data.target.value)}
        >
          <option value={`CASH`}>Наличные</option>
          <option value={`REMITTANCE`}>Денежный перевод</option>
        </select>
        <img
          src={icon_delete}
          className="delete_icon"
          height={34}
          onClick={() => {
            if (data) setPayments(payments.filter(item => item.id !== data.id))
            else {
              setPayment_number("");
              setDate_pay("");
              setPrice(0);
              setCurrency("BYN");
            }
          }}
          alt="delete"
        />
      </div>

      {payments_type === "REMITTANCE" && (
        <div>
          <p className="black">Номер платежа</p>
          <input
            type="text"
            placeholder="154"
            value={payment_number}
            onChange={(data) => setPayment_number(data.target.value)}
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
          value={price}
          name="price"
          onChange={({ target: { value } }) => setPrice(value)}
        />
        <select
          className="select_price"
          value={currency}
          onChange={({ target: { value } }) => setCurrency(value)}
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
        value={date_pay}
        name="date"
        onChange={({ target: { value } }) => setDate_pay(value)}
      />
      <div>
        <select
          className={
            count <= index + 1 ? "select1" : "d-none"
          }
          style={{ border: "1px solid lightgrey" }}
          onChange={() => {
            if (payments_type && date_pay && price && currency) {
              const resultPrice = { price, currency };
              updatePayment(payments_type, resultPrice, payment_number, date_pay);
              setPayment_type("CASH");
              setPrice(0);
              setCurrency("BYN");
              setPayment_number("");
              setDate_pay("");
            }
            else {
              alert("Заполните все поля");
            }
          }}
        >
          <option value="" disabled selected>
            Добавить оплату
          </option>
          <option value={`CASH`}>Наличные</option>
          <option value={`REMITTANCE`}>Денежный перевод</option>
        </select>
      </div>
    </div>
  );
};

export default Pay;