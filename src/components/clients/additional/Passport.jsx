import React, { useState, useEffect } from "react";

const Passport = ({ setData, data }) => {
  const [serial_number, setSerial_number] = useState("");
  const [date_issue, setDate_issue] = useState("");
  const [passport_issued, setPassport_issued] = useState("");

  useEffect(() => {
    if (serial_number && date_issue && passport_issued) {
      console.log(215125);
      setData({
        serial_number,
        date_issue,
        passport_issued,
      });
    }
  }, [serial_number, date_issue, passport_issued]);

  useEffect(() => {
    if (data) {
      setSerial_number(data.serial_number);
      setDate_issue(data.date_issue);
      setPassport_issued(data.passport_issued);
    }
  }, [data]);

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
