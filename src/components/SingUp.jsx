import React from "react";
import Autosuggest from "react-autosuggest";
import { cityList, Reg } from "../API/http";
import * as Fingerprint2 from "fingerprintjs2";
import * as FPJS from "@fingerprintjs/fingerprintjs";

import "./style.css";
import "./Modal.css";
const renderSuggestion = (suggestion) => (
  <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.8 }}>
    <span>
      {" "}
      {suggestion.type_abbr}. {suggestion.city}{" "}
    </span>{" "}
    <div>
      {suggestion.city !== suggestion.district && (
        <span style={{ color: "#aaa", fontSize: 10 }}>
          {suggestion.district} р-н,
        </span>
      )}{" "}
      <span style={{ color: "#aaa", fontSize: 10 }}>{suggestion.region} </span>
    </div>
  </div>
);

const getHashable = (components) => {
  return components.map((component) => component.value).join("");
};

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      phone: "",
      password: "",
      password2: "",
      fingerprint: this._finger(),
      role_id: 1,
      data: {
        otype: "",
        name: "",
        unp: "",
        city: "",
        address: "",
        oked: "",
        full_name: "",
      },
      suggestions: [],
      city_id: "",
      error: "",
    };
  }
  displayHash = (hash) => {
    this.setState({ fingerprint: hash });
  };

  _finger = () => {
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

  _getFingerprint = () => {
    if (window.requestIdleCallback) {
      requestIdleCallback(() => {
        Fingerprint2.get((components) => {
          const hash = Fingerprint2.x64hash128(getHashable(components));
          this.displayHash(hash);
        });
      });
    } else {
      setTimeout(() => {
        Fingerprint2.get((components) => {
          const hash = Fingerprint2.x64hash128(getHashable(components));
          this.displayHash(hash);
        });
      }, 500);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validEmail(this.state.email) === false) {
      console.log("invalid email");
    } else {
      let payload = {
        email: this.state.email,
        password: this.state.password,
        phone: this.state.phone,
        role_id: this.state.role_id,
        fingerprint: this.state.fingerprint,
        data: {
          otype: parseInt(this.state.data.otype, 10),
          name: this.state.data.name,
          unp: this.state.data.unp,
          city_id: this.state.city_id,
          address: this.state.data.address,
          oked: this.state.data.oked,
          full_name: this.state.data.full_name,
        },
      };

      Reg(payload).then((data) => {
        if (data.message) {
          this.setState({ error: data.response.data.message });
        } else {
          this.props.onClose();
          setTimeout(() => {
            window.alert("Вы успешно зарегистрировались!");
          }, 150);
        }
      });
    }
  };

  getSuggestionValue = (suggestion) => {
    this.setState({ city_id: suggestion.id });
    return suggestion.city;
  };

  onChange = (event, { newValue, method }) => {
    this.setState({
      data: { ...this.state.data, city: newValue },
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    fetch(`http://altproduction.ru:8080/rest/v1/city/`, {
      method: "POST",
      body: JSON.stringify({
        city: value,
        limit: 10,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ suggestions: data.city });
      });
  };

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  validEmail = (userEmail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  };

  render() {
    const { suggestions } = this.state;
    const { city } = this.state.data;
    const inputProps = {
      placeholder: "Город",
      value: city,
      onChange: this.onChange,
    };
    return (
      <div className="modal" id="id01">
        <form className="modal-content animate">
          <div className="imgcontainer">
            <span
              className="close"
              onClick={this.props.onClose}
              title="Close Modal"
            >
              ×
            </span>
            <p className="reg">Регистрация</p>
            <p style={{ color: "red" }}>{this.state.error}</p>
          </div>
          {this.props.children}

          <div className="container3">
            {this.props.children}
            <div className="form__field">
              <input
                type="email"
                placeholder="E-mail"
                name="email"
                value={this.state.email}
                onChange={(data) => {
                  this.setState({ email: data.target.value });
                }}
                required
              />
              <span className="form__error">
                Это поле должно содержать E-Mail в формате example@site.com
              </span>
            </div>
            <div className="form__field">
              <input
                type="tel"
                placeholder="Телефон"
                name="tel"
                pattern="(\+375|80|375)(29|25|44|33)(\d{3})(\d{2})(\d{2})"
                value={this.state.phone}
                onChange={(data) => {
                  this.setState({ phone: data.target.value });
                }}
                required
              />
              <span className="form__error">
                Это поле содержит телефон в неверном формате
              </span>
            </div>
            <div className="form__field">
              <input
                type="password"
                placeholder="Придумайте пароль"
                name="psw"
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                value={this.state.password}
                onChange={(data) => {
                  this.setState({ password: data.target.value });
                }}
                required
              />
              <span className="form__error">
                Пароль должен иметь не менее 8 символом, хотябы одну заглавную
                букву и цифру
              </span>
            </div>
            <div className="form__field">
              <input
                type="password"
                placeholder="Повторите пароль"
                name="psw2"
                pattern={this.state.password}
                value={this.state.password2}
                onChange={(data) => {
                  this.setState({ password2: data.target.value });
                }}
                required
              />
              <span className="form__error">Пароли не совпадают</span>
            </div>
            <select
              required
              className="select1"
              value={this.state.data.otype}
              onChange={(prevState) => {
                this.setState({
                  data: { ...this.state.data, otype: prevState.target.value },
                });
              }}
            >
              <option
                value=""
                disabled
                defaultValue
                style={{ display: "none" }}
              >
                Форма деятельности
              </option>
              <option
                value=""
                disabled
                defaultValue
                style={{ display: "none" }}
              >
                Тип
              </option>
              <option type="number" value={Number(0)}>
                ИП
              </option>
              <option value={Number(1)}>ООО</option>
              <option value={Number(2)}>ОАО</option>
              <option value={Number(3)}>ЧУП</option>
              <option value={Number(4)}>ЧТУП</option>
              <option value={Number(5)}>ИНОЕ</option>
              <option value={Number(6)}>Иностранное предприятие</option>
            </select>

            <input
              type="text"
              placeholder="Название организации"
              name="name"
              value={this.state.data.name}
              onChange={(prevState) => {
                this.setState({
                  data: { ...this.state.data, name: prevState.target.value },
                });
              }}
              required
            />
            <div className="form__field">
              <input
                type="text"
                placeholder="УНП"
                name="unp"
                pattern="(\d{9})"
                value={this.state.unp}
                onChange={(prevState) => {
                  this.setState({
                    data: { ...this.state.data, unp: prevState.target.value },
                  });
                }}
                required
              />
              <span className="form__error">
                Это поле должно содержать девять (9) цифр
              </span>
            </div>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
            <input
              type="text"
              placeholder="Адрес регистрации"
              name="address"
              value={this.state.address}
              onChange={(prevState) => {
                this.setState({
                  data: { ...this.state.data, address: prevState.target.value },
                });
              }}
              required
            />
            <div className="form__field">
              <input
                type="text"
                placeholder="ОКЭД"
                name="OKED"
                pattern="(\d{5})"
                value={this.state.oked}
                onChange={(prevState) => {
                  this.setState({
                    data: { ...this.state.data, oked: prevState.target.value },
                  });
                }}
                required
              />
              <span className="form__error">
                Это поле должно содержать пять (5) цифр
              </span>
            </div>
            <input
              type="text"
              placeholder="ФИО руководителя"
              name="name_lead"
              value={this.state.full_name}
              onChange={(prevState) => {
                this.setState({
                  data: {
                    ...this.state.data,
                    full_name: prevState.target.value,
                  },
                });
              }}
              required
            />

            <button
              type="button"
              className="button5"
              onClick={this.handleSubmit}
            >
              Регистрация
            </button>
          </div>
        </form>
      </div>
    );
  }
}
