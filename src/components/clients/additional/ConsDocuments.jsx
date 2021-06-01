import React, { useEffect, useState } from "react";

const ConsDocuments = ({ setData, data }) => {
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [regName, setRegName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [regDate, setRegDate] = useState("");

  useEffect(() => {
    if (number && date && regName && regNumber && regDate)
      setData({
        number,
        date,
        registration_name: regName,
        registration_number: regNumber,
        registration_date: regDate,
      });
  }, [number, date, regName, regNumber, regDate]);

  useEffect(() => {
    if (data) {
      setNumber(data.number);
      setDate(data.date);
      setRegName(data.registration_name);
      setRegNumber(data.registration_name);
      setRegDate(data.registration_date);
    }
  }, [data]);

  return (
    <div>
      <p className="black">Номер</p>
      <input
        type="text"
        value={number}
        onChange={({ target: { value } }) => setNumber(value)}
      />
      <p className="black">Дата регистрации</p>
      <input
        type="date"
        value={date}
        onChange={({ target: { value } }) => setDate(value)}
      />
      <p className="black">Орган выдавший регистрацию</p>
      <input
        type="text"
        value={regName}
        onChange={({ target: { value } }) => setRegName(value)}
      />
      <p className="black">Номер регистрации</p>
      <input
        type="text"
        value={regNumber}
        onChange={({ target: { value } }) => setRegNumber(value)}
      />
      <p className="black">Дата принятия решения о регистрации</p>
      <input
        type="date"
        value={regDate}
        onChange={({ target: { value } }) => setRegDate(value)}
      />
    </div>
  );
};

export default ConsDocuments;
