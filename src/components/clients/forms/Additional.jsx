import React, { useState, useEffect, useCallback } from "react";
import {
  Director,
  Booker,
  RegAddress,
  Warehouse,
  ConsDocuments,
  BankDetails,
} from "../additional";
const Additional = ({ select, setSelect, setAddData, setCount }) => {
  const [mainSelect, setMainSelect] = useState([]);
  const [current, setCurrent] = useState("");

  const [director, setDirector] = useState(null);
  const [booker, setBooker] = useState(null);
  const [regAddress, setRegAddress] = useState(null);
  const [warehouse, setWarehouse] = useState(null);
  const [consDocuments, setConsDocuments] = useState(null);
  const [bankDetails, setBankDetails] = useState(null);
  Booker;

  useEffect(() => {
    if (mainSelect.length <= 0) setMainSelect(select);
    if ((director, booker, regAddress, warehouse, consDocuments, bankDetails))
      setAddData(
        director,
        booker,
        regAddress,
        warehouse,
        consDocuments,
        bankDetails
      );
  }, [
    mainSelect,
    director,
    booker,
    regAddress,
    warehouse,
    consDocuments,
    bankDetails,
  ]);

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
          if (!current && mainSelect.length !== 1) setCount();
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
      {current === "Директор" && <Director setData={setDirector} />}
      {current === "Главный бухгалтер" && <Booker setData={setBooker} />}
      {current === "Адрес регистрации" && (
        <RegAddress setData={setRegAddress} />
      )}
      {current === "Адрес склада и др." && <Warehouse setData={setWarehouse} />}
      {current === "Учредительные документы" && (
        <ConsDocuments setData={setConsDocuments} />
      )}
      {current === "Банковские реквизиты" && (
        <BankDetails setData={setBankDetails} />
      )}
    </div>
  );
};

export default Additional;
