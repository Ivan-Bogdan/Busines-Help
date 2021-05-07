import React, { useState } from "react";

const BankDetails = ({ setData }) => {
  const [checkAccount, setCheckAccount] = useState(""); //расчётный счёт
  const [bikBank, setBikBank] = useState(""); //БИК
  const [unpBank, setUnpBank] = useState(""); //унп
  const [nameBank, setNameBank] = useState(""); //Имя банка
  const [addressBank, setAddressBank] = useState(""); //Адрес банка

  return <div></div>;
};

export default BankDetails;
