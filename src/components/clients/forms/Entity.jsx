import React, { useState } from "react";

const Entity = () => {
  const [unp, setUnp] = useState("");
  const [otype, setOtype] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [additional, setAdditional] = useState("");
  let svedeniya = [
    "Директор",
    "Главный бухгалтер",
    "Адрес регистрации",
    "Адрес склада и др.",
    "Учредительные документы",
    "Банковские реквизиты",
  ];
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
      <p className="black">Форма собственности</p>
      <select
        style={{ border: "1px solid #ccc" }}
        required
        className="select1"
        value={otype}
        onChange={({ target: { value } }) => setOtype(value)}
      >
        <option
          value=""
          disabled
          defaultValue
          style={{ display: "none" }}
        ></option>
        <option value={Number(0)}>ОАО</option>
        <option value={Number(1)}>ООО</option>
        <option value={Number(2)}>COOO</option>
        <option value={Number(3)}>ЧП</option>
        <option value={Number(4)}>УП</option>
        <option value={Number(5)}>ГП</option>
        <option value={Number(6)}>УО</option>
        <option value={Number(7)}>КФХ</option>
        <option value={Number(7)}>ИНОЕ</option>
      </select>
      <p className="black">Наименоание организации</p>
      <input
        type="text"
        placeholder=""
        value={name}
        onChange={({ target: { value } }) => setName(value)}
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
        onChange={({ target: { value } }) => {
          setAdditional(value);
          svedeniya.filter();
        }}
      >
        <option
          value=""
          disabled
          defaultValue
          style={{ display: "none" }}
        ></option>
        {svedeniya.map((item, acc) => (
          <option value={Number(acc)}>{item}</option>
        ))}
      </select>
      <div style={{ textAlign: "center" }}>
        <button type="submit" className="button5">
          Создать
        </button>
      </div>
    </div>
  );
};

export default Entity;
