import React, { useState, useEffect } from "react";
import { city__name } from "../../API/http";
import { getNameOtype } from "../../helpers";
import Modal from "../Modal";
import ReadClient from "./ReadClient";
import UpdateClient from "./UpdateClient";

const ClientItem = ({ item, deleteClient, FetchData }) => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [isReadСlient, setIsReadСlient] = useState(false);
  const [currentCity, setCurrentCity] = useState("");

  useEffect(() => {
    if (item && item.reg_address && item.reg_address.city) {
      async function func() {
        if (item.reg_address.city) {
          const result = await city__name({
            id: item.reg_address.city,
          });
          setCurrentCity(`${result.type_abbr}. ${result.city}, ${item.reg_address.address}`);
        }
      }
      func();
    }
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
      <div className="additional" onClick={toogleReadClient}>
        <div className="content_client normclick" style={{ width: "100%" }}>
          {item.name && (
            <div className="client_name">{`${getNameOtype(item.otype, item.name)} `}</div>
          )}
          {item.full_name && (
            <div className="client_name">{`${getNameOtype(item.otype,item.full_name.name,item.full_name.patronymic,item.full_name.family)}`}</div>
          )}
          {item.unp && <div className="client_unp">{item.unp}</div>}
          {item.reg_address && <div className="client_address">{currentCity}</div>}
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
