import React, { useEffect, useState } from "react";
import "../style.css";
import "../Modal.css";
import { city__name } from "../../API/http";

const ReadClient = ({ onClose, client }) => {
  const [city, setCity] = useState("");
  useEffect(() => {
    (async function () {
      const result = await city__name({
        id: client.city_id,
      });
      if (result.message) {
        setCity("Unknown City");
      } else {
        const fullCity = result.type_abbr + ". " + result.city;
        setCity(fullCity);
      }
    })();
  }, [client]);
  return (
    <div className="modal" id="id03">
      <form class="modal-content2 animate" style={{ padding: "0 5px" }}>
        <div class="imgcontainer">
          <span className="close" onClick={onClose} title="Close Modal">
            ×
          </span>
          <p class="reg">Просмотр клиента</p>
        </div>
        <div className="container3">
          <div className="read_client">{client.name}</div>
          <div className="read_client">{client.unp}</div>
          <div className="read_client">{client.phone}</div>
          <div className="read_client">{client.type}</div>
          <div className="read_client">
            {city} {client.address}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReadClient;
