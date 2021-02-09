import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { cityName } from "../../API/http";

const renderSuggestion = (suggestion) => (
  <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.8 }}>
    <span>
      {" "}
      {suggestion.type_abbr}. {suggestion.city}{" "}
    </span>{" "}
    <div>
      <span style={{ color: "#aaa", fontSize: 10 }}>{suggestion.region} </span>
      {suggestion.city !== suggestion.district && (
        <span style={{ color: "#aaa", fontSize: 10 }}>
          {suggestion.district} район
        </span>
      )}
    </div>
  </div>
);

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
      <div style={{ marginLeft: "20px" }}>
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
        {(this.state.address.length === 0 ||
          this.state.city_id.length === 0) && (
          <p style={{ color: "red" }}>
            Пока не заполнишь поля, плюс не нажмётся
          </p>
        )}
        <div style={{ marginLeft: "20px" }}></div>
      </div>
    );
  }
}
