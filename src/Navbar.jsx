import React, { Component } from "react";
import { isAuthenticated, signout } from "./API/http";
import SignUp from "./components/SingUp";
import SignIn from "./components/SignIn";
import { Link } from "react-router-dom";

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
                    {/* <li></li> */}
                    <li>
                      <Link>Статистика</Link>
                    </li>
                    <li>
                      <Link to={`/myservices`}>Мои услуги</Link>
                    </li>
                    <li>
                      <Link to={`/myclients`}>Мои клиенты</Link>
                    </li>
                    <li>
                      <Link>Персонал</Link>
                    </li>
                    <li>
                      <Link>Банк</Link>
                    </li>
                    <li>
                      <Link>Авто</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {!isAuthenticated() && (
              <div className="log">
                <Link
                  className="log__log-in"
                  onClick={this.toggleModalSignIn}
                >
                  Вход
                </Link>
                <Link
                  onClick={this.toggleModalSignUp}
                  id=""
                  className="log__registration"
                >
                  Регистрация
                </Link>
              </div>
            )}
            {isAuthenticated() && (
              <div className="log">
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    signout(() => {
                      this.setState({ ...this.state });
                    });
                  }}
                  className="log__log-in"
                >
                  Выйти
                </Link>
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
