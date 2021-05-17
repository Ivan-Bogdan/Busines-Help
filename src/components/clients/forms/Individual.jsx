import React, { useCallback, useState } from "react";
import MaskedInput from "react-text-mask";
import { create_client } from "../../../API/http";
import Additional from "./Additional";

const Individual = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [addData, setAddData] = useState(null);
  const [count, setCount] = useState(0);
  const [svedeniya, setSvedenia] = useState([
    { label: "Паспорт", value: 0 },
    { label: "Адрес", value: 1 },
  ]);

  const createClient = useCallback(
    async (e) => {
      e.preventDefault();
      let payload = {
        full_name: { name: firstName, family: lastName, patronymic },
        phone,
        otype: 6,
        ...addData,
      };
      const result = await create_client(payload);
      if (result.message) console.log(result.message);
      else console.log(result);
    },
    [phone, addData, lastName, patronymic, firstName]
  );
  return (
    <div style={{ marginTop: 15 }}>
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
      <p className="black">Примечание</p>
      <input
        type="text"
        placeholder=""
        value={description}
        onChange={({ target: { value } }) => setDescription(value)}
      />
      <p className="black">Дополнительные сведения</p>
      <Additional
        select={svedeniya}
        setSelect={setSvedenia}
        addData={addData}
        setAddData={setAddData}
        setCount={() => setCount(count + 1)}
      />
      {[...Array(count)].map((item, index) => (
        <div key={index}>
          <Additional
            key={index}
            select={svedeniya}
            setSelect={setSvedenia}
            addData={addData}
            setAddData={setAddData}
            setCount={() => setCount(count + 1)}
          />
        </div>
      ))}
      <div style={{ textAlign: "center" }}>
        <button type="submit" className="button5" onClick={createClient}>
          Создать
        </button>
      </div>
    </div>
  );
};

export default Individual;
