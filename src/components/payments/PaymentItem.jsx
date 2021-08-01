import React, { useState, useEffect, useCallback } from "react";
import { get_client, update_payment } from "../../API/http";
import { getNameOtype } from "../../helpers";
import Modal from "../Modal";
import AddPayment from './AddPayment'
import img251 from "../../assets/img/kisspng-button-computer-icons-editing-encapsulated-postscr-5b3b488b1c1ac4.9135163415306118511151.png";
import './stylePayment.css'

const PaymentItem = ({ item, deleteItem, FetchData }) => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [isReadPayment, setIsReadPayment] = useState(false);
  const [client, setClient] = useState("");

  const updatePayment = useCallback(
    async (data) => {
      const result = await update_payment(data);
      if (result.message === "OK") {
        setModal2(false);
        FetchData();
      } else alert("Не удалось выполнить запрос")
    },
    []
  );

  useEffect(() => {
    const func = async () => {
      if (item && item.client) {
        const clientCurrent = await get_client({
          id: item.client,
        });
        const { client } = clientCurrent;
        setClient(client.full_name ? getNameOtype(client.otype, client.full_name.name, client.full_name.patronymic, client.full_name.family) : getNameOtype(client.otype, client.name));
      }
    };
    func();
  }, [item]);


  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleModal2 = () => {
    setModal2(!modal2);
  };
  const toogleReadPayment = () => {
    setIsReadPayment(!isReadPayment);
  };

  return (
    <div className="container_payment">
      <div className="main container_task">
        <div
          className={
            (item.residue < item.price.price && item.price.price !== item.residue && "bluelight") ||
            (item.residue === 0 && "greenlight") ||
            (item.residue === item.price.price && "redlight")
          }
          onClick={toogleReadPayment}
        >
          <div className="title">
            <div>
              {new Date(item.date_pay).toLocaleString().substr(0, 10)}
            </div>
            {item.residue < item.price.price && (
              <div className="color-lightblue">В работе</div>
            )}
            {item.residue === 0 && item.price.price !== item.residue && <div className="color-green">Разнесено</div>}
            {item.residue === item.price.price && <div className="color-red">Создано</div>}
          </div>
        </div>
        <div>
          <div className="flex-payment">
            <div className="block4" onClick={toogleReadPayment}>
              <div style={{ paddingRight: 50 }}>
                <div className="price_pay">{`${item.price.price.toFixed(2)} ${item.price.currency}`}</div>
                <div className="color-grey fw500" style={{ fontSize: 18 }}>
                  {item && item.payment_number}
                </div>
              </div>
              <div onClick={toogleReadPayment}>
                <div className="pay_name">{client}</div>
              </div>
            </div>
            <div>
              <img
                className="cursor"
                src={img251}
                onClick={toggleModal}
                alt=""
                width={40}
              />
            </div>
          </div>
        </div>
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
                  deleteItem(item.id);
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
        <AddPayment
          paymentId={item.id}
          onClose={toggleModal2}
          updatePayment={updatePayment}
          FetchData={FetchData}
        />
      )}
      {isReadPayment && (
        <AddPayment
          paymentId={item.id}
          onClose={toogleReadPayment}
          isRead
        />
      )}
    </div>
  );
};

export default PaymentItem;
