import React, { useCallback, useEffect, useState } from "react";
import {
  create_client,
  delete_client,
  get_client_list,
} from "../API/http";
import Footer from "../Footer";
import Navbar from "../Navbar";
import AddClient from "./clients/AddClient";
import * as FPJS from "@fingerprintjs/fingerprintjs";
import ClientItem from "./clients/ClientItem";

const getHashable = (components) => {
  return components.map((component) => component.value).join("");
};

const MyClients = () => {
  const [error, setError] = useState(false);
  const [fingerprint, setFingerprint] = useState("");
  const [count, setCount] = useState(0);
  const [isCreateClient, setCreateClient] = useState(false);
  const [clients, setClients] = useState([]);
  const [selectedTaskPage, setSelectedTaskPage] = useState(0);
  const [limit] = useState(10);
  const [desc, setDesc] = useState(false);
  const [sort, setSort] = useState("name");

  const FetchData = useCallback(async () => {
    let payload = {
      limit: limit,
      offset: selectedTaskPage * 10,
      sort: sort,
      desc: desc,
    };
    const result = await get_client_list(payload);
    if (result.message) {
      setError(result.message);
    } else {
      setCount(result.count);
      setClients(result.clients);
      return setError("");
    }
  }, []);

  const createClient = async (name, unp, phone, type, city, address) => {
    let payload = {
      name: name,
      unp: unp,
      phone: phone,
      type: parseInt(type, 10),
      date: Date.now(),
      city_id: city,
      address: address,
    };
    const result = await create_client(payload);
    if (result.message) {
      alert(result.message);
    } else {
      setCreateClient(false);
      FetchData();
    }
  };

  const toggleCreateClient = () => {
    setCreateClient(!isCreateClient);
  };

  const deleteClient = useCallback(
    async (item) => {
      const result = await delete_client({ id: item });
      if (result.message) {
      }
      FetchData();
    },
    [clients]
  );

  useEffect(() => {
    FetchData();
  }, []);

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
          {clients.map((item, index) => (
            <div key={index} className="client_item">
              <ClientItem
                item={item}
                deleteClient={deleteClient}
                FetchData={FetchData}
              />
            </div>
          ))}
        </div>
      </section>
      <Footer />
      <div className="App">
        {isCreateClient && (
          <AddClient
            onClose={toggleCreateClient}
            FetchData={FetchData}
          ></AddClient>
        )}
      </div>
    </div>
  );
};

export default MyClients;
