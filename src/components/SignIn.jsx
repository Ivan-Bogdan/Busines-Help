import React, { Component } from "react";
<<<<<<< HEAD
import {
  Login,
  authenticate /* isAuthenticated, getUser  */,
} from "../API/http";
=======
import { Login, authenticate, isAuthenticated, getUser } from "../API/http";
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
import * as FPJS from "@fingerprintjs/fingerprintjs";

import "./style.css";
import "./Modal.css";

const getHashable = (components) => {
  return components.map((component) => component.value).join("");
};

export default class SignIn extends Component {
<<<<<<< HEAD
  componentDidMount() {
    const modal = document.getElementById("id01");
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  }
=======
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
<<<<<<< HEAD
      error: "",
=======
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
      fingerprint: this._getFingerprint(),
    };
  }

  displayHash(hash) {
<<<<<<< HEAD
    this.setState({ fingerprint: hash });
=======
    this.state.fingerprint = hash;
    console.log(hash);
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
  }

  _getFingerprint = () => {
    if (window.requestIdleCallback) {
      requestIdleCallback(() => {
        FPJS.get((components) => {
          const hash = FPJS.x64hash128(getHashable(components));
          this.displayHash(hash);
<<<<<<< HEAD
=======
          console.log(hash);
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
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

  LoginUser = (event) => {
    event.preventDefault();
<<<<<<< HEAD
    Login(this.state).then((data) => {
      if (data.message) {
        this.setState({ error: "Неверные данные" });
      } else {
        this.setState({ error: null });
        authenticate(data, () => {
          {
            this.setState({
              ...this.state,
            });
          }
        });
        window.location.reload();
      }
    });
  };

 /*  Refresh = (event) => {
    event.preventDefault();
    updateToken(this.state).then((data) => {
      if (data.error) {
        console.log(data.error);
      }
    });
  }; */

  render() {
    return (
      <div className="modal" id="id01">
        <form class="modal-signin animate">
=======
    let payload = {
      email: this.state.email,
      password: this.state.password,
      fingerprint: this.state.fingerprint,
    };

    Login(payload).then((data) => {
      if (data.error) {
        console.log(data.error);
      }
      authenticate(data, () => {
        this.setState({
          ...this.state,
        });
      });
      console.log(payload);
    });
  };

  render() {
    return (
      <div className="modal">
        <form class="modal-content animate">
>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
          <div class="imgcontainer">
            <span
              className="close"
              onClick={this.props.onClose}
              title="Close Modal"
            >
              ×
            </span>
            <p class="reg">Войти</p>
<<<<<<< HEAD
            <p style={{ color: "red" }}>{this.state.error}</p>
          </div>
          {this.props.children}
          
=======
          </div>
          {this.props.children}

>>>>>>> 2c640a995ffef113034fb92a6655c31a1bf4a3c8
          <div class="container3">
            {this.props.children}
            <input
              type="text"
              placeholder="E-mail"
              value={this.state.email}
              name="email"
              onChange={(data) => {
                this.setState({ email: data.target.value });
              }}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={this.state.password}
              name="password"
              onChange={(data) => {
                this.setState({ password: data.target.value });
              }}
            />
            <button type="submit" className="button5" onClick={this.LoginUser}>
              Войти
            </button>
          </div>
        </form>
      </div>
    );
  }
}
