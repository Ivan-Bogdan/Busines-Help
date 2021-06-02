import React, { useState, useEffect } from "react";
import Entity from "./forms/Entity";
import "../style.css";
import "../Modal.css";
import Entrepreneur from "./forms/Entrepreneur";
import Individual from "./forms/Individual";
import { get_client } from "../../API/http";

const UpdateClient = ({ client, onClose, FetchData }) => {
  const [currentClient, setCurrentClient] = useState(false);

  useEffect(() => {
    const func = async () => {
      if (client) {
        const clientCurrent = await get_client({
          id: client,
        });
        setCurrentClient(clientCurrent.client);
      }
    };
    func();
  }, [client]);

  return (
    <div className="modal" id="id01">
      <form className="modal-content animate">
        <div className="imgcontainer">
          <span className="close" onClick={onClose} title="Close Modal">
            ×
          </span>
          <p className="reg">Редактирование клиента</p>
        </div>
        <div className="container3">
          {currentClient &&
            currentClient.otype !== 0 &&
            currentClient.otype !== 6 && (
              <Entity
                client={currentClient}
                onClose={onClose}
                FetchData={FetchData}
              />
            )}
          {currentClient && currentClient.otype === 0 && (
            <Entrepreneur
              client={currentClient}
              onClose={onClose}
              FetchData={FetchData}
            />
          )}
          {currentClient && currentClient.otype === 6 && (
            <Individual
              client={currentClient}
              onClose={onClose}
              FetchData={FetchData}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateClient;
