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
import FilterComponent from "./FilterComponent";
import { filterForPage } from "../helpers";

const getHashable = (components) => {
  return components.map((component) => component.value).join("");
};

const MyClients = () => {
  const [error, setError] = useState(false);
  const [fingerprint, setFingerprint] = useState("");
  const [count, setCount] = useState(0);
  const [isCreateClient, setCreateClient] = useState(false);
  const [isOpenFilter, setOpenFilter] = useState(false);
  const [clients, setClients] = useState([]);
  const [selectedTaskPage, setSelectedTaskPage] = useState(0);
  const [limit] = useState(10);
  const [desc, setDesc] = useState(false);
  const [sort, setSort] = useState("name");

  const [filters, setFilters] = useState(filterForPage.clients.map((item) => { return { ...item, value: "" } }))

  const FetchData = useCallback(async (filters, sort = "name") => {
    let payload = {
      limit: limit,
      offset: selectedTaskPage * 10,
      sort: sort || "name",
      desc: desc,
      filters: filters || []
    };
    const result = await get_client_list(payload);
    if (result.message) {
      setError(result.message);
    } else {
      setCount(result.count);
      setClients(result.clients);
      return setError("");
    }
  }, [sort]);

  const toggleFilter = () => {
    setOpenFilter(!isOpenFilter);
  };

  const toggleCreateClient = () => {
    setCreateClient(!isCreateClient);
  };

  const deleteClient = useCallback(
    async (item) => {
      const result = await delete_client({ id: item });
      if (result.message) {
      } else
        FetchData();
    },
    [clients]
  );

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className='app'>
      <Navbar />
      <section className='main'>
        <div className="container">
          <div className="flex" style={{ marginBottom: "20px" }}>
            <button
              type="submit"
              className="button_create"
              onClick={toggleCreateClient}
            >
              Создать
            </button>
            <div className="filter_div" align="right">
              <button className="sorting" onClick={toggleFilter}></button>
            </div>
          </div>
          {isOpenFilter && (
            <FilterComponent
              filterList={filters}
              refetch={FetchData}
              setData={setFilters}
              onClose={toggleFilter}
            ></FilterComponent>
          )}
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
