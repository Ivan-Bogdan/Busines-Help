import React, { Component } from "react";

export default class ActionsTask extends Component {
  render() {
    return (
      <div className="modal">
        <form class="modal-content2 animate">
          <div class="imgcontainer">
            <span
              className="close"
              onClick={this.props.onClose}
              title="Close Modal"
            >
              ×
            </span>
            <p class="reg">Действия задания</p>
          </div>
          {this.props.children}

          <div style={{display:"block"}}>
            <button
              type="submit"
              className="button_create"
              onClick={this.LoginUser}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="button_create"
              onClick={this.LoginUser}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    );
  }
}
