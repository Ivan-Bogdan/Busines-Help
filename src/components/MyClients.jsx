import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Client from "./clients/Client_Item";
import clients from "./clients/data.json";
const MyClients = () => {
  return (
    <div>
      <Navbar />
      <section>
        <div className="container">
          <div className="flex" style={{ marginBottom: "20px" }}>
            <button type="submit" className="button_create">
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
    </div>
  );
};

export default MyClients;
