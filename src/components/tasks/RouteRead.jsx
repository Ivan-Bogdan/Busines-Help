import React, { useEffect } from "react";
import { cityName } from "../../API/http";
import "./styleTask.css";

const RouteRead = ({ city, address }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    async function func() {
      if (city) {
        const result = await cityName({
          id: city,
        });
        setValue(result.city);
      }
    }
    func();
  }, [city]);
  return (
    <div className="flex p5-background" id="route">
      <input type="text" value={value} />
      <div className="flex ml10">
        <input
          type="text"
          placeholder="Улица, дом"
          value={address}
          name="Adress"
        />
      </div>
    </div>
  );
};

export default RouteRead;
