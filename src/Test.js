import React, { useState } from "react";

const Test = () => {
  const [count, setCount] = useState(45);
  const [selectedTaskPage, setSelectedTaskPage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="block1">
      {!isVisible && (
        <div
          style={{ border: "1px solid rgb(150 141 141)" }}
          onClick={() => setIsVisible(!isVisible)}
        >
          {selectedTaskPage + 1}
        </div>
      )}
      {isVisible && (
        <div className="block2">
          <ul multiple>
            {[...Array(Math.ceil(count))].map((item, acc) => (
              <li
                key={acc}
                value={acc + 1}
                onClick={() => {
                  setSelectedTaskPage(acc);
                  setIsVisible(!isVisible);
                }}
              >
                {acc + 1}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Test;
