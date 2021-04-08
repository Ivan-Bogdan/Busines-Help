import React, { useEffect, useState } from "react";
import { city__name, delete_client } from "../../API/http";
import Modal from "../Modal";
import ReadClient from "./ReadClient";
import UpdateClient from "./UpdateClient";

const ClientItem = ({ item, deleteClient }) => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [isReadСlient, setIsReadСlient] = useState(false);
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    (async function () {
      const result = await city__name({
        id: item.city_id,
      });
      if (result.message) {
        setCityName("Unknown");
      } else {
        const fullCity = result.type_abbr + ". " + result.city;
        setCityName(fullCity);
      }
    })();
  }, [item]);

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleModal2 = () => {
    setModal2(!modal2);
  };
  const toogleReadClient = () => {
    setIsReadСlient(!isReadСlient);
  };

  return (
    <div className="client_container">
      <div className="content_client" onClick={toogleReadClient}>
        <div className="client_name">{item.name}</div>
        <div className="client_unp">{item.unp}</div>
        <div className="client_address">
          {cityName} {item.address}
        </div>
      </div>
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
      <button className="editing" onClick={toggleModal} />
      {modal2 && (
        <UpdateClient
          onClose={toggleModal2}
          client={item.id}
          city={item.city_id}
        ></UpdateClient>
      )}
      {isReadСlient && <ReadClient onClose={toogleReadClient} client={item} />}
    </div>
  );
};

export default ClientItem;
