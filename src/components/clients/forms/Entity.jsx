import React, { useState, useCallback, useEffect } from "react";
import { create_client, update_client } from "../../../API/http";
import Additional from "./Additional";
import MaskedInput from "react-text-mask";

const Entity = ({ client }) => {
  const [unp, setUnp] = useState("");
  const [otype, setOtype] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [deleteState, setDeleteState] = useState(null);
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

  const [clientCopy, setClientCopy] = useState(client);
  const createClient = useCallback(
    async (e) => {
      e.preventDefault();
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
    },
    [name, phone, otype, unp, addData]
  );

  const updateClient = useCallback(
    async (e) => {
      e.preventDefault();
      let payload = {
        id: client.id,
        name,
        phone,
        otype: Number(otype),
        unp,
        ...addData,
      };
      const result = await update_client(payload);
      if (result.message) console.log(result.message);
      else console.log(result);
    },
    [name, phone, otype, unp, addData]
  );

  useEffect(() => {
    if (client) {
      setPhone(client.phone);
      setOtype(client.otype);
      setUnp(client.unp);
      setName(client.name);
    }
  }, [client]);

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
          client.chief_accountant &&
            svedeniya.find((i) => i.label === "Главный бухгалтер")
        )
      ) {
        setSvedenia(
          svedeniya
            .filter((item) => item.label !== "Главный бухгалтер")
            .map((item, acc) => {
              return { ...item, value: acc };
            })
        );
      }
      if (
        Boolean(
          client.director_data && svedeniya.find((i) => i.label === "Директор")
        )
      ) {
        setSvedenia(
          svedeniya
            .filter((item) => item.label !== "Директор")
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

  useEffect(() => {
    if (deleteState) setDeleteState(...deleteState, ...addData);
    else setDeleteState(...addData);
  }, [addData]);

  return (
    <div style={{ marginTop: 15 }}>
      <p className="black">УНП</p>
      <MaskedInput
        type="text"
        placeholder="180 106 245"
        value={unp}
        onChange={({ target: { value } }) => setUnp(value.replace(/\s/g, ""))}
        mask={[/\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/]}
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
      <div>
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
      <p className="black">Примечание</p>
      <input
        type="text"
        placeholder=""
        value={description}
        onChange={({ target: { value } }) => setDescription(value)}
      />
      <p className="black">Дополнительные сведения</p>
      {clientCopy && clientCopy.director_data && (
        <Additional
          director_data={client.director_data}
          select={svedeniya}
          setSelect={setSvedenia}
          addData={addData}
          setAddData={setAddData}
          setCount={setCount}
          count={count}
          client={client}
        />
      )}
      {clientCopy && clientCopy.chief_accountant && (
        <Additional
          chief={client.chief_accountant}
          select={svedeniya}
          setSelect={setSvedenia}
          addData={addData}
          setAddData={setAddData}
          setCount={setCount}
          count={count}
          client={client}
        />
      )}
      {clientCopy && clientCopy.reg_address && (
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
      {clientCopy && clientCopy.warehouse_address && (
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
      {clientCopy && clientCopy.constituent_doc && (
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
      {clientCopy && clientCopy.bank_details && (
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

export default Entity;
