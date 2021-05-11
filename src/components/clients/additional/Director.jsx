import React, { useState, useEffect } from "react";

const Director = ({ setData }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (firstName && lastName && patronymic && phone)
      setData({
        full_name: { name: firstName, family: lastName, patronymic },
        phone,
      });
  }, [firstName, lastName, patronymic, phone]);

  return (
    <div>
      <p className="black">Фамилия</p>
      <input
        type="text"
        placeholder="Иванов"
        value={firstName}
        onChange={({ target: { value } }) => setFirstName(value)}
      />
      <p className="black">Имя</p>
      <input
        type="text"
        placeholder="Иван"
        value={lastName}
        onChange={({ target: { value } }) => setLastName(value)}
      />
      <p className="black">Отчество</p>
      <input
        type="text"
        placeholder="Иванович"
        value={patronymic}
        onChange={({ target: { value } }) => setPatronymic(value)}
      />
      <p className="black">Контактный номер</p>
      <input
        type="text"
        placeholder="+375 (xx) xxx-xx-xx"
        value={phone}
        onChange={({ target: { value } }) => setPhone(value)}
      />
    </div>
  );
};

export default Director;
