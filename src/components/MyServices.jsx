import React, { useState, useEffect } from "react";
import {
  get_task_list,
  update_token,
  authenticate,
  delete_task,
} from "../API/http";
import * as FPJS from "@fingerprintjs/fingerprintjs";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/style.css";
import "../components/Modal.css";
import CreateTask from "./tasks/CreateTask";
import Task from "./tasks/Task";
import Navbar from "../Navbar";
import Footer from "../Footer";
import FilterComponent from "./FilterComponent";
import TestTask from "./tasks/TestTask";

const getHashable = (components) => {
  return components.map((component) => component.value).join("");
};

const MyServ = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);
  const [isOpenFilter, setOpenFilter] = useState(false);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);

  const [desc, setDesc] = useState(false);
  const [sort, setSort] = useState("name");

  const [fingerprint, setFingerprint] = useState("");
  const [count, setCount] = useState(0);
  const [selectedTaskPage, setSelectedTaskPage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
  }, [
    fingerprint,
    offset,
    FetchData,
    error,
    count,
    selectedTaskPage,
    desc,
    sort,
  ]);

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

  const FetchData = async () => {
    let payload = {
      limit: limit,
      sort: sort,
      desc: desc,
      offset: selectedTaskPage * 10,
    };
    const result = await get_task_list(payload);
    if (result.message) {
      setError(result.message);
      localStorage.clear();
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
                {isOpenFilter && (
                  <FilterComponent
                    sort={sort}
                    desc={desc}
                    dataFilter={callbackFilter}
                    onClose={toggleFilter}
                  ></FilterComponent>
                )}
              </div>
            </div>
            <p style={{ color: "red" }}>{error}</p>
          </div>
          <div className="container">
            <TestTask></TestTask>
            {/* {tasks.map((task, index) => (
              <div key={index} className="task_item">
                <Task task={task} deleteTask={deleteTask}></Task>
              </div>
            ))} */} //new layout
            <div className={isVisible ? "block3" : "block1"} align="right">
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
