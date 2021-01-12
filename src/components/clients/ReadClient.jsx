import React from "react";

const ReadClient = ({ onClose, client }) => {
  return (
    <div className="modal" id="id03">
      <form class="modal-content2 animate" style={{ padding: "0 5px" }}>
        <div class="imgcontainer">
          <span
            className="close"
            onClick={onClose}
            title="Close Modal"
          >
            ×
          </span>
          <p class="reg">Просмотр клиента</p>
        </div>
        <div className="read_client">{client.name}</div>
        <div className="read_client">{client.unp}</div>
        <div className="read_client">{client.phone}</div>
        <div className="read_client">{client.type}</div>
        <div className="read_client">{client.city_id}</div>
        <div className="read_client">{client.address}</div>
      </form>
    </div>
  );
};

export default ReadClient;
