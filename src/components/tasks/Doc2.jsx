import React, { useState } from 'react';

const Doc2 = ({ data, index, count, updateDoc, docs, setDocs }) => {
  const [docs_type, setDocs_type] = useState('')
  const [number, setNumber] = useState('')
  const [date, setDate] = useState('')
  const [docs_type, setDocs_type] = useState('')
  return (
    <div className="p5-background">
      <div>
        {index === -1 && <p className="black">Документы</p>}
        <select
          className="select1"
          style={{ border: "1px solid lightgrey" }}
          value={docs_type}
          onChange={({ target: { value } }) => setDocs_type(value)}
        >
          <option value="" disabled selected>
            Добавить документ
          </option>
          <option value={`TTN`}>ТТН</option>
          <option value={`TN`}>ТН</option>
          <option value={`WAYBILL`}>Акт</option>
          <option value={`CONTRACT`}>Договор</option>
        </select>
      </div>
      <div className="flex m25-0">
        <input
          type="text"
          value={number}
          placeholder="Номер"
          onChange={({ target: { value } }) => setNumber(value)}
        />
        <input
          style={{ marginLeft: 10 }}
          type="date"
          value={date}
          placeholder="Дата"
          onChange={({ target: { value } }) => setDate(value)}
        />
        <img
          src={icon_delete}
          className="delete_icon"
          height={34}
          onClick={() => {
            if (data) setDocs(docs.filter(item => item.id !== data.id))
            else {
              setNumber("");
              setDate("");
            }
          }}
          alt="delete"
        />
      </div>
      <div>
        <select
          className={
            count <= index + 1 ? "select1" : "d-none"
          }
          style={{ border: "1px solid lightgrey" }}
          onChange={() => {
            if (number && docs_type && date)
              updateDoc(docs_type, number, date);
            else {
              alert("Заполните поля");
            }
          }}
        >
          <option value="" disabled selected>
            Добавить документ
          </option>
          <option value={`TTN`}>ТТН</option>
          <option value={`TN`}>ТН</option>
          <option value={`WAYBILL`}>Акт</option>
          <option value={`CONTRACT`}>Договор</option>
        </select>
      </div>
    </div>
  );
};

export default Doc2;