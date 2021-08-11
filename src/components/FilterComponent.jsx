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

  const onChange = (event, index, { newValue, method }) => {
    setClient(newValue);
  };

  const getSuggestionValue = (suggestion) => {
    setClientId(suggestion.id);
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
    onChange: (e, index) => handleChange(e, index, true),
  };

  return (
    <div style={{ padding: "0 10px" }}>
      {filterList.map((filterItem, index) => (
        <div className='flex' >
          <input type='radio' value={filterItem.filter} name="radio" onChange={({ target }) => setSort(target.value)} checked={sort === filterItem.filter ? true : false}></input>
          <p className="ellips" style={{ padding: "0 10px", width: 250 }}> {filterItem.name}</p>
          {filterItem.filter !== 'client' ? <input type={filterItem.type || "text"} name="value" onChange={(e) => handleChange(e, index)} /> : <Autosuggest
            name="value"
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
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