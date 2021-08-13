import React, { useCallback, useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { find_client, get_client } from '../../API/http';
import { getNameOtype } from '../../helpers';

const renderSuggestion = (client) => <span>{`${client.full_name ? getNameOtype(client.otype, client.full_name.name, client.full_name.patronymic, client.full_name.family) : getNameOtype(client.otype, client.name)}`}</span>;

const FilterClient = ({ filters, setFilters, index, value }) => {

  const [client, setClient] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const getClient = useCallback(async (clientId) => {
    if (clientId) {
      const result = await get_client({
        id: clientId,
      });
      const { client } = result;
      setClient(client.full_name ? getNameOtype(client.otype, client.full_name.name, client.full_name.patronymic, client.full_name.family) : getNameOtype(client.otype, client.name));
    }
  }, [])

  useEffect(() => {
    if (value) {
      console.log("214");
      getClient(value)
    }
  }, [getClient, value])

  const onChange = (event, { newValue }) => {
    setClient(newValue);
  };

  const getSuggestionValue = (suggestion, index) => {
    const newDoc = [...filters];
    newDoc[index]["value"] = suggestion.id;
    setFilters(newDoc);
    return suggestion.full_name && getNameOtype(suggestion.otype, suggestion.full_name.name, suggestion.full_name.patronymic, suggestion.full_name.family) || suggestion.name && getNameOtype(suggestion.otype, suggestion.name)
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    find_client(value)
      .then((responce) => {
        setSuggestions(responce.data.clients);
      });
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  return (
    <Autosuggest
      name="value"
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={(suggestion) => getSuggestionValue(suggestion, index)}
      renderSuggestion={renderSuggestion}
      inputProps={{
        placeholder: "Клиент",
        value: client,
        name: "value",
        onChange: onChange
      }}
    />
  );
};

export default FilterClient;