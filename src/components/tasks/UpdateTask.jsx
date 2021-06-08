import React, { useState, useCallback, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import { update_task, get_task } from "../../API/http";
import Route from "./Route";
import Doc from "./Doc";
import Payment from "./Payment";
import "./styleTask.css";

const renderSuggestion = (suggestion) => (
  <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.8 }}>
    <span>
      {" "}
      {suggestion.type_abbr}. {suggestion.city}{" "}
    </span>{" "}
    <div>
      {suggestion.city !== suggestion.district && (
        <span style={{ color: "#aaa", fontSize: 12 }}>
          {suggestion.district} р-н,
        </span>
      )}{" "}
      <span style={{ color: "#aaa", fontSize: 12 }}>{suggestion.region} </span>
    </div>
  </div>
);

const UpdateTask = ({ task, onClose }) => {
  const [fullTask, setFullTask] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("BYN");
  const [performer, setPerformer] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [paid, setPaid] = useState("");
  const [city, setCity] = useState("");
  const [city_id, setCity_id] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const updateTask = useCallback((e) => {
    e.preventDefault();
    let payload = {};
    update_task(payload).then((data) => {
      if (data.message) {
        this.setState({ error: data.message });
      } else {
        window.location.reload();
      }
    });
  }, []);

  const onChange = (event, { newValue, method }) => {
    setCity(newValue);
  };

  const getSuggestionValue = (suggestion) => {
    setCity_id(suggestion.id);
    return suggestion.city;
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    fetch(`http://altproduction.ru:8080/rest/v1/city/`, {
      method: "POST",
      body: JSON.stringify({
        city: value,
        limit: 10,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data.city);
      });
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Населеный пункт",
    value: city,
    onChange: onChange,
  };

  useEffect(() => {
    async function func() {
      if (task) {
        const result = await get_task({
          task_id: task,
        });
        setFullTask(result.task);
      }
    }
    func();
  }, [task]);

  useEffect(() => {
    if (fullTask) {
      setName(fullTask.name);
      if (fullTask.date) setDate(fullTask.date.slice(0, 10));
      setPrice(fullTask.price.price);
      setCurrency(fullTask.price.currency);
      setPerformer(fullTask.performer);
      setType(fullTask.type);
      setStatus(fullTask.status);
      setPaid(fullTask.paid);
    }
  }, [fullTask]);

  return (
    <div className="modal" id="id01">
      <form className="modal-content2 animate">
        <div className="imgcontainer">
          <span className="close" onClick={onClose} title="Close Modal">
            ×
          </span>
          <p className="reg">Изменение услуги</p>
        </div>
        <div className="container3">
          <p className="black">Наименование услуги</p>
          <input
            type="text"
            placeholder="Создание сервиса поиска"
            value={name}
            name="name"
            onChange={({ target: { value } }) => {
              setName(value);
            }}
          />
          <p className="black">Клиент</p>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          <p className="black">Дата</p>
          <input
            type="date"
            placeholder="18.10.2021"
            value={date}
            name="date"
            onChange={({ target: { value } }) => {
              setDate(value);
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
              value={price}
              name="price"
              onChange={({ target: { value } }) => {
                setPrice(value);
              }}
            />
            <select
              className="select_price"
              value={currency}
              onChange={({ target: { value } }) => {
                setCurrency(value);
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
            value={performer}
            name="performer"
            onChange={({ target: { value } }) => setPerformer(value)}
          />
          <p className="black">Тип услуги</p>
          <select
            style={{ border: "1px solid lightgrey" }}
            required
            className="select1"
            value={type}
            onChange={({ target: { value } }) => setType(value)}
          >
            <option value="" disabled selected>
              Грузоперевозка
            </option>
            <option style={{ color: "black" }} value={Number(0)}>
              Грузоперевозка
            </option>
          </select>

          {/* {type === "0" && (
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
          )} */}
          <p className="black">Статус услуги</p>
          <select
            style={{ border: "1px solid lightgrey" }}
            className="select1"
            value={status}
            onChange={({ target: { value } }) => setStatus(value)}
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
            value={paid}
            onChange={({ target: { value } }) => setPaid(value)}
          >
            <option value="" disabled defaultValue style={{ display: "none" }}>
              Оплачено/Неоплачено
            </option>
            <option type="number" value={Number(0)}>
              Не оплачено
            </option>
            <option type="number" value={Number(1)}>
              Оплачено
            </option>
          </select>
          {/* {paid === "1" && (
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
          )} */}

          {/* <Doc
            count={this.state.countDoc}
            updateDoc={this.updateDoc}
            updateObjDoc={this.updateObjDoc}
            index={-1}
            key={-1}
          /> */}
          {/* 
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
          ))} */}

          <div style={{ textAlign: "center" }}>
            <button type="submit" className="button5" onClick={updateTask}>
              Обновить
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
