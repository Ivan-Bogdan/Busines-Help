import React, { useState, useCallback, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import { update_task, get_task, get_client, find_client } from "../../API/http";
import RouteUpdate from "./RouteUpdate";
import Doc from "./Doc";
import Payment from "./Payment";
import Pay from "./Pay";
import "./styleTask.css";
import { getNameOtype } from "../../helpers";

const renderSuggestion = (client) => <span>{`${client.full_name ? getNameOtype(client.otype, client.full_name.name, client.full_name.patronymic, client.full_name.family) : getNameOtype(client.otype, client.name)}`}</span>;

const UpdateTask = ({ task, FetchData, onClose }) => {
  const [fullTask, setFullTask] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("BYN");
  const [performer, setPerformer] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [paid, setPaid] = useState("");

  const [routes, setRoutes] = useState(null);
  const [countRoute, setCountRoute] = useState(0)

  const [payments, setPayments] = useState(null)
  const [countPayments, setCountPayments] = useState(0)

  const [client, setClient] = useState("");
  const [clientId, setClientId] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const updatePayments = (payments_type, price, payment_number, date_pay) => {
    setPayments([...payments, { payments_type, price, payment_number, date_pay }])
    setCountPayments(countPayments + 1)
  };

  const updateData = useCallback((address, city) => {
    setRoutes([...routes, { address, city, point: countRoute }]);
    setCountRoute(countRoute + 1)
  }, [routes, countRoute]);

  const updateTask = useCallback(
    async (e) => {
      e.preventDefault();
      let payload = {
        task_id: task,
        client: clientId,
        name,
        date,
        price: { price, currency },
        type,
        status,
        paid,
        route: routes,
      };
      const result = await update_task(payload);
      if (result.message === "OK") onClose();
      else console.log(result.message);
      FetchData();
    },
    [task, clientId, name, date, price, currency, type, status, paid, routes, onClose]
  );

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
    async function func() {
      if (fullTask && fullTask.client) {
        const result = await get_client({
          id: fullTask.client,
        });
        const { client } = result;
        setClient(client.full_name ? getNameOtype(client.otype, client.full_name.name, client.full_name.patronymic, client.full_name.family) : getNameOtype(client.otype, client.name));
      }
    }
    func();
  }, [fullTask]);

  useEffect(() => {
    if (fullTask) {
      setName(fullTask.name);
      setClientId(fullTask.client);
      if (fullTask.date) setDate(fullTask.date.slice(0, 10));
      setPrice(fullTask.price.price);
      setCurrency(fullTask.price.currency);
      setPerformer(fullTask.performer);
      setType(fullTask.type);
      setStatus(fullTask.status);
      setPaid(fullTask.paid);
      setRoutes(fullTask.route);
      setCountRoute(fullTask.route.length);
      setPayments(fullTask.payments);
      setCountPayments(fullTask.payments.length)
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
                setPrice(Number(value));
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

          {type === 0 && (
            <div>
              <p className="black">Маршрут погрузки</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="routelist">
                  {routes.sort((a, b) => a.point - b.point).map((item) => (
                    <RouteUpdate
                      data={item}
                      number={item.point}
                      count={routes.length + 1}
                      updateData={updateData}
                      routes={routes}
                      setRoutes={setRoutes}
                    />
                  ))}

                  <RouteUpdate
                    key={countRoute}
                    updateData={updateData}
                    number={countRoute}
                    count={countRoute}
                  />

                </div>
              </div>
            </div>
          )}
          <p className="black">Статус услуги</p>
          <select
            style={{ border: "1px solid lightgrey" }}
            className="select1"
            value={status}
            onChange={({ target: { value } }) => setStatus(Number(value))}
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
            onChange={({ target: { value } }) => setPaid(Number(value))}
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
          {paid === 1 && (
            <div>
              {payments.map((item, index) => (
                <Pay
                  data={item}
                  index={index + 2}
                  count={countPayments}
                  updatePayment={updatePayments}
                />
              ))}
              <Pay
                index={countPayments - 1}
                count={countPayments}
                updatePayment={updatePayments}
              />
            </div>
          )}

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
