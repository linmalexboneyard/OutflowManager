import React, { Component } from "react";
import styled from "styled-components";

export class MyButton extends Component {
  static displayName = MyButton.name;

  render() {
    let { buttonData } = this.props;
    let Button = styled.button`
      background-color: ${buttonData.backgroundcolor};
      border: solid 1px ${buttonData.bordercolor};
      color: ${buttonData.color};
      border-radius: 5px;
      margin: ${buttonData.margin};
    `;
    return (
      <Button type={this.props.type} onClick={this.props.onClick}>
        {this.props.children}
      </Button>
    );
  }
}
