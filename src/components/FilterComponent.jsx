import React from 'react';

const FilterComponent = ({ filterList }) => {
  return (
    <div>
      {filterList.map((filterItem) => (
        <div className='flex'>
          <input type='checkbox'></input>
          <p>{filterItem.name}</p>
          <input type='text'></input>
        </div>
      ))}
    </div>
  );
};

export default FilterComponent;