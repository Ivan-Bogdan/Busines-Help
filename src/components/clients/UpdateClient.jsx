import React from "react";
import Entity from "./forms/Entity";
import "../style.css";
import "../Modal.css";
import Entrepreneur from "./forms/Entrepreneur";
import Individual from "./forms/Individual";
import { get_client } from "../../API/http";

export default class UpdateClient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectType: "entity",
      currentClient: null,
    };
  }

  componentDidMount() {
    const func = async () => {
      if (this.props.client) {
        const clientCurrent = await get_client({
          id: this.props.client,
        });
        this.setState({ currentClient: clientCurrent.client });
      }
    };
    func();
  }

  render() {
    return (
      <div className="modal" id="id01">
        <form className="modal-content animate">
          <div className="imgcontainer">
            <span
              className="close"
              onClick={this.props.onClose}
              title="Close Modal"
            >
              ×
            </span>
            <p className="reg">Новый клиент</p>
            <p style={{ color: "red" }}>{this.state.error}</p>
          </div>

          {this.state.currentClient.otype !== 0 &&
            this.state.currentClient.otype !== 6 && (
              <Entity client={this.state.currentClient} />
            )}
          {this.statecurrentClient.otype === 0 && (
            <Entrepreneur client={this.state.currentClient} />
          )}
          {this.statecurrentClient.otype === 6 && (
            <Individual client={this.state.currentClient} />
          )}
        </form>
      </div>
    );
  }
}
