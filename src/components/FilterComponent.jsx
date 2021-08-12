import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { find_client } from '../API/http';
import { getNameOtype } from '../helpers';
import DateFilter from './filters/DateFilter';

const renderSuggestion = (client) => <span>{`${client.full_name ? getNameOtype(client.otype, client.full_name.name, client.full_name.patronymic, client.full_name.family) : getNameOtype(client.otype, client.name)}`}</span>;

const FilterComponent = ({ filterList, refetch, onClose }) => {
  const [sort, setSort] = useState('')
  const [filters, setFilters] = useState(filterList.map(item => { return { name: item.filter, value: '' } }))

  const [client, setClient] = useState("");
  const [clientId, setClientId] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e, index) => {
    const newDoc = [...filters];
    newDoc[index][e.target.name] = e.target.value;
    setFilters(newDoc);
  };

  const handleChangeDate = (value, index) => {
    const newDoc = [...filters];
    newDoc[index]["value"] = value;
    setFilters(newDoc);
  }

  const onChange = (event, { newValue }, index) => {
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
          {filterItem.type !== 'client' && filterItem.type !== 'date' && <input type="text" name="value" onChange={(e) => handleChange(e, index)} />}
          {filterItem.type === 'date' && <DateFilter change={handleChangeDate} index={index} />}
          {filterItem.type === 'client' &&
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
                onChange: (e, lol) => onChange(e, lol, index)
              }}
            />}
          {filterItem.type === 'select' && <select className='select1' name="value" onChange={(e) => handleChange(e, index)}>
            {filterItem.data.map((item) => <option value={item.value}>{item.label}</option>)}
          </select>}
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