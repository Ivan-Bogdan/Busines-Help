import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/style.css";
import "./components/Modal.css";
import Man from "./assets/img/Sloy244.png";
import Fon from "./assets/img/Эллипс2.png";
import Elips from "./assets/img/Эллипс5.png";
import Arka from "./assets/img/Слой239.png";
<<<<<<< HEAD
import Success from "./assets/img/кнопка.png";
import SignUp from "./components/SingUp";
import "./jq";
import SignIn from "./components/SignIn";
import * as FPJS from "@fingerprintjs/fingerprintjs";
import {
  isAuthenticated,
  signout,
  getUser,
  authenticate,
  update_token,
  get_Task,
} from "./API/http";

import Footer from "./Footer";

const getHashable = (components) => {
  return components.map((component) => component.value).join("");
};

export default class App extends Component {
  componentDidMount() {
    const burgerWrap = document.querySelector(".menu-icon-wrapper");
    const burger = document.querySelector(".menu-icon");
    const menuContainer = document.querySelector(".mobile-container");
    if (burgerWrap) {
      burgerWrap.addEventListener("click", () => {
        burger.classList.toggle("menu-icon-active");
        menuContainer.classList.toggle("display-none");
      });
    }
    const dropdowns = document.querySelectorAll(".dropdown");
    if (dropdowns) {
      dropdowns.forEach((dropdown) => {
        dropdown.addEventListener("click", (e) => {
          dropdown.classList.toggle("dropdown__options--visible");
        });

        dropdown
          .querySelectorAll(".dropdown__options .dropdown__option")
          .forEach((opt) => {
            opt.addEventListener("click", (e) => {
              dropdown.querySelector(".dropdown__selected").innerHTML =
                opt.innerHTML;
            });
          });
      });
    }
    setTimeout(() => {
      if (localStorage.getItem("token")) {
        update_token(this.state).then((data) => {
          if (data.message) {
            console.log(data.message);
          } else {
            authenticate(data, () => {
              this.setState({
                ...this.state,
              });
            });
          }
        });
      }
    }, 200);
  }

  constructor(props) {
    super(props);

    this.state = {
      isSignUpOpen: false,
      isSignInOpen: false,
      fingerprint: this._getFingerprint(),
    };
  }

  displayHash(hash) {
    this.setState({ fingerprint: hash });
  }

