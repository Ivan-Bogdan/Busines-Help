import React, { useState, useEffect } from "react";
import {
  get_task_list,
  delete_task,
} from "../API/http";
import FPJS from "@fingerprintjs/fingerprintjs";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/style.css";
import "../components/Modal.css";
import CreateTask from "./tasks/CreateTask";
import Task from "./tasks/Task";
import Navbar from "../Navbar";
import Footer from "../Footer";
import FilterComponent from "./FilterComponent";
import { filterForPage } from "../helpers";

const getHashable = (components) => {
  return components.map((component) => component.value).join("");
};

const MyServ = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);
  const [isOpenFilter, setOpenFilter] = useState(false);
  const [limit] = useState(10);

  const [desc, setDesc] = useState(false);
  const [sort, setSort] = useState("name");

  const [count, setCount] = useState(0);
  const [selectedTaskPage, setSelectedTaskPage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    _getFingerprint();
    FetchData();
  }, [_getFingerprint, FetchData]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleFilter = () => {
    setOpenFilter(!isOpenFilter);
  };

  const callbackFilter = (desc, sort) => {
    setDesc(desc);
    setSort(sort);
  };

  const FetchData = async (filters) => {
    let payload = {
      limit: limit,
      sort: sort,
      desc: desc,
      offset: selectedTaskPage * 10,
      filters: filters || []
    };
    const result = await get_task_list(payload);
    if (result.message) {
      setError(result.message);
      // localStorage.clear();
    } else {
      setCount(result.count);
      setTasks(result.tasks);
      return setError("");
    }
  };

  const _getFingerprint = () => {
    if (window.requestIdleCallback) {
      requestIdleCallback(() => {
        FPJS.get((components) => {
          const hash = FPJS.x64hash128(getHashable(components));
          localStorage.setItem("fingerprint", hash);
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

  const deleteTask = async (task) => {
    const result = await delete_task({ task_id: task });
    if (result.message) {
      console.log(result.message);
    }
    FetchData();
  };

  return (
    <div className="app">
      <Navbar />
      <main className="main" id="main">
        <section className="main-section3" id="main-section">
          <div className="container">
            <div className="flex" style={{ marginBottom: "20px" }}>
              <button
                type="submit"
                className="button_create"
                onClick={toggleModal}
              >
                Создать
              </button>
              <div className="filter_div" align="right">
                <button className="sorting" onClick={toggleFilter}></button>
              </div>
            </div>
            <p style={{ color: "red" }}>{error}</p>
          </div>
          <div className="container">
            {isOpenFilter && (
              <FilterComponent
                filterList={filterForPage.services}
                refetch={FetchData}
              ></FilterComponent>
            )}
            {tasks.map((task, index) => (
              <div key={index} className="task_item">
                <Task
                  task={task}
                  deleteTask={deleteTask}
                  FetchData={FetchData}
                ></Task>
              </div>
            ))}
            <div className={isVisible ? "block3" : "block1"} style={{
              right: 0,
              position: 'absolute',
            }}>
              {!isVisible && (
                <div
                  className="page_list"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {selectedTaskPage + 1}
                </div>
              )}
              {isVisible && (
                <div className="block2">
                  <ul multiple>
                    {[...Array(Math.ceil(count / limit))].map((item, acc) => (
                      <li
                        key={acc}
                        value={acc}
                        className={
                          acc === selectedTaskPage ? "background_grey" : null
                        }
                        onClick={() => {
                          setSelectedTaskPage(acc);
                          setIsVisible(!isVisible);
                        }}
                      >
                        {acc + 1}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <div className="App">
        {modal && <CreateTask onClose={toggleModal}></CreateTask>}
      </div>
    </div>
  );
};

export default MyServ;
