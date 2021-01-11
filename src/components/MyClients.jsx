import React, { useEffect, useState } from "react";
import { authenticate, get_client_list, update_token } from "../API/http";
import Footer from "../Footer";
import Navbar from "../Navbar";
import AddClient from "./clients/AddClient";
import Client from "./clients/Client_Item";
import * as FPJS from "@fingerprintjs/fingerprintjs";

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

  const FetchData = async () => {
    let payload = {
      limit: limit,
      sort: sort,
      desc: desc,
      offset: selectedTaskPage * 10,
    };
    const result = await get_client_list(payload);
    if (result.message) {
      setError(result.message);
      localStorage.clear();
    } else {
      setCount(result.count);
      setClients(result.tasks);
      return setError("");
    }
  };

  const _getFingerprint = () => {
    if (window.requestIdleCallback) {
      requestIdleCallback(() => {
        FPJS.get((components) => {
          const hash = FPJS.x64hash128(getHashable(components));
          setFingerprint(hash);
        });
      });
    } else {
      setTimeout(() => {
        FPJS.get((components) => {
          console.log(FPJS.x64hash128(getHashable(components)));
        });
      }, 500);
    }
  };

  useEffect(async () => {
    _getFingerprint();
    setTimeout(() => {
      if (localStorage.getItem("token")) {
        if (fingerprint !== "") {
          let pay = { fingerprint: fingerprint };
          console.log(pay);
          update_token(pay).then((data) => {
            if (data.message) {
              console.log(data.message);
            } else {
              authenticate(data, () => {});
            }
          });
        }
        FetchData();
      }
    }, 300);
  }, [FetchData, error, count, selectedTaskPage, desc, sort]);

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
