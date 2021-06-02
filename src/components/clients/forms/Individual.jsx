import React, { useCallback, useEffect, useState } from "react";
import MaskedInput from "react-text-mask";
import { create_client, update_client } from "../../../API/http";
import Additional from "./Additional";

const Individual = ({ client, onClose, FetchData }) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [deleteState, setDeleteState] = useState(null);
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
      if (result.message === "OK") onClose();
      else console.log(result.message);
      FetchData();
    },
    [phone, addData, lastName, patronymic, firstName, FetchData]
  );

  const updateClient = useCallback(
    async (e) => {
      e.preventDefault();
      let payload = {
        id: client.id,
        full_name: { name: firstName, family: lastName, patronymic },
        phone,
        otype: 6,
        ...deleteState,
      };
      const result = await update_client(payload);
      if (result.message === "OK") onClose();
      else console.log(result.message);
      FetchData();
    },
    [phone, deleteState, lastName, patronymic, firstName, client, FetchData]
  );

  useEffect(() => {
    if (client) {
      setPhone(client.phone);
      if (client.full_name) {
        setFirstName(client.full_name.name);
        setLastName(client.full_name.family);
        setPatronymic(client.full_name.patronymic);
      }
    }
  }, [client]);

  useEffect(() => {
    if (deleteState) setDeleteState({ ...deleteState, ...addData });
    else setDeleteState({ ...addData });
  }, [addData]);

  useEffect(() => {
    if (client) {
      if (
        Boolean(
          client.reg_address && svedeniya.find((i) => i.label === "Адрес")
        )
      ) {
        setSvedenia(
          svedeniya
            .filter((item) => item.label !== "Адрес")
            .map((item, acc) => {
              return { ...item, value: acc };
            })
        );
      }

      if (
        Boolean(
          client.passport_data && svedeniya.find((i) => i.label === "Паспорт")
        )
      ) {
        setSvedenia(
          svedeniya
            .filter((item) => item.label !== "Паспорт")
            .map((item, acc) => {
              return { ...item, value: acc };
            })
        );
      }
    }
  }, [client, svedeniya]);

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
      {client && client.reg_address && (
        <Additional
          reg_address={client.reg_address}
          select={svedeniya}
          setSelect={setSvedenia}
          addData={addData}
          setAddData={setAddData}
          setCount={setCount}
          count={count}
          client={client}
        />
      )}
      {client && client.passport_data && (
        <Additional
          passport_data={client.passport_data}
          select={svedeniya}
          setSelect={setSvedenia}
          addData={addData}
          setAddData={setAddData}
          setCount={setCount}
          count={count}
          client={client}
        />
      )}
      <Additional
        select={svedeniya}
        setSelect={setSvedenia}
        addData={addData}
        setAddData={setAddData}
        setCount={setCount}
        count={count}
      />
      {[...Array(count)].map((item, index) => (
        <div key={index}>
          <Additional
            key={index}
            select={svedeniya}
            setSelect={setSvedenia}
            addData={addData}
            setAddData={setAddData}
            setCount={setCount}
            count={count}
          />
        </div>
      ))}
      <div style={{ textAlign: "center" }}>
        {client ? (
          <button className="button5" onClick={updateClient}>
            Обновить
          </button>
        ) : (
          <button className="button5" onClick={createClient}>
            Создать
          </button>
        )}
      </div>
    </div>
  );
};

export default Individual;
