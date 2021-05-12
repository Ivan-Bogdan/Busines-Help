import React, { useState, useEffect } from "react";

const Passport = ({ setData }) => {
  const [serial_number, setSerial_number] = useState(""); //серия номер
  const [date_issue, setDate_issue] = useState(""); //дата выдачи
  const [passport_issued, setPassport_issued] = useState(""); //кто выдал

  useEffect(() => {
    if (serial_number && date_issue && passport_issued)
      setData({
        serial_number,
        date_issue,
        passport_issued,
      });
  }, [serial_number, date_issue, passport_issued]);

  return (
    <div>
      <p className="black">Cерия, номер</p>
      <input
        type="text"
        value={serial_number}
        onChange={({ target: { value } }) => setSerial_number(value)}
      />
      <p className="black">Дата выдачи</p>
      <input
        type="date"
        value={date_issue}
        onChange={({ target: { value } }) => setDate_issue(value)}
      />
      <p className="black">Кто выдал</p>
      <input
        type="text"
        value={passport_issued}
        onChange={({ target: { value } }) => setPassport_issued(value)}
      />
    </div>
  );
};

export default Passport;
