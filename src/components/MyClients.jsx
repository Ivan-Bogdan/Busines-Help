import React, { useState } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import AddClient from "./clients/AddClient";
import Client from "./clients/Client_Item";
import clients from "./clients/data.json";
const MyClients = () => {
  const [isCreateClient, setCreateClient] = useState(false);

  const toggleCreateClient = () => {
    setCreateClient(!isCreateClient);
  };

  return (
    <div>
      <Navbar />
      <section>
        <div className="container">
          <div className="flex" style={{ marginBottom: "20px" }}>
            <button
              type="submit"
              className="button_create"
              onClick={toggleCreateClient}
            >
              Создать
            </button>
            <button className="sorting"></button>
          </div>
          {clients.clients.map((item, acc) => (
            <div key={acc} className="client_item">
              <Client key={acc} item={item} />
            </div>
          ))}
        </div>
      </section>
      <Footer />
      <div className="App">
        {isCreateClient && <AddClient onClose={toggleCreateClient}></AddClient>}
      </div>
    </div>
  );
};

export default MyClients;
