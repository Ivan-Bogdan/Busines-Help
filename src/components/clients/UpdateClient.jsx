import React, { Component } from "react";
import { update_client, get_client } from "../../API/http";

import Autosuggest from "react-autosuggest";
import { cityList, cityName } from "../../API/http";

import "../style.css";
import "../Modal.css";

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

  updateClient = (e) => {
    e.preventDefault();
    let payload = {
      id: this.props.client,
      phone: this.state.phone,
      name: this.state.name,
      unp: this.state.unp,
      city_id: this.state.city_id,
      address: this.state.address,
      full_name: this.state.full_name,
    };
    update_client(payload).catch((err) => {
      console.log(err);
    });
    setTimeout(() => {
      window.location.href = `/myclients/`;
    }, 100);
  };

  getSuggestionValue = (suggestion) => {
    this.setState({ city_id: suggestion.id });
    return suggestion.city;
  };

  onChange = (event, { newValue, method }) => {
    this.setState({
      city: newValue,
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

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { suggestions, city } = this.state;
    const inputProps = {
      placeholder: "Населеный пункт",
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
              onClick={this.updateClient}
            >
              Изменить
            </button>
          </div>
        </form>
      </div>
    );
  }
}
