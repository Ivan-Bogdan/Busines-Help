import React, { useEffect, useState } from "react";
import { city__name, delete_client } from "../../API/http";
import Modal from "../Modal";
import UpdateClient from "./UpdateClient";

const ClientItem = ({ item, deleteClient }) => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [isReadTask, setIsReadTask] = useState(false);
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    (async function () {
      const result = await city__name({
        id: item.city_id,
      });
      if (result.message) {
        setCityName("Unknown");
      } else {
        setCityName(result.city);
      }
    })();
  }, [item]);

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
    <div className="client_container">
      <div className="content_client">
        <div className="client_name">{item.name}</div>
        <div className="client_unp">{item.unp}</div>
        <div className="client_address">
          {cityName} {item.address}
        </div>
      </div>
      <button className="editing" onClick={toggleModal} />
      <div className="App">
        <Modal isShowing={modal}>
          <div className="modal" id="id01">
            <form className="modal-signin animate">
              <div className="imgcontainer">
                <span
                  className="close"
                  onClick={toggleModal}
                  title="Close Modal"
                >
                  ×
                </span>
                <p className="reg"></p>
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
                    deleteClient(item.id);
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
        <UpdateClient onClose={toggleModal2} client={item.id}></UpdateClient>
      )}
      {/* 
      {isReadTask && <ReadTask onClose={toogleReadTask} task={item.id} />} */}
    </div>
  );
};

export default ClientItem;
