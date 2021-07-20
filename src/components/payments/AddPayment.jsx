import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { find_client } from '../../API/http';
import { getNameOtype } from '../../helpers';

const renderSuggestion = (client) => <span>{`${client.full_name ? getNameOtype(client.otype, client.full_name.name, client.full_name.patronymic, client.full_name.family) : getNameOtype(client.otype, client.name)}`}</span>;

const AddPayment = ({ payment, createPayment, updatePayment, onClose }) => {

  const [suggestions, setSuggestions] = useState([]);

  const [client, setClient] = useState("")
  const [clientId, setClientId] = useState("")
  const [typeOfPayment, setTypeOfPayment] = useState("")
  const [numberOfPayment, setNumberOfPayment] = useState("")
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("BYN");
  const [date_pay, SetDate_pay] = useState("");


  const onChange = (event, { newValue, method }) => {
    setClient(newValue);
  };

  const getSuggestionValue = (suggestion) => {
    setClientId(suggestion.id);
    return suggestion.full_name && getNameOtype(suggestion.otype, suggestion.full_name.name, suggestion.full_name.patronymic, suggestion.full_name.family) || suggestion.name && getNameOtype(suggestion.otype, suggestion.name)
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    find_client(value)
      .then((responce) => {
        setSuggestions(responce.data.clients);
      });
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Клиент",
    value: client,
    onChange: onChange,
  };

  return (
    <div className="modal" id="id01">
      <form className="modal-content2 animate">
        <div className="imgcontainer">
          <span
            className="close"
            onClick={onClose}
            title="Close Modal"
          >
            ×
          </span>
          <p className="reg">Новый платеж</p>
        </div>

        <div className="container3">
          <div style={{ marginTop: 15 }}>
            <p className="black">Клиент</p>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
            <p className="black">Вид оплаты</p>
            <select
              style={{ border: "1px solid #ccc" }}
              required
              className="select1"
              value={typeOfPayment}
              onChange={({ target: { value } }) => setTypeOfPayment(value)}
            >
              <option value={`CASH`}>Наличные</option>
              <option value={`REMITTANCE`}>Денежный перевод</option>
            </select>
            {typeOfPayment === "REMITTANCE" &&
              <div>
                <p className="black">Номер платежа</p>
                <input
                  type="text"
                  placeholder="123"
                  value={numberOfPayment}
                  onChange={({ target: { value } }) => setNumberOfPayment(value)}
                />
              </div>
            }
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
              placeholder="15.04.2021"
              value={date_pay}
              onChange={({ target: { value } }) => SetDate_pay(value)}
            />
            <p className="black">Прикрепить акт</p>

            <div style={{ textAlign: "center" }}>
              {payment ? (
                <button className="button5" onClick={updatePayment}>
                  Обновить
                </button>
              ) : (
                <button className="button5" onClick={() => {
                  const payload = {
                    payments_type: typeOfPayment,
                    client: clientId,
                    price: { price, currency },
                    payment_number: numberOfPayment,
                    date_pay,
                    tasks: []
                  };
                  createPayment(payload);
                }}>
                  Создать
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPayment;