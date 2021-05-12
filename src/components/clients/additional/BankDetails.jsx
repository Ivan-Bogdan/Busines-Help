import React, { useState, useEffect } from "react";

const BankDetails = ({ setData }) => {
  const [checkAccount, setCheckAccount] = useState(""); //расчётный счёт
  const [bikBank, setBikBank] = useState(""); //БИК
  const [unpBank, setUnpBank] = useState(""); //унп
  const [nameBank, setNameBank] = useState(""); //Имя банка
  const [addressBank, setAddressBank] = useState(""); //Адрес банка

  useEffect(() => {
    if (checkAccount && bikBank && unpBank && nameBank && addressBank)
      setData({
        checking_account: checkAccount,
        bik_bank: bikBank,
        unp_bank: unpBank,
        name_bank: nameBank,
        address_bank: addressBank,
      });
  }, [checkAccount, bikBank, unpBank, nameBank, addressBank]);

  return (
    <div>
      <p className="black">Расчётный счёт</p>
      <div className="form__field">
        <input
          type="text"
          pattern="(\d{2})BAPB(\d{4})(\d{4})(\d{4})(\d{4})"
          placeholder=""
          value={checkAccount}
          onChange={({ target: { value } }) => setCheckAccount(value)}
        />{" "}
        <span className="form__error">
          Неверном формат. Пример: XX BAPB ХХХХ ХХХХ ХХХХ ХХХХ ХХХХ
        </span>
      </div>
      <p className="black">БИК</p>
      <input
        type="text"
        placeholder="Иван"
        value={bikBank}
        onChange={({ target: { value } }) => setBikBank(value)}
      />
      <p className="black">УНП</p>
      <input
        type="text"
        placeholder="180 023 521"
        value={unpBank}
        onChange={({ target: { value } }) => setUnpBank(value)}
      />
      <p className="black">Имя банка</p>
      <input
        type="text"
        value={nameBank}
        onChange={({ target: { value } }) => setNameBank(value)}
      />
      <p className="black">Адрес банка</p>
      <input
        type="text"
        value={addressBank}
        onChange={({ target: { value } }) => setAddressBank(value)}
      />
    </div>
  );
};

export default BankDetails;
