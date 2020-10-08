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
                </div>
              )}
            </div>
          </div>
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
