import React, { Component } from "react";
import styled from "styled-components";

export class CreateModal extends Component {
  static displayName = CreateModal.name;

  constructor(props) {
    super(props);
    this.state = { loading: false, toWishList: false, wishListItems: [] };
  }

  handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch("api/WishListItems", {
      method: "post",
      body: data
    })
      .then(response => response.json())
      .then(data => this.setState({ toWishList: true, wishListItems: data }));
  };

  renderForm = () => {
    return (
      <form onSubmit={this.props.handleCreate} method="dialog">
        <div className="form-group">
          <label>Item Wanted</label>
          <input type="text" className="form-control" id="1" name="Payee" />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" className="form-control" id="1" name="Date" />
        </div>
        <div className="form-group">
          <label>Estimated Low-end Price</label>
          <input
            type="number"
            className="form-control"
            id="1"
            name="EstAmountLow"
          />
        </div>
        <div className="form-group">
          <label>Estimated High-End Price</label>
          <input
            type="number"
            className="form-control"
            id="1"
            name="EstAmountHigh"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    );
  };

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderForm()
    );

    let Modal = styled.dialog`
      display: grid;
    `;

    let Button = styled.button`
      justify-self: end;
    `;

    return (
      <Modal hidden={this.props.isClosed}>
        <Button
          className="btn btn-primary"
          type="submit"
          onClick={this.props.handleClose}
        >
          X
        </Button>
        <h1>Add an Item to Your Wish List</h1>
        {contents}
      </Modal>
    );
  }
}
