import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/style.css";
import "./components/Modal.css";
import Man from "./assets/img/Sloy244.png";
import Fon from "./assets/img/Эллипс2.png";
import Elips from "./assets/img/Эллипс5.png";
import Arka from "./assets/img/Слой239.png";
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
                            let data = {
                              fingerpring:"078e2f612515c3d6c5231931ff9596a2"
                            }
                            updateToken(data);
                          }}
                        >
                          Мои клиенты
                        </a>
                      </li>
                      <li>
                        <a href="#">Персонал</a>
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
            <div class="container bg">
              <div class="row">
                <div class="col2 ind">
                  <div class="offer">
                    <h1 class="offer__title">Бизнес - помощник</h1>
                    <p class="offer__text">
                      Облачное решение для ведения бизнеса. Записная книжка с
                      возможностью создания документов (акты, договоры,
                      налоговые декларации и т.д.)
                    </p>
                  </div>
                </div>
                <div class="col2">
                  <img src={Man} className="man" alt="" />
                  <img src={Fon} class="fon" alt="" />
                  <img src={Elips} class="elips" alt="" />
                  <img src={Arka} class="arka" alt="" />
                </div>
              </div>
            </div>
          </section>
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
                    <div
                      className="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p class="trigger__desc">
                      Простота интерфейса (не нужны специализированные знания)
                    </p>
                  </div>
                </div>
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
                      Автоматическое формирование документов
                    </p>
                  </div>
                </div>
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
                      Актуальность информации(за любой интервал времени)
                    </p>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="trigger">
                    <div
                      class="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p class="trigger__desc">
                      Экономия времени(на ведение бухгалтерского и налогового
                      учета)
                    </p>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="trigger">
                    <div
                      class="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p class="trigger__desc">
                      Облачное решение(доступен везде где есть интернет)
                    </p>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="trigger">
                    <div
                      class="trigger__img"
                      style={{ backgroundImage: `url(${Success})` }}
                    ></div>
                    <p class="trigger__desc">
                      Сохранность данных (данные резервируются и хранятся на
                      защищённых серверах)
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
