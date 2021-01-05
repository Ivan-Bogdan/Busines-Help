<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { get_task_list, update_token, authenticate } from "../API/http";
import * as FPJS from "@fingerprintjs/fingerprintjs";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/style.css";
import "../components/Modal.css";
import CreateTask from "./tasks/CreateTask";
import Task from "./tasks/Task";
import Navbar from "../Navbar";
import Footer from "../Footer";
import FilterComponent from "./FilterComponent";

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
      }
      FetchData();
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

  return (
    <div className="app">
      <Navbar />
      <main className="main" id="main">
        <section className="main-section3" id="main-section">
          <div className="container">
            <button
              type="submit"
              className="button_create"
              onClick={toggleModal}
            >
              Создать
            </button>
            <p style={{ color: "red" }}>{error}</p>
          </div>
          <div className="container">
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
            {tasks.map((task, i) => (
              <div className="task_item">
                <Task task={task}></Task>
              </div>
            ))}
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
=======
import React, { Component } from "react";
import {
  isAuthenticated,
  signout,
  get_Tasklist,
  delete_Task,
  updateToken,
} from "../API/http";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/style.css";
import "../components/Modal.css";

import SocialNetworks from "../assets/img/соцсети.png";
import CreateTask from "./tasks/CreateTask";
import ActionsTask from "./tasks/ActionsTask";

export default class MyServices extends Component {
  state = {
    isCreateTaskOpen: false,
    isActionTask: false,
  };

  getTask = () => {
    let payload = {
      limit: 4,
      offset: 2,
    };
    get_Tasklist(payload);
  };

  toggleModalCreateTask = () => {
    this.setState((state) => ({
      isCreateTaskOpen: !state.isCreateTaskOpen,
    }));
  };

  toggleModalActionTask = () => {
    this.setState((state) => ({
      isActionTask: !state.isActionTask,
    }));
  };
  render() {
    return (
      <div className="app">
        <header class="header" id="header">
          <div class="container-fluid container">
            <div class="row">
              <div class="menu-icon-wrapper">
                <div class="menu-icon"></div>
              </div>
              <a class="mh-logo" href="/">
                Business <br />
                <span>Helper</span>
              </a>
              <div class="col header-col">
                <div class="mobile-container display-none">
                  <nav class="menu">
                    <ul>
                      <li></li>
                      <li>
                        <a href="#">Статистика</a>
                      </li>
                      <li>
                        <a href="/myservices">Мои услуги</a>
                      </li>
                      <li>
                        <a href="#">Мои клиенты</a>
                      </li>
                      <li>
                        <a href="#" onClick={this.toggleModalActionTask}>
                          Персонал
                        </a>
                      </li>
                      <li>
                        <a href="#">Банк</a>
                      </li>
                      <li>
                        <a href="#">Авто</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>

              {!isAuthenticated() && (
                <div class="log">
                  <a
                    href="#"
                    class="log__log-in"
                    onClick={this.toggleModalSignIn}
                  >
                    Вход
                  </a>
                  <a
                    href="#"
                    onClick={this.toggleModalSignUp}
                    id=""
                    class="log__registration"
                  >
                    Регистрация
                  </a>
                </div>
              )}
              {isAuthenticated() && (
                <div class="log">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      signout(() => {
                        this.setState({ ...this.state });
                      });
                    }}
                    id=""
                    class="log__log-in"
                  >
                    Выйти
                  </a>
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
                </div>
              )}
            </div>
          </div>
<<<<<<< HEAD
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
=======
        </header>
        <main class="main" id="main">
          <section class="main-section" id="main-section">
            <div class="container">
              <button
                type="submit"
                className="button_create"
                onClick={this.toggleModalCreateTask}
              >
                Создать
              </button>
              <div id="items" style={{ width: "100%", height: "100px" }}></div>
            </div>
            {this.getTask()}
          </section>
        </main>

        <footer class="footer" id="footer">
          <div class="container container2">
            <div class="row">
              <div class="col footer_text">
                <a style={{ color: "black" }}>ООО «Наименование ИП»</a>
              </div>
              <div class="col footer_text">
                <a href="#">О нас</a>
              </div>
              <div class="col footer_text">
                <a href="#">Как пользоваться</a>
              </div>
              <div class="col footer_text">
                <a style={{ color: "black" }}>© 2017-2020 Все права защищены</a>
              </div>
              <div class="col footer_text">
                <a href="#">Контакты</a>
              </div>
              <div class="col footer_text">
                <a href="#">Вопрос - Ответ</a>
              </div>
            </div>
            <img src={SocialNetworks} alt="" />
          </div>
        </footer>
        <div className="App">
          {this.state.isCreateTaskOpen && (
            <CreateTask onClose={this.toggleModalCreateTask}></CreateTask>
          )}
          {this.state.isActionTask && (
            <ActionsTask onClose={this.toggleModalActionTask}></ActionsTask>
          )}
        </div>
      </div>
    );
  }
}
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
