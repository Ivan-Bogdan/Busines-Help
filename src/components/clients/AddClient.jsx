import React from "react";
import Autosuggest from "react-autosuggest";
import { cityList, Reg } from "../../API/http";

import "../style.css";
import "../Modal.css";

const getSuggestionValue = (suggestion) => suggestion;

export default class AddClient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      unp: "",
      phone: "",
      otype: "",
      city: "",
      city_id: "",
      address: "",
      suggestions: [],
      error: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validEmail(this.state.email) === false) {
      console.log("invalid email");
    } else {
      let payload = {
        name: this.state.name,
        unp: this.state.unp,
        phone: this.state.phone,
        otype: parseInt(this.state.otype, 10),
        city_id: this.state.city_id,
        address: this.state.address,
      };

      Reg(payload).then((data) => {
        if (data.message === "User exist") {
          this.setState({ error: "Пользователь существует!" });
        } else {
          console.log(data);
        }
        console.log(payload);
      });
    }
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

    if (suggestions === undefined) {
      return (suggestions = "");
    } else {
      return inputLength === 0
        ? []
        : suggestions.filter(
            (lang) => lang.toLowerCase().slice(0, inputLength) === inputValue
          );
    }
  };

  validEmail = (userEmail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  };

  render() {
    const { suggestions } = this.state;
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
            <p className="reg">Новый клиент</p>
            <p style={{ color: "red" }}>{this.state.error}</p>
          </div>
          {this.props.children}

          <div className="container3">
            {this.props.children}
            <input
              type="text"
              placeholder="Название организации"
              name="name"
              value={this.state.name}
              onChange={(data) => {
                this.setState({ name: data.target.value });
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
                onChange={(data) => {
                  this.setState({
                    unp: data.target.value,
                  });
                }}
                required
              />
              <span className="form__error">
                Это поле должно содержать девять (9) цифр
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
            <select
              className="select1"
              value={this.state.otype}
              onChange={(data) => {
                this.setState({
                  otype: data.target.value,
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

            <Autosuggest
              required
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={(suggestions) => <span>{suggestions}</span>}
              inputProps={{
                id: "city",
                name: "city",
                value: this.state.city,
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
                    if (city.length !== 0)
                      this.setState({
                        city_id: city["0"].id,
                      });
                    else {
                      this.setState({
                        city_id: null,
                      });
                    }
                    this.setState({ suggestions: normalize });
                  });

                  this.setState({
                    city: newValue,
                  });
                },
              }}
            />
            <input
              type="text"
              placeholder="Адрес регистрации"
              name="address"
              value={this.state.address}
              onChange={(data) => {
                this.setState({
                  address: data.target.value,
                });
              }}
              required
            />

            <button
              type="submit"
              className="button5"
              onClick={()=>this.handleSubmit}
            >
              Создать
            </button>
          </div>
        </form>
      </div>
    );
  }
}
