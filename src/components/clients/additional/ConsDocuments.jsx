import React, { useEffect, useState } from "react";

const ConsDocuments = ({ setData }) => {
  const [number, setNumber] = useState("");
  const [date, setDate] = useState(""); //дата регистрации
  const [regName, setRegName] = useState(""); //имя организации зарегестрировавший
  const [regNumber, setRegNumber] = useState(""); //Номер регистрации
  const [regDate, setRegDate] = useState(""); //дата принятия решения о регистрации
  /* "constituent_doc": [         #учередительные документы 

       "number": str             #Номер  

       "date": "10.10.1999"      #дата регистрации 

       "registration_name": "str"   #имя организации зарегестрировавший  

       "registration_number": "str" #Номер регистрации 

       "registration_date": "str"   #дата регистрации 

    },  */
  useEffect(() => {
    if (number && date && regName && regNumber && regDate)
      setData({
        number,
        date,
        registration_name: regName,
        registration_number: regNumber,
        registration_date: regDate,
      });
  }, [number, date, regName, regNumber, regDate]);

  return (
    <div>
      <p className="black">Номер</p>
      <input
        type="text"
        value={number}
        onChange={({ target: { value } }) => setNumber(value)}
      />
      <p className="black">Дата регистрации</p>
      <input
        type="date"
        value={date}
        onChange={({ target: { value } }) => setDate(value)}
      />
      <p className="black">Орган выдавший регистрацию</p>
      <input
        type="text"
        value={regName}
        onChange={({ target: { value } }) => setRegName(value)}
      />
      <p className="black">Номер регистрации</p>
      <input
        type="text"
        value={regNumber}
        onChange={({ target: { value } }) => setRegNumber(value)}
      />
      <p className="black">Дата принятия решения о регистрации</p>
      <input
        type="date"
        value={regDate}
        onChange={({ target: { value } }) => setRegDate(value)}
      />
    </div>
  );
};

export default ConsDocuments;
