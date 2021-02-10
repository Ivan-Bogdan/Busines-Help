import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import PLUS_icon from "../../assets/img/PLUS_icon.png";

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

export default class Route extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: [],
      city: "",
      city_id: "",
      address: "",
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <input
          style={{ marginLeft: 10 }}
          type="text"
          placeholder="Улица, дом"
          value={this.state.address}
          name="Adress"
          onChange={(data) => {
            this.setState({ address: data.target.value });
            this.props.updateData(
              data.target.value,
              this.state.city_id,
              this.props.point
            );
          }}
        />
        <img
          src={PLUS_icon}
          alt="plus"
          height={47}
          style={{ marginLeft: 10, cursor: "pointer" }}
        />
      </div>
    );
  }
}
