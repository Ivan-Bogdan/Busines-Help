import React, { Component } from "react";

import SocialNetworks from "./assets/img/соцсети.png";
import { Link } from "react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <footer className={localStorage.getItem("token") ? "footer footer2" : "footer"} id="footer">
        <div className="container container2">
          <div className="row">
            <div className="col footer_text">
              <a style={{ color: "black" }}>ООО «Наименование ИП»</a>
            </div>
            <div className="col footer_text">
              <Link to="/">О нас</Link>
            </div>
            <div className="col footer_text">
              <Link to="/">Как пользоваться</Link>
            </div>
            <div className="col footer_text">
              <a style={{ color: "black" }}>© 2017-2020 Все права защищены</a>
            </div>
            <div className="col footer_text">
              <Link to="/">Контакты</Link>
            </div>
            <div className="col footer_text">
              <Link to="/">Вопрос - Ответ</Link>
            </div>
          </div>
          <img src={SocialNetworks} alt="" />
        </div>
      </footer>
    );
  }
}
