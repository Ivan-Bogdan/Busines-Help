import React, { Component } from "react";

import SocialNetworks from "./assets/img/соцсети.png";


export default class Footer extends Component {
  render() {
    return (
      <footer className="footer" id="footer">
        <div className="container container2">
          <div className="row">
            <div className="col footer_text">
              <a style={{ color: "black" }}>ООО «Наименование ИП»</a>
            </div>
            <div className="col footer_text">
              <a href="">
                О нас
              </a>
            </div>
            <div className="col footer_text">
              <a href="">Как пользоваться</a>
            </div>
            <div className="col footer_text">
              <a style={{ color: "black" }}>© 2017-2020 Все права защищены</a>
            </div>
            <div className="col footer_text">
              <a href="">Контакты</a>
            </div>
            <div className="col footer_text">
              <a href="">Вопрос - Ответ</a>
            </div>
          </div>
          <img src={SocialNetworks} alt="" />
        </div>
      </footer>
    );
  }
}
