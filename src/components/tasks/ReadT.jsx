import React, { useState, useEffect } from "react";
import { get_client } from "../../API/http";
import RouteRead from "./RouteRead";
import "./styleTask.css";

const ReadT = ({ onClose, task }) => {
  const [client, setClient] = useState("");

  useEffect(() => {
    async function func() {
      if (task.client) {
        const clientCurrent = await get_client({
          id: task.client,
        });
        setClient(clientCurrent.client.name);
      }
    }
    func();
  }, [task]);

  return (
    <div className="modal" id="id01">
      <form className="modal-content2 animate">
        <div className="imgcontainer">
          <span className="close" onClick={onClose} title="Close Modal">
            ×
          </span>
          <p className="reg">ПРОСМОТР УСЛУГИ</p>
        </div>

        <div className="container3">
          <p className="black">Наименование услуги</p>
          <input type="text" value={task.name} disabled />
          <p className="black">Клиент</p>
          <input type="text" value={client} disabled />
          <p className="black">Дата</p>
          <input
            type="date"
            value={task.date.substr(0, 10)}
            name="date"
            disabled
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
              value={task.price.price}
              name="price"
              disabled
            />
            <select
              className="select_price"
              value={task.price.currency}
              style={{ border: "1px solid lightgrey", background: "none" }}
              disabled
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
            name="performer"
          />
          <p className="black">Тип услуги</p>
          <select
            style={{ border: "1px solid lightgrey", background: "none" }}
            required
            className="select1"
            value={task.type}
            disabled
          >
            <option value="" disabled selected>
              Грузоперевозка
            </option>
            <option style={{ color: "black" }} value={Number(0)}>
              Грузоперевозка
            </option>
          </select>

          {task.route.length > 0 && (
            <div>
              <p className="black">Маршрут погрузки</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {task.route.map((route) => (
                  <RouteRead city={route.city} address={route.address} />
                ))}
              </div>
            </div>
          )}
          <p className="black">Статус услуги</p>
          <select
            style={{ border: "1px solid lightgrey", background: "none" }}
            className="select1"
            value={task.status}
            disabled
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
            style={{ border: "1px solid lightgrey", background: "none" }}
            className="select1"
            value={task.paid}
            disabled
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
        </div>
      </form>
    </div>
  );
};

export default ReadT;
