import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import { cityName } from "../../API/http";
import PLUS_icon from "../../assets/img/PLUS_icon.png";
import icon_delete from "../../assets/img/удалить.png";

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

const RouteUpdate = ({ data, updateData, number, count, routes, setRoutes }) => {
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

  const inputProps = {
    placeholder: "Населеный пункт",
    value: city,
    onChange: onChange,
  };

  useEffect(() => {
    if (data) {
      setCity_id(data.city);
      setAddress(data.address);
    }
  }, [data]);

  useEffect(() => {
    if (city_id && !city) {
      async function func() {
        if (city_id) {
          const result = await cityName({
            id: city_id,
          });
          setCity(result.city);
        }
      }
      func();
    }
  }, [city_id, city]);

  return (
    <div className="flex p5-background" id="route">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      <div className="flex ml10">
        <input
          type="text"
          placeholder="Улица, дом"
          value={address}
          name="Adress"
          onChange={({ target: { value } }) => setAddress(value)}
        />

        {count > number + 1 && (
          <img
            src={icon_delete}
            className="delete_icon"
            height={34}
            onClick={() => setRoutes(routes.filter(item => item.point !== number))}
            alt="delete"
          />
        )}

        {count <= number + 1 && (
          <img
            src={PLUS_icon}
            onClick={() => {
              if (!city_id || !address) alert("Заполните все поля")
              return city_id && address && updateData(address, city_id)
            }}
            className="plus_icon"
            alt="plus"
            height={47}
          />
        )}
      </div>
    </div>
  );
};

export default RouteUpdate;
