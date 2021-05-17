import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";

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

const Warehouse = ({ setData }) => {
  const [city, setCity] = useState("");
  const [city_id, setCity_id] = useState("");
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (event, { newValue, method }) => {
    setCity(newValue);
  };

  const getSuggestionValue = (suggestion) => {
    setCity_id(suggestion.id);
    return suggestion.city;
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    fetch(`http://altproduction.ru:8080/rest/v1/city/`, {
      method: "POST",
      body: JSON.stringify({
        city: value,
        limit: 10,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data.city);
      });
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  useEffect(() => {
    if (city_id && address)
      setData({
        city: city_id,
        address,
      });
  }, [city_id, address]);

  const inputProps = {
    placeholder: "Населеный пункт",
    value: city,
    onChange: onChange,
  };

  return (
    <div className="" id="route">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      <div className="">
        <input
          type="text"
          placeholder="Улица, дом"
          value={address}
          name="Adress"
          onChange={({ target: { value } }) => setAddress(value)}
        />
      </div>
    </div>
  );
};

export default Warehouse;
