import React, { useState, useEffect } from "react";
import Entity from "./forms/Entity";
import "../style.css";
import "../Modal.css";
import Entrepreneur from "./forms/Entrepreneur";
import Individual from "./forms/Individual";
import { get_client } from "../../API/http";

const UpdateClient = ({ client, deleteClient }) => {
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
          <span
            className="close"
            onClick={this.props.onClose}
            title="Close Modal"
          >
            ×
          </span>
          <p className="reg">Новый клиент</p>
          <p style={{ color: "red" }}>{this.state.error}</p>
        </div>

        {currentClient &&
          currentClient.otype !== 0 &&
          currentClient.otype !== 6 && <Entity client={currentClient} />}
        {currentClient && currentClient.otype === 0 && (
          <Entrepreneur client={currentClient} />
        )}
        {currentClient && currentClient.otype === 6 && (
          <Individual client={currentClient} />
        )}
      </form>
    </div>
  );
};

export default UpdateClient;
