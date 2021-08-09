import React, { useState } from 'react';

const FilterComponent = ({ filterList, refetch }) => {
  const [sort, setSort] = useState('')
  const [filters, setFilters] = useState([])
  return (
    <div style={{ padding: "0 10px" }}>
      {filterList.map((filterItem) => (
        <div className='flex' >
          <input type='radio' value={filterItem.filter} name="radio" onChange={({ target }) => setSort(target.value)} checked={sort === filterItem.filter ? true : false}></input>
          <p className="ellips" style={{ padding: "0 10px" }}> {filterItem.name}</p>
          <input type='text' onChange={({ target }) => {
            const result = { name: filterItem.filter, value: target.value };
            setFilters({ ...filters, result })
          }} />
        </div>
      ))
      }
      <button className='button5'>Применить</button>
    </div >
  );
};

export default FilterComponent;