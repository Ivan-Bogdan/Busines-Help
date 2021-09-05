import React from "react";
import Entity from "./forms/Entity";
import "../style.css";
import "../Modal.css";
import Entrepreneur from "./forms/Entrepreneur";
import Individual from "./forms/Individual";

export default class AddClient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectType: "entity",
    };
  }

  render() {
    const { FetchData, onClose } = this.props

    return (
      <div className="modal" id="id01">
        <form className="modal-content animate">
          <div className="imgcontainer">
            <span
              className="close"
              onClick={onClose}
              title="Close Modal"
            >
              ×
            </span>
            <p className="reg">Новый клиент</p>
            <p style={{ color: "red" }}>{this.state.error}</p>
          </div>

          <div className="container3">
            <div className="flex ">
              <div
                className={
                  this.state.selectType === "entity" ? "grey green" : "grey"
                }
                id="entity"
                onClick={() => {
                  this.setState({ selectType: "entity" });
                }}
              >
                ЮР. ЛИЦО
              </div>
              <div
                className={
                  this.state.selectType === "entrepreneur"
                    ? "grey green"
                    : "grey"
                }
                onClick={() => {
                  this.setState({ selectType: "entrepreneur" });
                }}
              >
                ИП
              </div>
              <div
                className={
                  this.state.selectType === "individual" ? "grey green" : "grey"
                }
                onClick={() => {
                  this.setState({ selectType: "individual" });
                }}
              >
                ФИЗ. ЛИЦО
              </div>
            </div>

            {this.state.selectType === "entity" && (
              <Entity
                onClose={onClose}
                FetchData={FetchData}
              />
            )}
            {this.state.selectType === "entrepreneur" && (
              <Entrepreneur
                key={0}
                onClose={onClose}
                FetchData={FetchData}
              />
            )}
            {this.state.selectType === "individual" && (
              <Individual
                key={6}
                onClose={onClose}
                FetchData={FetchData}
              />
            )}
          </div>
        </form>
      </div>
    );
  }
}
