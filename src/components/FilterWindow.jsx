import React, { useState } from "react";

const FilterWindow = ({ onClose }) => {
  const [desc, setDesc] = useState(false);
  const [sort, setSort] = useState("name");
  return (
    <div className="modal-content4">
      <div className="flex">
        <p>Сортировать по</p>
        <select value={sort} onChange={(data) => setSort(data.target.value)}>
          <option value="name">Название</option>
          <option value="date">Дата</option>
        </select>
      </div>
      <div className="flex">
        <p>Desc</p>
        <input type="checkbox" onClick={() => setDesc(!desc)}></input>
      </div>
      <div className="flex">
        <button className="button5" onClick={() => onClose()}>
          Применить
        </button>
      </div>
    </div>
  );
};

export default FilterWindow;
