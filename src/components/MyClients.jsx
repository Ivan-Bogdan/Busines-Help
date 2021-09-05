import React, { useCallback, useRef, useState } from "react";
import {
  delete_client,
  get_client_list,
} from "../API/http";
import Footer from "../Footer";
import Navbar from "../Navbar";
import AddClient from "./clients/AddClient";
import ClientItem from "./clients/ClientItem";
import FilterComponent from "./FilterComponent";
import { filterForPage } from "../helpers";
import { useLazyLoading } from "./hooks/useLazyLoading";

const MyClients = () => {
  const [count, setCount] = useState(0);
  const [isCreateClient, setCreateClient] = useState(false);
  const [isOpenFilter, setOpenFilter] = useState(false);
  const [clients, setClients] = useState([]);
  const [selectedTaskPage, setSelectedTaskPage] = useState(0);
  const [limit] = useState(10);
  const [desc, setDesc] = useState(false);
  const [sort, setSort] = useState("name");


  const containerBox = useRef(null);
  const [isRefetch, setIsRefetch] = useState(false)

  const [resultFilter, setResultFilter] = useState([])
  const [filters, setFilters] = useState(filterForPage.clients.map((item) => { return { ...item, value: "" } }))
  const clientsListFn = useCallback(
    () => {
      console.log("isRefetch", isRefetch);
      get_client_list({
        limit,
        sort,
        desc,
        offset: selectedTaskPage * 10,
        filters: resultFilter.filter(item => item.value) || []
      }).then((responce) => {
        setCount(responce.count)
        if (isRefetch) {
          setClients(responce.clients)
        } else {
          setClients([...clients, ...responce.clients])
        }
        setSelectedTaskPage(prevState => prevState + 1)
      }).finally(() => {
        setFetching(false)
        setIsRefetch(false)
      })
    },
    [sort, selectedTaskPage, clients, resultFilter, isRefetch]
  )

  const { setFetching } = useLazyLoading(containerBox, count, clientsListFn, selectedTaskPage)

  const FetchData = () => {
    setSelectedTaskPage(0)
    setFetching(true)
    setClients([])
    setIsRefetch(true)
  };

  console.log(clients);
  console.log(isRefetch);
  console.log(selectedTaskPage);

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

  return (
    <div className='app'>
      <Navbar />
      <section className='main' >
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
        </div>
        <div ref={containerBox} className="container">
          {isOpenFilter && (
            <FilterComponent
              filterList={filters}
              refetch={FetchData}
              onClose={toggleFilter}
              sortData={sort}
              setSortData={setSort}
              setResultFilter={setResultFilter}
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
      </section >
      <Footer />
      <div className="App">
        {isCreateClient && (
          <AddClient
            onClose={toggleCreateClient}
            FetchData={FetchData}
          ></AddClient>
        )}
      </div>
    </div >
  );
};

export default MyClients;
