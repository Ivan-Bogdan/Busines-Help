import React from "react";
import img251 from "../../assets/img/kisspng-button-computer-icons-editing-encapsulated-postscr-5b3b488b1c1ac4.9135163415306118511151.png";

import "./styleTask.css";

const TestTask = () => {
  return (
    <div>
      <div className="main container_task">
        <div className="greenlight">
          <div className="title">
            <div className="color-grey">15.05.21</div>
            <div className="color-green">Выполнена</div>
          </div>
        </div>
        <div>
          <div className="flex-task">
            <div className="block1">
              <div className="price color-green">+2000,00 BYN</div>
              <div>
                <div className="paid">Оплачено/Долг</div>
                <div className="price-debt">
                  <span className="color-green">2000,00 </span>/ 0
                </div>
              </div>
            </div>
            <div className="block3">
              <div className="w407">
                <div className="task_name">ОАО "Кирпич-комплект"</div>
                <div className="fz20 color-grey">Витебск - Минск</div>
                <div className="fw600 fz20">Арматура</div>
              </div>
              <div>
                <img className="cursor" src={img251} alt="" width={40}></img>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main container_task">
        <div className="bluelight">
          <div className="title">
            <div className="color-grey">17.05.21</div>
            <div className="color-lightblue">В работе</div>
          </div>
        </div>
        <div>
          <div className="flex-task">
            <div className="block1">
              <div className="price color-blue">2000,00 BYN</div>
              <div>
                <div className="paid">Оплачено/Долг</div>
                <div className="price-debt">
                  <span className="color-green">2000,00 </span>/{" "}
                  <span className="color-red">1500,00</span>
                </div>
              </div>
            </div>
            <div className="block3">
              <div className="w407">
                <div className="task_name">ЧУП "Реклама"</div>
                <div className="fz20 color-grey">Гомель - Витебск</div>
                <div className="fw600 fz20">Кирпич</div>
              </div>
              <div>
                <img className="cursor" src={img251} alt="" width={40}></img>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main container_task">
        <div className="redlight">
          <div className="title">
            <div className="color-grey">19.05.21</div>
            <div className="color-red">Не выполнена</div>
          </div>
        </div>
        <div>
          <div className="flex-task">
            <div className="block1">
              <div className="price color-red"> -1500,00 BYN</div>
              <div>
                <div className="paid">Оплачено/Долг</div>
                <div className="price-debt">
                  <span className="color-grey">0 </span>/{" "}
                  <span className="color-red">1500,00</span>
                </div>
              </div>
            </div>
            <div className="block3">
              <div className="w407">
                <div className="task_name">ЧУП "Ремонт-комплект"</div>
                <div className="fz20 color-grey">Браслав - Витебск</div>
                <div className="fw600 fz20">Строительные работы</div>
              </div>
              <div>
                <img className="cursor" src={img251} alt="" width={40}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestTask;
