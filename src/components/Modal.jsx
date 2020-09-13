import React from "react";
import Autosuggest from "react-autosuggest";
import { cityList } from "../API/http";
import axios from "axios"

import "./style.css";
import "./Modal.css";

const getSuggestionValue = (suggestion) => suggestion;

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      phone: "",
      password: "",
      password2: "",
      role_id: 1,
      data: {
        otype: "",
        name: "",
        unp: "",
        city:"",
        city_id: "",
        address: "",
        oked: "",
        full_name: "",
      },
      suggestions: []
    };
  }

  cityList = (payload) => {
    return axios.post('http://altproduction.ru:8080/rest/v1/city/',JSON.stringify(payload))
.then(response => {
        console.log(response.data.city)
        return response.data 
})
.catch(error => {
        console.log(error)
        return error
})
}

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    console.log(value);
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
    console.log(suggestions);

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
              <option value="0">ИП</option>
              <option value="1">ООО</option>
              <option value="2">ОАО</option>
              <option value="3">ЧУП</option>
              <option value="4">ЧТУП</option>
              <option value="5">ИНОЕ</option>
              <option value="6">Иностранное предприятие</option>
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
            
           <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={(suggestions) => (
                <span>
                  {console.log(suggestions)}
                  {suggestions}
                </span>
              )}
              inputProps={{
                id: "city",
                name: "city",
                value: this.state.city,
                placeholder: "Населенный пункт",
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
                    if(city.length != 0) this.state.city_id = city["0"].id
                    else { this.state.city_id = "null"}
                    console.log(normalize);
                    this.setState({ suggestions: normalize });
                  });

                  this.setState({ city: newValue });
                },
              }}
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

            <button type="submit" className="button5">
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
