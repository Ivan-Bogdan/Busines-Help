import React, { useState, useEffect } from "react";
import { city__name, get_client } from "../../API/http";
import Modal from "../Modal";
import UpdateTask from "./UpdateTask";
import img251 from "../../assets/img/kisspng-button-computer-icons-editing-encapsulated-postscr-5b3b488b1c1ac4.9135163415306118511151.png";
import ReadT from "./ReadT";
import { getNameOtype } from "../../helpers";

const Task = ({ task, deleteTask, FetchData }) => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [isReadTask, setIsReadTask] = useState(false);
  const [cityName, setCityName] = useState("");
  const [clientCurrent, setClientCurrent] = useState("");

  useEffect(() => {
    async function func() {
      const resultRoutes = task.route.sort((a, b) => a.point - b.point)
      if (resultRoutes.length === 1) {
        const result = await city__name({
          id: resultRoutes[0].city,
        });
        if (result.message) {
          setCityName("Unknown");
        } else {
          setCityName(result.city);
        }
      } else if (resultRoutes.length > 1) {
        const cityOne = await city__name({
          id: resultRoutes[0].city,
        });
        const cityTwo = await city__name({
          id: resultRoutes[resultRoutes.length - 1].city,
        });
        if (cityOne.message || cityTwo.message) {
          setCityName("Unknown");
        } else {
          setCityName(cityOne.city + "-" + cityTwo.city);
        }
      }
      if (task.client) {
        const clientCurrent = await get_client({
          id: task.client,
        });
        if (clientCurrent.client.name) {
          setClientCurrent(getNameOtype(clientCurrent.client.otype, clientCurrent.client.name));
        } else if (clientCurrent.client.full_name) {
          setClientCurrent(getNameOtype(clientCurrent.client.otype, clientCurrent.client.full_name.name, clientCurrent.client.full_name.patronymic, clientCurrent.client.full_name.family));
        }
      }
    }
    func();
  }, [task]);

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleModal2 = () => {
    setModal2(!modal2);
  };
  const toogleReadTask = () => {
    setIsReadTask(!isReadTask);
  };
  return (
    <div>
      <div className="main container_task">
        <div
          className={
            (task.status === 0 && "bluelight") ||
            (task.status === 1 && "bluelight") ||
            (task.status === 2 && "greenlight") ||
            (task.status === 3 && "redlight")
          }
          onClick={toogleReadTask}
        >
          <div className="title">
            <div className="color-grey">
              {new Date(task.date).toLocaleString().substr(0, 10)}
            </div>
            {task.status === 0 && (
              <div className="color-lightblue">К выполнению</div>
            )}

            {task.status === 1 && (
              <div className="color-lightblue">В работе</div>
            )}
            {task.status === 2 && <div className="color-green">Выполнена</div>}
            {task.status === 3 && <div className="color-red">Отменен</div>}
          </div>
        </div>
        <div>
          <div className="flex-task">
            <div className="block1" onClick={toogleReadTask}>
              {task.status === 0 && (
                <div className="price color-blue">{`${task.price.price.toFixed(2)} ${task.price.currency}`}</div>
              )}
              {task.status === 1 && (
                <div className="price color-blue">{`${task.price.price.toFixed(2)} ${task.price.currency}`}</div>
              )}
              {task.status === 2 && (
                <div className="price color-green">{`${task.price.price.toFixed(2)} ${task.price.currency}`}</div>
              )}
              {task.status === 3 && (
                <div className="price color-red">{`${task.price.price.toFixed(2)} ${task.price.currency}`}</div>
              )}

              <div className="flex-end">
                <div className="paid">Оплачено/Долг</div>
                <div className="price-debt">
                  <span className="color-green">
                    {task.price.price - task.residue}
                  </span>
                  / <span className='color-red'>{task.residue}</span>
                </div>
              </div>
            </div>
            <div className="block3">
              <div className="w407" onClick={toogleReadTask}>
                <div className="task_name">{clientCurrent}</div>
                <div className="fz20 color-grey">{cityName}</div>
                <div className="fw600 fz20 ellips" >{task.name}</div>
              </div>
              <div>
                <img
                  className="cursor"
                  src={img251}
                  onClick={toggleModal}
                  alt=""
                  width={40}
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="App">
        <Modal isShowing={modal}>
          <div className="modal" id="id01">
            <form class="modal-signin animate">
              <div class="imgcontainer">
                <span
                  className="close"
                  onClick={toggleModal}
                  title="Close Modal"
                >
                  ×
                </span>
                <p class="reg"></p>
              </div>

              <div className="container3" style={{ display: "block" }}>
                <button
                  type="submit"
                  className="button6"
                  onClick={(event) => {
                    event.preventDefault();
                    setModal(false);
                    setModal2(true);
                  }}
                >
                  Редактировать
                </button>

                <button
                  type="submit"
                  className="button6"
                  onClick={(event) => {
                    event.preventDefault();
                    deleteTask(task.id);
                    setModal(false);
                  }}
                >
                  Удалить
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      {modal2 && (
        <UpdateTask
          task={task.id}
          onClose={toggleModal2}
          FetchData={FetchData}
        />
      )}
      {isReadTask && <ReadT onClose={toogleReadTask} task={task} />}
    </div>
  );
};

export default Task;
