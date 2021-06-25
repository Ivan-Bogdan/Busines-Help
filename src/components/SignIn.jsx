import React, { Component } from "react";
import { authenticate, Login } from "../API/http";
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
      error: "",
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
    }
  };

  LoginUser = (event) => {
    event.preventDefault();
    Login(this.state).then((data) => {
      if (data.message) {
        this.setState({ error: "Неверные данные" });
      } else {
        this.setState({ error: null });
        this.props.onClose();
        authenticate(data, () => {
          this.setState({
            ...this.state,
          });
        });
        // window.location.reload();
      }
    });
  };

  render() {
    return (
      <div className="modal" id="id01">
        <form className="modal-signin animate">
          <div className="imgcontainer">
            <span
              className="close"
              onClick={this.props.onClose}
              title="Close Modal"
            >
              ×
            </span>
            <p className="reg">Войти</p>
            <p style={{ color: "red" }}>{this.state.error}</p>
          </div>
          {this.props.children}

          <div className="container3">
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
            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                className="button5"
                onClick={this.LoginUser}
              >
                Войти
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
