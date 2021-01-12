import React from "react";

const ReadClient = ({ onClose, client }) => {
  return (
    <div>
      <div>{client.name}</div>
      <div>{client.unp}</div>
      <div>{client.phone}</div>
      <div>{client.name}</div>
    </div>
  );
};

export default ReadClient;