  _getFingerprint = () => {
    if (window.requestIdleCallback) {
      requestIdleCallback(() => {
        FPJS.get((components) => {
          const hash = FPJS.x64hash128(getHashable(components));
          this.displayHash(hash);
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
=======
import asd from "./assets/img/Прямоугольник56.png";
import Success from "./assets/img/кнопка.png";
import SocialNetworks from "./assets/img/соцсети.png";
import SignUp from "./components/SingUp";
import "./jq";
import SignIn from "./components/SignIn";
import { isAuthenticated, signout, getUser, updateToken } from "./API/http";

export default class App extends Component {
  state = {
    isSignUpOpen: false,
    isSignInOpen: false,
  };

>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
  toggleModalSignIn = () => {
    this.setState((state) => ({
      isSignInOpen: !state.isSignInOpen,
      isSignUpOpen: false,
    }));
  };
  toggleModalSignUp = () => {
    this.setState((state) => ({
      isSignUpOpen: !state.isSignUpOpen,
      isSignInOpen: false,
    }));
  };

<<<<<<< HEAD
  Refresh = (event) => {
    event.preventDefault();
    update_token(this.state).then((data) => {
      if (data.message) {
        console.log(data.message);
      } else {
        authenticate(data, () => {
          this.setState({
            ...this.state,
          });
        });
      }
    });
  };

  render() {
    return (
      <div className="app">
        <header className="header" id="header">
          <div className="container-fluid container">
            <div className="row">
              <div className="menu-icon-wrapper">
                <div className="menu-icon"></div>
              </div>
              <a className="mh-logo" href="#">
                Business <br />
                <span>Helper</span>
              </a>
              <div className="col header-col">
                <div className="mobile-container display-none">
                  <nav className="menu">
=======
  render() {
    return (
      <div className="app">
        <header class="header" id="header">
          <div class="container-fluid container">
            <div class="row">
              <div class="menu-icon-wrapper">
                <div class="menu-icon"></div>
              </div>
              <a class="mh-logo" href="#">
                Business <br />
                <span>Helper</span>
              </a>
              <div class="col header-col">
                <div class="mobile-container display-none" >
                  <nav class="menu">
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
                    <ul>
                      <li></li>
                      <li>
                        <a href="#" onClick={getUser}>
                          Статистика
                        </a>
                      </li>
                      <li>
                        <a href="/myservices">Мои услуги</a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() => {
<<<<<<< HEAD
                            let payload = {
                              fingerprint: this.state.fingerprint,
                            };
                            update_token(payload);
=======
                            let data = {
                              fingerpring:"078e2f612515c3d6c5231931ff9596a2"
                            }
                            updateToken(data);
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
                          }}
                        >
                          Мои клиенты
                        </a>
                      </li>
                      <li>
<<<<<<< HEAD
                        <a
                          href="#"
                          onClick={() => {
                            let payload = {
                              task_id: "857f6d55-3f2d-4b31-adaf-92cf0dc9fbfb",
                            };
                            get_Task(payload);
                          }}
                        >
                          Персонал
                        </a>
=======
                        <a href="#">Персонал</a>
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
                      </li>
                      <li>
                        <a href="#">Банк</a>
                      </li>
                      <li>
<<<<<<< HEAD
                        <a href="#" onClick={this.Refresh}>
                          Авто
                        </a>
=======
                        <a href="#">Авто</a>
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>

              {!isAuthenticated() && (
<<<<<<< HEAD
                <div className="log">
                  <a
                    href="#"
                    className="log__log-in"
=======
                <div class="log">
                  <a
                    href="#"
                    class="log__log-in"
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
                    onClick={this.toggleModalSignIn}
                  >
                    Вход
                  </a>
                  <a
                    href="#"
                    onClick={this.toggleModalSignUp}
                    id=""
<<<<<<< HEAD
                    className="log__registration"
=======
                    class="log__registration"
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
                  >
                    Регистрация
                  </a>
                </div>
              )}
              {isAuthenticated() && (
<<<<<<< HEAD
                <div className="log">
=======
                <div class="log">
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      signout(() => {
                        this.setState({ ...this.state });
                      });
                    }}
                    id=""
<<<<<<< HEAD
                    className="log__log-in"
=======
                    class="log__log-in"
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
                  >
                    Выйти
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

<<<<<<< HEAD
        <main className="main" id="main">
          <section className="main-section" id="main-section">
            <div className="container bg">
              <div className="row">
                <div className="col2">
                  <div className="offer">
                    <h1 className="offer__title">Бизнес - помощник</h1>
                    <p className="offer__text">
=======
        <main class="main" id="main">
          <section class="main-section" id="main-section">
            <div class="container bg">
              <div class="row">
                <div class="col2 ind">
                  <div class="offer">
                    <h1 class="offer__title">Бизнес - помощник</h1>
                    <p class="offer__text">
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
                      Облачное решение для ведения бизнеса. Записная книжка с
                      возможностью создания документов (акты, договоры,
                      налоговые декларации и т.д.)
                    </p>
                  </div>
                </div>
<<<<<<< HEAD
                <div className="col2">
                  <img src={Man} className="man" alt="" />
                  <img src={Fon} className="fon" alt="" />
                  <img src={Elips} className="elips" alt="" />
                  <img src={Arka} className="arka" alt="" />
=======
                <div class="col2">
                  <img src={Man} className="man" alt="" />
                  <img src={Fon} class="fon" alt="" />
                  <img src={Elips} class="elips" alt="" />
                  <img src={Arka} class="arka" alt="" />
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
                </div>
              </div>
            </div>
          </section>
<<<<<<< HEAD
          <section className="addition" id="addition">
            <div className="container">
              <div className="row">
                <div className="col text-align-center">
                  <h2 className="title2">Мы предлагаем:</h2>
                </div>
              </div>
              <div className="row aps">
                <div className="col-lg-4">
                  <div className="trigger">
=======
          <section class="addition" id="addition">
            <div class="container">
              <div class="row">
                <div class="col text-align-center">
                  <h2 class="title2">Мы предлагаем:</h2>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-4">
                  <div class="trigger">
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
                    <div
                      className="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
<<<<<<< HEAD
                    <p className="trigger__desc">
=======
                    <p class="trigger__desc">
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
                      Простота интерфейса (не нужны специализированные знания)
                    </p>
                  </div>
                </div>
<<<<<<< HEAD
                <div className="col-lg-4">
                  <div className="trigger">
                    <div
                      className="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p className="trigger__desc">Интеграция с банком</p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="trigger">
                    <div
                      className="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p className="trigger__desc">
=======
                <div class="col-lg-4">
                  <div class="trigger">
                    <div
                      class="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p class="trigger__desc">Интеграция с банком</p>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="trigger">
                    <div
                      class="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p class="trigger__desc">
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
                      Автоматическое формирование документов
                    </p>
                  </div>
                </div>
<<<<<<< HEAD
                <div className="col-lg-4">
                  <div className="trigger">
                    <div
                      className="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p className="trigger__desc">Доска задач для персонала</p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="trigger">
                    <div
                      className="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p className="trigger__desc">
=======
                <div class="col-lg-4">
                  <div class="trigger">
                    <div
                      class="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p class="trigger__desc">Доска задач для персонала</p>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="trigger">
                    <div
                      class="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p class="trigger__desc">
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
                      Актуальность информации(за любой интервал времени)
                    </p>
                  </div>
                </div>
<<<<<<< HEAD
                <div className="col-lg-4">
                  <div className="trigger">
                    <div
                      className="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p className="trigger__desc">
=======
                <div class="col-lg-4">
                  <div class="trigger">
                    <div
                      class="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p class="trigger__desc">
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
                      Экономия времени(на ведение бухгалтерского и налогового
                      учета)
                    </p>
                  </div>
                </div>
<<<<<<< HEAD
                <div className="col-lg-4">
                  <div className="trigger">
                    <div
                      className="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p className="trigger__desc">
=======
                <div class="col-lg-4">
                  <div class="trigger">
                    <div
                      class="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p class="trigger__desc">
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
                      Облачное решение(доступен везде где есть интернет)
                    </p>
                  </div>
                </div>
<<<<<<< HEAD
                <div className="col-lg-4">
                  <div className="trigger">
                    <div
                      className="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p className="trigger__desc">
=======
                <div class="col-lg-4">
                  <div class="trigger">
                    <div
                      class="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p class="trigger__desc">
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
                      Сохранность данных (данные резервируются и хранятся на
                      защищённых серверах)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

<<<<<<< HEAD
        <Footer />
=======
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
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8

        <div className="App">
          {this.state.isSignUpOpen && (
            <SignUp onClose={this.toggleModalSignUp}></SignUp>
          )}
          {this.state.isSignInOpen && (
            <SignIn onClose={this.toggleModalSignIn}></SignIn>
          )}
        </div>
      </div>
    );
  }
}
