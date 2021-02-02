import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { cityList } from "../../API/http";

const getSuggestionValue = (suggestion) => suggestion;

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
            placeholder: "Город, деревня",
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
                  this.setState({ city_id: null });
                }
                this.setState({ suggestions: normalize });
              });

              this.setState({ city: newValue });
            },
          }}
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
        {/*  {(this.state.address.length === 0 ||
          this.state.city_id.length === 0) && (
          <p style={{ color: "red" }}>Заполните поля</p>
        )} */}
        {/*  <div style={{ marginLeft: "20px" }}></div> */}
        {/* {[...Array(this.state.count)].map((item, acc) => (
                  <Route point={acc + 1} updateData={this.updateData} />
                ))} */}
      </div>
    );
  }
}
