import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { cityName } from "../../API/http";
import PLUS_icon from "../../assets/img/PLUS_icon.png";

const renderSuggestion = (suggestion) => (
  <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.8 }}>
    <span>
      {" "}
      {suggestion.type_abbr}. {suggestion.city}{" "}
    </span>{" "}
    <div>
      {suggestion.city !== suggestion.district && (
        <span style={{ color: "#aaa", fontSize: 12 }}>
          {suggestion.district} р-н,
        </span>
      )}{" "}
      <span style={{ color: "#aaa", fontSize: 12 }}>{suggestion.region} </span>
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


  componentDidMount() {
    const data = this.props.data
    func = async () => {
      const result = await cityName({
        id: data.city,
      });
      this.setState({ city: result.city })
    }
    if (data) {
      this.setState({ city_id: data.city, address: data.address });
      func();
    }
  }
  getSuggestionValue = (suggestion) => {
    this.setState({ city_id: suggestion.id });
    if (this.state.address && this.state.city_id)
      this.props.updateObjRoute(this.state.address, this.state.city_id);
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
      <div className="flex p5-background" id="route">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <div className="flex ml10">
          <input
            type="text"
            placeholder="Улица, дом"
            value={this.state.address}
            name="Adress"
            onChange={({ target: { value } }) => {
              if (this.props.data) {

              } else {
                this.setState({ address: value });
                if (value && this.state.city_id)
                  this.props.updateObjRoute(
                    value,
                    this.state.city_id
                  );
              }
            }}
          />
          {this.props.count <= this.props.number + 1 && (
            <img
              src={PLUS_icon}
              onClick={() =>
                this.props.updateData(this.state.address, this.state.city_id)
              }
              className="plus_icon"
              alt="plus"
              height={47}
            />
          )}
        </div>
      </div>
    );
  }
}
