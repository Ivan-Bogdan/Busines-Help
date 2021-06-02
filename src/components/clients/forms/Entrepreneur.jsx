import React, { useState, useCallback, useEffect } from "react";
import MaskedInput from "react-text-mask";
import { create_client, update_client } from "../../../API/http";
import Additional from "./Additional";

const Entrepreneur = ({ client, onClose, FetchData }) => {
  const [unp, setUnp] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [deleteState, setDeleteState] = useState(null);
  const [addData, setAddData] = useState(null);
  const [count, setCount] = useState(0);
  const [svedeniya, setSvedenia] = useState([
    { label: "Адрес регистрации", value: 0 },
    { label: "Адрес склада и др.", value: 1 },
    { label: "Учредительные документы", value: 2 },
    { label: "Банковские реквизиты", value: 3 },
  ]);

  const createClient = useCallback(
    async (e) => {
      e.preventDefault();
      let payload = {
        full_name: { name: firstName, family: lastName, patronymic },
        phone,
        otype: 0,
        unp,
        ...addData,
      };
      const result = await create_client(payload);
      if (result.message === "OK") onClose();
      else console.log(result.message);
      FetchData();
    },
    [phone, unp, addData, firstName, lastName, patronymic, FetchData]
  );

  const updateClient = useCallback(
    async (e) => {
      e.preventDefault();
      let payload = {
        id: client.id,
        full_name: { name: firstName, family: lastName, patronymic },
        phone,
        otype: 0,
        unp,
        ...deleteState,
      };
      const result = await update_client(payload);
      if (result.message === "OK") onClose();
      else console.log(result.message);
      FetchData();
    },
    [
      phone,
      unp,
      deleteState,
      client,
      firstName,
      lastName,
      patronymic,
      FetchData,
    ]
  );

  useEffect(() => {
    if (client) {
      setPhone(client.phone);
      setUnp(client.unp);
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
          client.reg_address &&
            svedeniya.find((i) => i.label === "Адрес регистрации")
        )
      ) {
        setSvedenia(
          svedeniya
            .filter((item) => item.label !== "Адрес регистрации")
            .map((item, acc) => {
              return { ...item, value: acc };
            })
        );
      }

      if (
        Boolean(
          client.warehouse_address &&
            svedeniya.find((i) => i.label === "Адрес склада и др.")
        )
      ) {
        setSvedenia(
          svedeniya
            .filter((item) => item.label !== "Адрес склада и др.")
            .map((item, acc) => {
              return { ...item, value: acc };
            })
        );
      }
      if (
        Boolean(
          client.bank_details &&
            svedeniya.find((i) => i.label === "Банковские реквизиты")
        )
      ) {
        setSvedenia(
          svedeniya
            .filter((item) => item.label !== "Банковские реквизиты")
            .map((item, acc) => {
              return { ...item, value: acc };
            })
        );
      }
      if (
        Boolean(
          client.constituent_doc &&
            svedeniya.find((i) => i.label === "Учредительные документы")
        )
      ) {
        setSvedenia(
          svedeniya
            .filter((item) => item.label !== "Учредительные документы")
            .map((item, acc) => {
              return { ...item, value: acc };
            })
        );
      }
    }
  }, [client, svedeniya]);

  return (
    <div style={{ marginTop: 15 }}>
      <p className="black">УНП</p>
      <MaskedInput
        type="text"
        placeholder="180 106 245"
        value={unp}
        onChange={({ target: { value } }) => setUnp(value.replace(/\s/g, ""))}
        mask={[/\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/]}
        required
      />
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
      {client && client.warehouse_address && (
        <Additional
          warehouse_address={client.warehouse_address}
          select={svedeniya}
          setSelect={setSvedenia}
          addData={addData}
          setAddData={setAddData}
          setCount={setCount}
          count={count}
          client={client}
        />
      )}
      {client && client.constituent_doc && (
        <Additional
          constituent={client.constituent_doc}
          select={svedeniya}
          setSelect={setSvedenia}
          addData={addData}
          setAddData={setAddData}
          setCount={setCount}
          count={count}
          client={client}
        />
      )}
      {client && client.bank_details && (
        <Additional
          bank_details={client.bank_details}
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

export default Entrepreneur;
