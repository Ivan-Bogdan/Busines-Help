import React, { useState, useEffect } from 'react';

const DateFilter = ({ value, change, index }) => {
  const [firstDate, setFirstDate] = useState('')
  const [lastDate, setLastDate] = useState('')

  useEffect(() => {
    if (firstDate && lastDate)
      change([firstDate, lastDate], index)
    else change("", index)
  }, [index, firstDate, lastDate])

  useEffect(() => {
    if (value) {
      const [first, last] = value;
      setFirstDate(first)
      setLastDate(last)
    }
  }, [value])
  return (
    <div className='flex-date' style={{ width: "100%" }}>
      <input type="date" value={firstDate} onChange={(({ target }) => setFirstDate(target.value))} />
      <input type="date" value={lastDate} onChange={(({ target }) => setLastDate(target.value))} />
    </div>
  );
};

export default DateFilter;