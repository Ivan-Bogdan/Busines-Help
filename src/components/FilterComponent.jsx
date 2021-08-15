import React, { useState, useCallback } from 'react';
import DateFilter from './filters/DateFilter';
import FilterClient from './filters/FilterClient';

const FilterComponent = ({ filterList, refetch, setData, onClose }) => {

  const [sort, setSort] = useState('')
  const [filters, setFilters] = useState(filterList)

  const handleChange = (e, index, type) => {
    if (type === 'number') {
      const newDoc = [...filters];
      newDoc[index][e.target.name] = Number(e.target.value);
      setFilters(newDoc);
    } else {
      const newDoc = [...filters];
      newDoc[index][e.target.name] = e.target.value;
      setFilters(newDoc);
    }
  };

  const handleChangeDate = (value, index) => {
    const newDoc = [...filters];
    newDoc[index]["value"] = value;
    setFilters(newDoc);
  }

  return (
    <div style={{ padding: "0 10px" }}>
      {filterList.map((filterItem, index) => (
        <div className='flex' >
          <input type='radio' value={filterItem.filter} name="radio" onChange={({ target }) => setSort(target.value)} checked={sort === filterItem.filter ? true : false}></input>
          <p className="ellips" style={{ padding: "0 10px", width: 250 }}> {filterItem.name}</p>
          <div style={{ width: "100%" }}>
            {filterItem.type !== 'client' && filterItem.type !== 'date' && filterItem.type !== 'select' && <input type={filterItem.type} name="value" value={filterItem.value} onChange={(e) => handleChange(e, index, filterItem.type)} />}
            {filterItem.type === 'date' && <DateFilter change={handleChangeDate} index={index} value={filterItem.value} />}
            {filterItem.type === 'client' && <FilterClient filters={filters} setFilters={setFilters} index={index} value={filterItem.value} />}
            {filterItem.type === 'select' && <select className='select1' style={{ border: "1px solid #ccc" }} name="value" value={filterItem.value} onChange={(e) => handleChange(e, index)}>
              <option value="" disabled selected defaultValue>
                {filterItem.name}
              </option>
              {filterItem.value !== "" && <option value="">
                Сброс
              </option>}
              {filterItem.data.length && filterItem.data.map((item, index) => <option key={index} value={item.value}>{item.label}</option>)}
            </select>}
          </div>
        </div>
      ))
      }
      <button className='button5' onClick={() => {
        const result = filters.map((item) => { return { name: item.filter, value: item.value } }).filter(item => item.value)
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