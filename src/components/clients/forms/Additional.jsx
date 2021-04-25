import React, { useState } from "react";
import {
  Director,
  Booker,
  RegAddress,
  Warehouse,
  ConsDocuments,
  BankDetails,
} from "../additional";
const Additional = ({ select, setSelect, setNewSelect }) => {
  const [current, setCurrent] = useState("");
  console.log(select.filter((item) => item.label === current));
  return (
    <div>
      <select
        style={{ border: "1px solid #ccc" }}
        required
        className="select1"
        value={current}
        onChange={({ target: { value } }) => {
          setCurrent(value);
          setNewSelect(
            select
              .filter((item) => item.value !== Number(value))
              .map((item, acc) => {
                return { ...item, value: acc };
              })
          );
        }}
      >
        <option
          value=""
          disabled
          defaultValue
          style={{ display: "none" }}
        ></option>
        {select.map((item) => (
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
