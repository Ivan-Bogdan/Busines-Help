import React, { useState, useEffect } from "react";
import { delete_task, city__name } from "../../API/http";
import Modal from "../Modal";
import UpdateTask from "./UpdateTask";
import ReadTask from "./ReadTask";

const Task = ({ task }) => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [isReadTask, setIsReadTask] = useState(false);
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    async function func() {
      if (task.additional_task.route.length === 1) {
        const result = await city__name({
          id: task.additional_task.route[0].city,
        });
        if (result.message) {
          setCityName("Unknown");
        } else {
          setCityName(result.city);
        }
      } else if (task.additional_task.route.length > 1) {
        const cityOne = await city__name({
          id: task.additional_task.route[0].city,
        });
        const cityTwo = await city__name({
          id:
            task.additional_task.route[task.additional_task.route.length - 1]
              .city,
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

  const FetchData = async () => {
    const result = await delete_task({ task_id: task.id });
    if (result.message) {
      console.log(result.message);
    }
    window.location.reload();
  };

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
        <div className="task_price">{task.price} BYN</div>

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
                    FetchData();
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
