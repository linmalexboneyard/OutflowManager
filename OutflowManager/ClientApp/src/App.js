import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout.jsx";
import { Home } from "./components/Home.jsx";
import { WishList } from "./components/WishList.jsx";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/wish-list" component={WishList} />
      </Layout>
    );
  }
}
