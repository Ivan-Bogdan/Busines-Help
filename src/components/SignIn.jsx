import React, { Component } from "react";
import { Login, authenticate, isAuthenticated, getUser } from "../API/http";
import * as FPJS from "@fingerprintjs/fingerprintjs";

import "./style.css";
import "./Modal.css";

const getHashable = (components) => {
  return components.map((component) => component.value).join("");
};

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      fingerprint: this._getFingerprint(),
    };
  }

  displayHash(hash) {
    this.state.fingerprint = hash;
    console.log(hash);
  }

  _getFingerprint = () => {
    if (window.requestIdleCallback) {
      requestIdleCallback(() => {
        FPJS.get((components) => {
          const hash = FPJS.x64hash128(getHashable(components));
          this.displayHash(hash);
          console.log(hash);
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
          <div class="imgcontainer">
            <span
              className="close"
              onClick={this.props.onClose}
              title="Close Modal"
            >
              ×
            </span>
            <p class="reg">Войти</p>
          </div>
          {this.props.children}

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
