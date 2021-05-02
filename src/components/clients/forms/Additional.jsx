import React, { useState, useEffect } from "react";
import {
  Director,
  Booker,
  RegAddress,
  Warehouse,
  ConsDocuments,
  BankDetails,
} from "../additional";
const Additional = ({ select, setSelect, setNewSelect, setCount }) => {
  const [mainSelect, setMainSelect] = useState([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    if (mainSelect.length <= 0) setMainSelect(select);
    if (mainSelect.length === 1) setCurrent(mainSelect[0].label);
  }, [mainSelect]);

  return (
    <div>
      <select
        style={{ border: "1px solid #ccc" }}
        className="select1"
        value={current}
        onChange={({ target: { value } }) => {
          setCurrent(value);
          setSelect(
            select
              .filter((item) => item.label !== value)
              .map((item, acc) => {
                return { ...item, value: acc };
              })
          );
          if (!current) setCount();
        }}
      >
        <option
          value=""
          disabled
          defaultValue
          style={{ display: "none" }}
        ></option>
        {mainSelect.map((item) => (
          <option key={item.value} value={item.label}>
            {item.label}
          </option>
        ))}
      </select>
      {current === "Директор" && <Director />}
      {current === "Главный бухгалтер" && <Booker />}
      {current === "Адрес регистрации" && <RegAddress />}
      {current === "Адрес склада и др." && <Warehouse />}
      {current === "Учредительные документы" && <ConsDocuments />}
      {current === "Банковские реквизиты" && <BankDetails />}
    </div>
  );
};

export default Additional;
