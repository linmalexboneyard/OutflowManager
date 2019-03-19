import React, { Component } from "react";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Hello!</h1>
        <p>
          Welcome to my Outflow Manager, a single-page application built with:
        </p>
        <ul>
          <li>
            <a href="https://get.asp.net/">ASP.NET Core</a> and{" "}
            <a href="https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx">
              C#
            </a>{" "}
            for cross-platform server-side code
          </li>
          <li>
            <a href="https://facebook.github.io/react/">React</a> for
            client-side code
          </li>
          <li>
            <a href="https://www.styled-components.com/docs/basics">
              Styled-Components
            </a>{" "}
            for layout and styling
          </li>
        </ul>
      </div>
    );
  }
}
