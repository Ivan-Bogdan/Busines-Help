import React, { useState, useCallback } from 'react';
import Autosuggest from 'react-autosuggest';
import { find_client, get_client } from '../API/http';
import { getNameOtype } from '../helpers';
import DateFilter from './filters/DateFilter';

const renderSuggestion = (client) => <span>{`${client.full_name ? getNameOtype(client.otype, client.full_name.name, client.full_name.patronymic, client.full_name.family) : getNameOtype(client.otype, client.name)}`}</span>;

const FilterComponent = ({ filterList, refetch, setData, onClose }) => {
  const [sort, setSort] = useState('')
  const [filters, setFilters] = useState(filterList)

  const [client, setClient] = useState("");
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

  const inputProps = {
    placeholder: "Клиент",
    value: client,
    onChange: onChange
  };

  const getClient = useCallback(async (clientId) => {
    if (clientId) {
      const result = await get_client({
        id: clientId,
      });
      const { client } = result;
      return (client.full_name ? getNameOtype(client.otype, client.full_name.name, client.full_name.patronymic, client.full_name.family) : getNameOtype(client.otype, client.name));
    }
  }, [])

  return (
    <div style={{ padding: "0 10px" }}>
      {filterList.map((filterItem, index) => (
        <div className='flex' >
          <input type='radio' value={filterItem.filter} name="radio" onChange={({ target }) => setSort(target.value)} checked={sort === filterItem.filter ? true : false}></input>
          <p className="ellips" style={{ padding: "0 10px", width: 250 }}> {filterItem.name}</p>
          <div style={{ width: "100%" }}>
            {filterItem.type !== 'client' && filterItem.type !== 'date' && filterItem.type !== 'select' && <input type={filterItem.type} name="value" value={filterItem.value} onChange={(e) => handleChange(e, index)} />}
            {filterItem.type === 'date' && <DateFilter change={handleChangeDate} index={index} value={filterItem.value} />}
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
                  value: client || getClient(filterItem.value),
                  name: "value",
                  onChange: onChange
                }}
              />}
            {filterItem.type === 'select' && <select className='select1' style={{ border: "1px solid #ccc" }} name="value" value={filterItem.value} onChange={(e) => handleChange(e, index)}>
              <option value="" disabled selected defaultValue>
                {filterItem.name}
              </option>
              {filterItem.data.length && filterItem.data.map((item, index) => <option key={index} value={item.value}>{item.label}</option>)}
            </select>}
          </div>
        </div>
      ))
      }
      <button className='button5' onClick={() => {
        const result = filters.map((item) => { return { name: item.name, value: item.value } }).filter(item => item.value)
        console.log(result);
        refetch(result, sort)
        setData(filters)
        onClose()
      }}
      >
        Применить
      </button>
    </div >
  );
};

export default FilterComponent;