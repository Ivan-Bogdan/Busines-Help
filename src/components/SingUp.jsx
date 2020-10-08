import React from "react";
import Autosuggest from "react-autosuggest";
import { cityList, Reg } from "../API/http";
import * as Fingerprint2 from "fingerprintjs2";
import * as FPJS from "@fingerprintjs/fingerprintjs";

import "./style.css";
import "./Modal.css";

const getSuggestionValue = (suggestion) => suggestion;

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
        otype: 0,
        name: "",
        unp: "",
        city: "",
        city_id: "",
        address: "",
        oked: "",
        full_name: "",
      },
      suggestions: [],
    };
  }
  displayHash = (hash) => {
    this.state.fingerprint = hash;
    console.log(hash);
  };

  _finger = () => {
    if (window.requestIdleCallback) {
      requestIdleCallback(()=> {
        FPJS.get((components) => {
          const hash = FPJS.x64hash128(getHashable(components));
          this.displayHash(hash)
          console.log(hash);
        });
      });
    } else {
      setTimeout(()=> {
        FPJS.get((components)=> {
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
        city_id: this.state.data.city_id,
        address: this.state.data.address,
        oked: this.state.data.oked,
        full_name: this.state.data.full_name,
      },
    };

    Reg(payload).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
      }
      console.log(payload);
    });
  };

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    let { suggestions } = this.state;

    if (suggestions == undefined) {
      return (suggestions = "");
    } else {
      return inputLength === 0
        ? []
        : suggestions.filter(
            (lang) => lang.toLowerCase().slice(0, inputLength) === inputValue
          );
    }
  };

  render() {
    const { suggestions } = this.state;
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
            <p class="reg">Регистрация</p>
          </div>
          {this.props.children}

          <div class="container3">
            {this.props.children}
            <input
              type="text"
              placeholder="E-mail"
              name="email"
              value={this.state.email}
              onChange={(data) => {
                this.setState({ email: data.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Телефон"
              name="tel"
              value={this.state.phone}
              onChange={(data) => {
                this.setState({ phone: data.target.value });
              }}
            />
            <input
              type="password"
              placeholder="Придумайте пароль"
              name="psw"
              value={this.state.password}
              onChange={(data) => {
                this.setState({ password: data.target.value });
              }}
            />
            <input
              type="password"
              placeholder="Повторите пароль"
              name="psw2"
              value={this.state.password2}
              onChange={(data) => {
                this.setState({ password2: data.target.value });
              }}
            />
            <select
              value={this.state.data.otype}
              onChange={(prevState) => {
                this.setState({
                  data: { ...this.state.data, otype: prevState.target.value },
                });
              }}
            >
              <option disabled selected style={{ display: "none" }}>
                Форма деятельности
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
            />
            <input
              type="text"
              placeholder="УНП"
              name="unp"
              value={this.state.unp}
              onChange={(prevState) => {
                this.setState({
                  data: { ...this.state.data, unp: prevState.target.value },
                });
              }}
            />
            <span>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={(suggestions) => <span>{suggestions}</span>}
                inputProps={{
                  id: "city",
                  name: "city",
                  value: this.state.data.city,
                  placeholder: "Город",
                  onChange: (_event, { newValue }) => {
                    _event.preventDefault();
                    let payload = {
                      city: newValue,
                      limit: 10,
                    };

                    cityList(payload).then((data) => {
                      if (data.error) {
                        console.log(data.error);
                      }
                      let { city } = data;
                      let normalize = [];
                      city.forEach((el) => {
                        normalize.push(el.city);
                      });
                      if (city.length != 0)
                        this.state.data.city_id = city["0"].id;
                      else {
                        this.state.data.city_id = "null";
                      }
                      this.setState({ suggestions: normalize });
                    });

                    this.setState({
                      data: { ...this.state.data, city: newValue },
                    });
                  },
                }}
              />
            </span>
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
            />
            <input
              type="text"
              placeholder="ОКЭД"
              name="OKED"
              value={this.state.oked}
              onChange={(prevState) => {
                this.setState({
                  data: { ...this.state.data, oked: prevState.target.value },
                });
              }}
            />
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
            />

            <button
              type="submit"
              className="button5"
              onClick={this.handleSubmit}
            >
              Регистрация
            </button>
            <button type="submit" className="button5">
              Логин
            </button>
          </div>
        </form>
      </div>
    );
  }
}
