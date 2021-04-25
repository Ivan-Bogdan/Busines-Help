import React, { useState } from "react";

const Director = () => {
  const [FIO, setFIO] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <div>
      <p className="black">ФИО</p>
      <input
        type="text"
        placeholder="Иванов Иван Иванович"
        value={FIO}
        onChange={({ target: { value } }) => setFIO(value)}
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
