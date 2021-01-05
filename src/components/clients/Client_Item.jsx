import React from "react";

const Client_Item = ({ item }) => {
  return (
    <div className="client_container">
      <div className="content_client">
        <div className="client_name">{item.name}</div>
        <div className="client_unp">{item.unp}</div>
        <div className="client_address">{item.address}</div>
      </div>
      <button className="editing" />
    </div>
  );
};

export default Client_Item;
