import React, { Component } from 'react';
import { isAuthenticated, signout, getUser } from "./API/http";
import SignUp from "./components/SingUp";
import SignIn from "./components/SignIn";

export default class Navbar extends Component {
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
                <div class="mobile-container display-none">
                  <nav class="menu">
                    <ul>
                      <li></li>
                      <li>
                        <a
                          href="#"
                          onClick={(event) => {
                            event.preventDefault();
                            getUser().then((data) => {
                              if (data.error) {
                                console.log(data.error);
                              }
                              console.log(data);
                            });
                          }}
                        >
                          Статистика
                        </a>
                      </li>
                      <li>
                        <a href="/myservices">Мои услуги</a>
                      </li>
                      <li>
                        <a href="#">Мои клиенты</a>
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
          <div className="App">
          {this.state.isSignUpOpen && (
            <SignUp onClose={this.toggleModalSignUp}></SignUp>
          )}
          {this.state.isSignInOpen && (
            <SignIn onClose={this.toggleModalSignIn}></SignIn>
          )}
        </div>
        </header>
        
        )
    }
}
