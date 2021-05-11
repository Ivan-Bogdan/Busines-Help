import React, { useState, useCallback } from "react";
import { create_client } from "../../../API/http";
import Additional from "./Additional";

const Entity = () => {
  const [unp, setUnp] = useState("");
  const [otype, setOtype] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [addData, setAddData] = useState(null);
  const [count, setCount] = useState(0);
  const [svedeniya, setSvedenia] = useState([
    { label: "Директор", value: 0 },
    { label: "Главный бухгалтер", value: 1 },
    { label: "Адрес регистрации", value: 2 },
    { label: "Адрес склада и др.", value: 3 },
    { label: "Учредительные документы", value: 4 },
    { label: "Банковские реквизиты", value: 5 },
  ]);

  const createClient = useCallback(() => {
    let payload = {
      name,
      phone,
      otype: Number(otype),
      unp,
      ...addData,
    };
    const result = await create_client(payload);
    if (result.message) console.log(result.message);
    else console.log(result);
  }, [name, phone, otype, unp, addData]);

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
        <option value={Number(1)}>ООО</option>
        <option value={Number(2)}>ОАО</option>
        <option value={Number(3)}>ЧУП</option>
        <option value={Number(4)}>ЧТУП</option>
        <option value={Number(7)}>СООО</option>
        <option value={Number(8)}>ЧП</option>
        <option value={Number(9)}>УП</option>
        <option value={Number(5)}>ИНОЕ</option>
      </select>
      <p className="black">Наименование организации</p>
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
      {/* <select
        style={{ border: "1px solid #ccc" }}
        required
        className="select1"
        value={additional}
        onChange={({ target: { value } }) => {
          setAdditional(value);
          // setSvedenia(svedeniya.filter((item) => item.value !== Number(value)));
          setSvedenia(
            svedeniya
              .filter((item) => item.value !== Number(value))
              .map((item, acc) => {
                return { ...item, value: acc };
              })
          );
          setAdditional([
            ...additional,
            {
              label: svedeniya.filter((item) => item.value === Number(value))[0]
                .label,
            },
          ]);
        }}
      >
        <option
          value=""
          disabled
          defaultValue
          style={{ display: "none" }}
        ></option>
        {svedeniya.map((item, acc) => (
          <option key={item.value} value={Number(acc)}>
            {item.label}
          </option>
        ))}
      </select> */}
      {/* {additional.find((item) => item.label === "Директор") && (
        <Director
          data={svedeniya}
          setData={setSvedenia}
          select={additional}
          setSelect={setAdditional}
        />
      )} */}
      <div style={{ textAlign: "center" }}>
        <button className="button5" onClick={createClient}>
          Создать
        </button>
      </div>
    </div>
  );
};

export default Entity;
