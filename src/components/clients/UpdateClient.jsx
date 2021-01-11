import React, { Component } from "react";
import { update_client, get_client } from "../../API/http";

import Autosuggest from "react-autosuggest";
import { cityList, cityName } from "../../API/http";

const getSuggestionValue = (suggestion) => suggestion;

export default class UpdateClient extends Component {
  componentWillMount() {
    setTimeout(() => {
      let payload = {
        get_id: this.props.client,
      };
      get_client(payload).then((data) => {
        if (data.message) {
          console.log(data.message);
        } else {
          console.log(data);
          this.setState({
            name: data.client.name,
            phone: data.client.phone,
            unp: data.client.unp,
            address: data.client.address,
            full_name: data.client.signatory,
          });
        }
      });
    }, 200);
  }

  componentDidMount() {
    cityName({ id: this.state.city_id }).then((data) => {
      if (data.message) {
        console.log(data.message);
      } else {
        this.setState({ city: data.city });
      }
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      unp: "",
      city: "",
      city_id: this.props.city,
      address: "",
      full_name: "",
      suggestions: [],
      error: "",
    };
  }

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

  render() {
    const { suggestions, city } = this.state;
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
            <p className="reg">Изменить клиента</p>
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
            <Autosuggest
              suggestions={suggestions}
              required
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={(suggestions) => <span>{suggestions}</span>}
              inputProps={{
                id: "city",
                name: "city",
                value: city,
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
              onClick={this.props.update}
            >
              Изменить
            </button>
          </div>
        </form>
      </div>
    );
  }
}
