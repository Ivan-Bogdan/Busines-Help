import React, { useState, useEffect, useCallback } from "react";
import {
  Director,
  Booker,
  RegAddress,
  Warehouse,
  ConsDocuments,
  BankDetails,
  Passport,
} from "../additional";
import icon_delete from "../../../assets/img/удалить.png";

const Additional = ({
  select,
  setSelect,
  setAddData,
  setCount,
  count,
  addData,
}) => {
  const [constSelect, setConstSelect] = useState([]);
  const [mainSelect, setMainSelect] = useState([]);
  const [current, setCurrent] = useState("");

  const [director, setDirector] = useState(null);
  const [booker, setBooker] = useState(null);
  const [regAddress, setRegAddress] = useState(null);
  const [warehouse, setWarehouse] = useState(null);
  const [consDocuments, setConsDocuments] = useState(null);
  const [bankDetails, setBankDetails] = useState(null);
  const [passport, setPassport] = useState(null);

  const deleteItem = useCallback(() => {
    if (director) setAddData({ ...addData, director_data: null });
    if (booker) setAddData({ ...addData, chief_accountant: null });
    if (regAddress) setAddData({ ...addData, reg_address: null });
    if (warehouse) setAddData({ ...addData, warehouse_address: null });
    if (consDocuments) setAddData({ ...addData, constituent_doc: null });
    if (bankDetails) setAddData({ ...addData, bank_details: null });
    if (passport) setAddData({ ...addData, passport_data: null });
  }, [
    director,
    booker,
    regAddress,
    warehouse,
    consDocuments,
    bankDetails,
    passport,
  ]);

  useEffect(() => {
    if (director) setAddData({ ...addData, director_data: director });
    if (booker) setAddData({ ...addData, chief_accountant: booker });
    if (regAddress) setAddData({ ...addData, reg_address: regAddress });
    if (warehouse) setAddData({ ...addData, warehouse_address: warehouse });
    if (consDocuments)
      setAddData({ ...addData, constituent_doc: consDocuments });
    if (bankDetails) setAddData({ ...addData, bank_details: bankDetails });
    if (passport) setAddData({ ...addData, passport_data: passport });
  }, [
    director,
    booker,
    regAddress,
    warehouse,
    consDocuments,
    bankDetails,
    passport,
  ]);

  useEffect(() => {
    if (!mainSelect.length) setConstSelect(select);
    if (mainSelect.length > 0) setSelect(mainSelect);
  }, [constSelect, select, mainSelect]);

  return (
    <div>
      <div className="flex">
        <select
          style={{ border: "1px solid #ccc" }}
          className="select1"
          value={current}
          onChange={({ target: { value } }) => {
            setCurrent(value);

            setMainSelect(
              constSelect
                .filter((item) => item.label !== value)
                .map((item, acc) => {
                  return { ...item, value: acc };
                })
            );

            if (!current && select.length !== 1) setCount(count + 1);
          }}
        >
          <option
            value=""
            disabled
            defaultValue
            style={{ display: "none" }}
          ></option>
          {constSelect.map((item) => (
            <option key={item.value} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
        {current && (
          <img
            src={icon_delete}
            className="delete_icon"
            height={34}
            onClick={() => {
              setSelect(constSelect);
              setCurrent("");
              setCount(count - 1);
              deleteItem();
            }}
            alt="delete"
          />
        )}
      </div>

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
