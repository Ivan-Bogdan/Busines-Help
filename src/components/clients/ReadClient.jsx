import React from "react";

const ReadClient = ({ onClose, client }) => {
  return (
    <div className="modal" id="id03">
      <form class="modal-content2 animate" style={{ padding: "0 25px" }}>
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
        <div>{client.name}</div>
        <div>{client.unp}</div>
        <div>{client.phone}</div>
        <div>{client.name}</div>
      </form>
    </div>
  );
};

export default ReadClient;
