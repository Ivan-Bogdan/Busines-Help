import React, { useState, useEffect } from "react";
import {
  Director,
  Booker,
  RegAddress,
  Warehouse,
  ConsDocuments,
  BankDetails,
  Passport,
} from "../additional";
const Additional = ({ select, setSelect, setAddData, setCount, addData }) => {
  const [mainSelect, setMainSelect] = useState([]);
  const [current, setCurrent] = useState("");

  const [director, setDirector] = useState(null);
  const [booker, setBooker] = useState(null);
  const [regAddress, setRegAddress] = useState(null);
  const [warehouse, setWarehouse] = useState(null);
  const [consDocuments, setConsDocuments] = useState(null);
  const [bankDetails, setBankDetails] = useState(null);
  const [passport, setPassport] = useState(null);

  useEffect(() => {
    if (mainSelect.length <= 0) setMainSelect(select);
    if (director) setAddData({ ...addData, director_data: director });
    if (booker) setAddData({ ...addData, chief_accountant: booker });
    if (regAddress) setAddData({ ...addData, reg_address: regAddress });
    if (warehouse) setAddData({ ...addData, warehouse_address: warehouse });
    if (consDocuments)
      setAddData({ ...addData, constituent_doc: consDocuments });
    if (bankDetails) setAddData({ ...addData, bank_details: bankDetails });
    if (passport) setAddData({ ...addData, passport_data: passport });
  }, [
    mainSelect,
    director,
    booker,
    regAddress,
    warehouse,
    consDocuments,
    bankDetails,
    passport,
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
      {current === "Паспорт" && <Passport setData={setPassport} />}
      {current === "Адрес" && <RegAddress setData={setRegAddress} />}
    </div>
  );
};

export default Additional;
