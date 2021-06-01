import React, { useEffect, useState } from "react";
import MaskedInput from "react-text-mask";

const Booker = ({ setData, data }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (data) {
      setFirstName(data.full_name.name);
      setLastName(data.full_name.family);
      setPatronymic(data.full_name.patronymic);
      setPhone(data.phone);
    }
  }, [data]);

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
      <MaskedInput
        type="text"
        value={phone}
        onChange={({ target: { value } }) => setPhone(value)}
        mask={[
          "+",
          "3",
          "7",
          "5",
          " ",
          "(",
          /\d/,
          /\d/,
          ")",
          " ",
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
        ]}
        showMask
      />
    </div>
  );
};

export default Booker;
