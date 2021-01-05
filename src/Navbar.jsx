import React, { Component } from "react";
import {
  isAuthenticated,
  signout,
  getUser,
  get_Task,
} from "./API/http";
import SignUp from "./components/SingUp";
import SignIn from "./components/SignIn";

export default class Navbar extends Component {
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
  }
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
      <header className="header" id="header">
        <div className="container-fluid container">
          <div className="row">
            <div className="menu-icon-wrapper">
              <div className="menu-icon"></div>
            </div>
            <a className="mh-logo" href="/">
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
                        href="#"
                        
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
                      <a href="#">Авто</a>
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
        <div className="App">
          {this.state.isSignUpOpen && (
            <SignUp onClose={this.toggleModalSignUp}></SignUp>
          )}
          {this.state.isSignInOpen && (
            <SignIn onClose={this.toggleModalSignIn}></SignIn>
          )}
        </div>
      </header>
    );
  }
}
