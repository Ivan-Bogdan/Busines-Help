import React, { useState, useCallback } from "react";
import Modal from "../Modal";
import ReadClient from "./ReadClient";
import UpdateClient from "./UpdateClient";

const ClientItem = ({ item, deleteClient, FetchData }) => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [isReadСlient, setIsReadСlient] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleModal2 = () => {
    setModal2(!modal2);
  };
  const toogleReadClient = () => {
    setIsReadСlient(!isReadСlient);
  };

  const getNameOtype = useCallback((otype) => {
    switch (otype) {
      case 0:
        return "ИП";
      case 1:
        return "ООО";
      case 2:
        return "ОАО";
      case 3:
        return "ЧУП";
      case 4:
        return "ЧТУП";
      case 5:
        return "ИНОЕ";
      case 6:
        return "ФИЗ ЛИЦО";
      case 7:
        return "СООО";
      case 8:
        return "ЧП";
      case 9:
        return "УП";
    }
  }, []);

  return (
    <div className="client_container">
      <div className="additional" onClick={toogleReadClient}>
        <div className="content_client normclick" style={{ width: "100%" }}>
          {item.name && (
            <div className="client_name">{`${getNameOtype(item.otype)} "${
              item.name
            }"`}</div>
          )}
          {item.full_name && (
            <div className="client_name">{`${getNameOtype(item.otype)} "${
              item.full_name.family
            } ${item.full_name.name} ${item.full_name.patronymic}"`}</div>
          )}
          {item.unp && <div className="client_unp">{item.unp}</div>}
        </div>
      </div>
      <div style={{ paddingRight: "30px" }}>
        <button className="editing" onClick={toggleModal} />
      </div>
      <Modal isShowing={modal}>
        <div className="modal" id="id01">
          <form className="modal-signin animate">
            <div className="imgcontainer">
              <span className="close" onClick={toggleModal} title="Close Modal">
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
      {modal2 && (
        <UpdateClient
          onClose={toggleModal2}
          client={item.id}
          FetchData={FetchData}
        />
      )}
      {isReadСlient && <ReadClient onClose={toogleReadClient} client={item} />}
    </div>
  );
};

export default ClientItem;
