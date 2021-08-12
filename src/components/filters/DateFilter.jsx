import React, { useState, useEffect } from 'react';

const DateFilter = ({ change, index }) => {
  const [firstDate, setFirstDate] = useState('')
  const [lastDate, setLastDate] = useState('')

  useEffect(() => {
    if (firstDate && lastDate) {
      change([firstDate, lastDate], index)
    }

  }, [index,])
  return (
    <div className='flex'>
      <input type="date" value={firstDate} onChange={(({ target }) => setFirstDate(target.value))} />
      <input type="date" value={lastDate} onChange={(({ target }) => setLastDate(target.value))} />
    </div>
  );
};

export default DateFilter;