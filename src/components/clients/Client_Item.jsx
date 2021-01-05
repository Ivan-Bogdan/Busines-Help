import React, { useState } from "react";
import Modal from "../Modal";

const Client_Item = ({ item }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="client_container">
      <div className="content_client">
        <div className="client_name">{item.name}</div>
        <div className="client_unp">{item.unp}</div>
        <div className="client_address">{item.address}</div>
      </div>
      <button className="editing" onClick={toggleModal}/>
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
                  }}
                >
                  Редактировать
                </button>

                <button
                  type="submit"
                  className="button5"
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                >
                  Удалить
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Client_Item;
