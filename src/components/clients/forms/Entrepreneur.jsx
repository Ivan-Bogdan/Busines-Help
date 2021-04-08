import React, { useState } from "react";

const Entrepreneur = () => {
  const [unp, setUnp] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [additional, setAdditional] = useState("");
  return (
    <div style={{ marginTop: 15 }}>
      <p className="black">УНП</p>
      <input
        type="text"
        placeholder="180 106 245"
        value={unp}
        onChange={({ target: { value } }) => setUnp(value)}
        required
      />
      <p className="black">Фамилия</p>
      <input
        type="text"
        value={lastName}
        onChange={({ target: { value } }) => setLastName(value)}
      />
      <p className="black">Имя</p>
      <input
        type="text"
        value={firstName}
        onChange={({ target: { value } }) => setFirstName(value)}
      />
      <p className="black">Отчество</p>
      <input
        type="text"
        value={patronymic}
        onChange={({ target: { value } }) => setPatronymic(value)}
      />
      <p className="black">Телефон</p>
      <input
        type="text"
        placeholder="+375 (xx) xxx-xx-xx"
        value={phone}
        onChange={({ target: { value } }) => setPhone(value)}
      />
      <p className="black">Примечание</p>
      <input
        type="text"
        placeholder=""
        value={description}
        onChange={({ target: { value } }) => setDescription(value)}
      />
      <p className="black">Дополнительные сведения</p>
      <select
        style={{ border: "1px solid #ccc" }}
        required
        className="select1"
        value={additional}
        onChange={({ target: { value } }) => setAdditional(value)}
      >
        <option
          value=""
          disabled
          defaultValue
          style={{ display: "none" }}
        ></option>
        <option value={Number(2)}>Адрес регистрации</option>
        <option value={Number(3)}>Адрес склада, офиса</option>
        <option value={Number(4)}>Учредительные документы</option>
        <option value={Number(5)}>Банковские реквизиты</option>
      </select>
      <div style={{ textAlign: "center" }}>
        <button type="submit" className="button5">
          Создать
        </button>
      </div>
    </div>
  );
};

export default Entrepreneur;
