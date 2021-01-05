import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/style.css";
import "./components/Modal.css";
import Man from "./assets/img/Sloy244.png";
import Fon from "./assets/img/Эллипс2.png";
import Elips from "./assets/img/Эллипс5.png";
import Arka from "./assets/img/Слой239.png";
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
                          href="/myclients"
                          /*  onClick={() => {
                            let payload = {
                              fingerprint: this.state.fingerprint,
                            };
                            update_token(payload);
                          }} */
                        >
                          Мои клиенты
                        </a>
                      </li>
                      <li>
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
                      </li>
                      <li>
                        <a href="#">Банк</a>
                      </li>
                      <li>
                        <a href="#" onClick={this.Refresh}>
                          Авто
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>

              {!isAuthenticated() && (
                <div className="log">
                  <a
                    href="#"
                    className="log__log-in"
                    onClick={this.toggleModalSignIn}
                  >
                    Вход
                  </a>
                  <a
                    href="#"
                    onClick={this.toggleModalSignUp}
                    id=""
                    className="log__registration"
                  >
                    Регистрация
                  </a>
                </div>
              )}
              {isAuthenticated() && (
                <div className="log">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      signout(() => {
                        this.setState({ ...this.state });
                      });
                    }}
                    id=""
                    className="log__log-in"
                  >
                    Выйти
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="main" id="main">
          <section className="main-section" id="main-section">
            <div className="container bg">
              <div className="row">
                <div className="col2">
                  <div className="offer">
                    <h1 className="offer__title">Бизнес - помощник</h1>
                    <p className="offer__text">
                      Облачное решение для ведения бизнеса. Записная книжка с
                      возможностью создания документов (акты, договоры,
                      налоговые декларации и т.д.)
                    </p>
                  </div>
                </div>
                <div className="col2">
                  <img src={Man} className="man" alt="" />
                  <img src={Fon} className="fon" alt="" />
                  <img src={Elips} className="elips" alt="" />
                  <img src={Arka} className="arka" alt="" />
                </div>
              </div>
            </div>
          </section>
          <section className="addition" id="addition">
            <div className="container">
              <div className="row">
                <div className="col text-align-center">
                  <h2 className="title2">Мы предлагаем:</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div classname="trigger">
                    <div
                      className="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p className="trigger__desc">
                      Простота интерфейса (не нужны специализированные знания)
                    </p>
                  </div>
                </div>
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
                      Автоматическое формирование документов
                    </p>
                  </div>
                </div>
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
                      Актуальность информации(за любой интервал времени)
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="trigger">
                    <div
                      className="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p className="trigger__desc">
                      Экономия времени(на ведение бухгалтерского и налогового
                      учета)
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="trigger">
                    <div
                      className="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p className="trigger__desc">
                      Облачное решение(доступен везде где есть интернет)
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="trigger">
                    <div
                      className="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p className="trigger__desc">
                      Сохранность данных (данные резервируются и хранятся на
                      защищённых серверах)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />

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
