import React, { useState, useEffect } from "react";
import { city__name } from "../../API/http";
import Modal from "../Modal";
import UpdateTask from "./UpdateTask";
import ReadTask from "./ReadTask";

const Task = ({ task, deleteTask }) => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [isReadTask, setIsReadTask] = useState(false);
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    async function func() {
      if (task.route.length === 1) {
        const result = await city__name({
          id: task.route[0].city,
        });
        if (result.message) {
          setCityName("Unknown");
        } else {
          setCityName(result.city);
        }
      } else if (task.route.length > 1) {
        const cityOne = await city__name({
          id: task.route[0].city,
        });
        const cityTwo = await city__name({
          id: task.route[task.route.length - 1].city,
        });
        if (cityOne.message || cityTwo.message) {
          setCityName("Unknown");
        } else {
          setCityName(cityOne.city + "-" + cityTwo.city);
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
    <div
      className={
        task.status === 3
          ? "task_container background_grey"
          : task.status === 2 && task.paid === 1
          ? "task_container background_green"
          : task.status === 2 && task.paid === 0
          ? "task_container background_orange"
          : (task.status === 1 && task.paid === 1) ||
            (task.status === 0 && task.paid === 1)
          ? "task_container background_blue"
          : (task.status === 1 && task.paid === 0) ||
            (task.status === 0 && task.paid === 0)
          ? "task_container background_yellow"
          : null
      }
    >
      <div className="content_task" onClick={toogleReadTask}>
        <div className="task_date">
          {new Date(task.date).toLocaleString().substr(0, 10)}
        </div>
        <div className="task_name">{task.name}</div>
        <div className="task_price">{task.price.price} BYN</div>

        {task.status === 0 && <div className="task_status">К выполнению</div>}
        {task.status === 1 && <div className="task_status">В работе</div>}
        {task.status === 2 && <div className="task_status">Завершен</div>}
        {task.status === 3 && <div className="task_status">Отменен</div>}
        {(Boolean(task.paid) && <div className="task_paid"> Опл</div>) || (
          <div className="task_paid"> Не опл</div>
        )}
        <div className="task_route">{cityName}</div>
      </div>
      <button className="editing" onClick={toggleModal} />

      <div className="main container_task">
        <div className="greenlight">
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
            <div className="block1">
              <div className="price color-green">{`${task.price.price} ${task.price.currency}`}</div>
              <div>
                <div className="paid">Оплачено/Долг</div>
                <div className="price-debt">
                  <span className="color-green">2000,00 </span>/ 0
                </div>
              </div>
            </div>
            <div className="block3">
              <div className="w407">
                <div className="task_name">ОАО "Кирпич-комплект"</div>
                <div className="fz20 color-grey">{cityName}</div>
                <div className="fw600 fz20">{task.name}</div>
              </div>
              <div>
                <img className="cursor" src={img251} alt="" width={40}></img>
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
                  className="button5"
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
                  className="button5"
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
        <UpdateTask onClose={toggleModal2} task={task.id}></UpdateTask>
      )}
      {isReadTask && <ReadTask onClose={toogleReadTask} task={task.id} />}
    </div>
  );
};

export default Task;
