import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { find_client } from '../../API/http';
import { getNameOtype } from '../../helpers';

const renderSuggestion = (client) => <span>{client}</span>;

const AddPayment = ({ payment, createPayment, updatePayment, onClose }) => {

  const [suggestions, setSuggestions] = useState([]);

  const [client, setClient] = useState("")
  const [typeOfPayment, setTypeOfPayment] = useState("")
  const [numberOfPayment, setNumberOfPayment] = useState("")
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("BYN");


  const onChange = (event, { newValue, method }) => {
    setClient(newValue);
  };

  const getSuggestionValue = (suggestion) => {
    setClient(suggestion.id);
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

            <div style={{ textAlign: "center" }}>
              {payment ? (
                <button className="button5" onClick={updatePayment}>
                  Обновить
                </button>
              ) : (
                <button className="button5" onClick={createPayment}>
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