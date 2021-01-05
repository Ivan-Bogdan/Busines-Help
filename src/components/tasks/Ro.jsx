import React, { Component } from "react";

export default class Ro extends Component {
  render() {
    return (
      <div>
        {this.props.city}
        {this.props.children}
      </div>
    );
  }
}
