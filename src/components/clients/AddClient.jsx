import React from "react";
import Autosuggest from "react-autosuggest";
import { cityList } from "../../API/http";

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

  validEmail = (userEmail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  };

  render() {
    const { suggestions, city } = this.state;
    const { name, unp, phone, otype, city_id, address } = this.state;
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
            <select
              style={{ border: "1px solid #ccc" }}
              required
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
              <option value={Number(7)}>Физическое лицо</option>
            </select>

            <div className="form__field">
              {this.state.otype !== "7" && this.state.otype.length !== 0 && (
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
              )}
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
              onClick={(event) => {
                event.preventDefault();
                this.props.create(name, unp, phone, otype, city_id, address);
              }}
            >
              Создать
            </button>
          </div>
        </form>
      </div>
    );
  }
}
