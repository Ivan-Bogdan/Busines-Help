import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { find_client } from '../API/http';
import { getNameOtype } from '../helpers';

const renderSuggestion = (client) => <span>{`${client.full_name ? getNameOtype(client.otype, client.full_name.name, client.full_name.patronymic, client.full_name.family) : getNameOtype(client.otype, client.name)}`}</span>;

const FilterComponent = ({ filterList, refetch, onClose }) => {
  const [sort, setSort] = useState('')
  const [filters, setFilters] = useState(filterList.map(item => { return { name: item.filter, value: '' } }))

  const [client, setClient] = useState("");
  const [clientId, setClientId] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e, index, isClient) => {
    console.log(e);
    if (isClient && clientId) {
      const newDoc = [...filters];
      newDoc[index][e.target.name] = clientId;
      setFilters(newDoc);
    } else {
      const newDoc = [...filters];
      newDoc[index][e.target.name] = e.target.value;
      setFilters(newDoc);
    }

  };

  const onChange = (event, { newValue }, index) => {
    console.log(event);
    const newDoc = [...filters];
    setClient(newValue);
    newDoc[index]["value"] = clientId;
    setFilters(newDoc);

  };

  const getSuggestionValue = (suggestion) => {
    const newDoc = [...filters];
    newDoc[indzsex]["value"] = suggestion.id;
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

  const inputProps = {
    placeholder: "Клиент",
    value: client,
    onChange: onChange
  };

  return (
    <div style={{ padding: "0 10px" }}>
      {filterList.map((filterItem, index) => (
        <div className='flex' >
          <input type='radio' value={filterItem.filter} name="radio" onChange={({ target }) => setSort(target.value)} checked={sort === filterItem.filter ? true : false}></input>
          <p className="ellips" style={{ padding: "0 10px", width: 250 }}> {filterItem.name}</p>
          {filterItem.filter !== 'client' ? <input type={filterItem.type || "text"} name="value" onChange={(e) => handleChange(e, index)} /> : <Autosuggest
            name="value"
            onChange={(e) => handleChange(e, index, true)}
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              placeholder: "Клиент",
              value: client,
              name: "value",
              onChange: (e, lol) => {
                onChange(e, lol, index)
              }
            }}
          />}
        </div>
      ))
      }
      <button className='button5' onClick={() => {
        const result = filters.filter(item => item.value)
        console.log(result);
        refetch(result, sort)
        onClose()
      }}
        disabled={!sort}>Применить</button>
    </div >
  );
};

export default FilterComponent;