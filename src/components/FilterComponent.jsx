import React, { useState } from 'react';

const FilterComponent = ({ filterList, refetch, refetchSort, onClose }) => {
  const [sort, setSort] = useState('')
  const [filters, setFilters] = useState(filterList.map(item => { return { ...item, value: '' } }))

  const handleChange = (e, index) => {
    const newDoc = [...filters];
    newDoc[index][e.target.name] = e.target.value;
    setFilters(newDoc);
  };

  return (
    <div style={{ padding: "0 10px" }}>
      {filterList.map((filterItem, index) => (
        <div className='flex' >
          <input type='radio' value={filterItem.filter} name="radio" onChange={({ target }) => setSort(target.value)} checked={sort === filterItem.filter ? true : false}></input>
          <p className="ellips" style={{ padding: "0 10px", width: 250 }}> {filterItem.name}</p>
          <input type='text' name="value" onChange={(e) => handleChange(e, index)} />
        </div>
      ))
      }
      <button className='button5' onClick={() => {
        refetchSort(sort);
        refetch(filters)
        onClose()
      }}>Применить</button>
    </div >
  );
};

export default FilterComponent;