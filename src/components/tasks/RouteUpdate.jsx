import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { cityList, cityName } from "../../API/http";

const getSuggestionValue = (suggestion) => suggestion;

export default class RouteUpdate extends Component {
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
      suggestions: [],
      city: "",
      city_id: this.props.city,
      address: this.props.address,
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
    const { suggestions } = this.state;
    return (
      <div style={{ marginLeft: "20px" }}>
        <Autosuggest
          required
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={(suggestions) => <span>{suggestions}</span>}
          inputProps={{
            id: "city",
            disabled: this.props.disabled,
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
                if (city.length !== 0) {
                  this.setState({ city_id: city["0"].id });
                } else {
                  this.setState({ city_id: "null" });
                }
                this.setState({ suggestions: normalize });
              });

              this.setState({ city: newValue });
            },
          }}
        />
        <input
          type="text"
          placeholder="Адрес"
          value={this.state.address}
          name="Adress"
          onChange={(data) => {
            this.setState({ address: data.target.value });
            this.props.updateData(
              data.target.value,
              this.state.city_id,
              this.props.point,
              this.props.id
            );
          }}
          disabled={this.props.disabled}
        />
        {(this.state.address.length == 0 || this.state.city_id.length == 0) && (
          <p style={{ color: "red" }}>
            Пока не заполнишь поля, плюс не нажмётся
          </p>
        )}
        <div style={{ marginLeft: "20px" }}></div>
      </div>
    );
  }
}
