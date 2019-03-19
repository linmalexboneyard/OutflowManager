import React, { Component } from "react";
import { CreateWishListItem } from "./CreateWishListItem";
import styled from "styled-components";

export class WishList extends Component {
  static displayName = WishList.name;

  constructor(props) {
    super(props);
    this.state = { wishListItems: [], loading: true, modalIsOpen: false };

    fetch("api/WishListItems")
      .then(response => response.json())
      .then(data => {
        this.setState({ wishListItems: data, loading: false });
      });
  }

  toggleModal = () => {
    this.state.modalIsOpen
      ? this.setState({ modalIsOpen: false })
      : this.setState({ modalIsOpen: true });
  };

  handleItemDelete(wishlistItemID) {
    let fetchURL = "api/WishListItems/" + wishlistItemID;
    fetch(fetchURL, {
      method: "delete"
    })
      .then(response => response.json())
      .then(data => this.setState({ wishListItems: data }));
  }

  handleItemCreate = event => {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch("api/WishListItems", {
      method: "post",
      body: data
    })
      .then(response => response.json())
      .then(data => this.setState({ wishListItems: data, modalIsOpen: false }));
  };

  renderWishListTable = wishListItems => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Payee</th>
            <th>Low Price Point</th>
            <th>High Price Point</th>
            <th>Date</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {wishListItems.map(wishListItem => (
            <tr key={wishListItem.id}>
              <td>{wishListItem.payee}</td>
              <td>{formatter.format(wishListItem.estAmountLow)}</td>
              <td>{formatter.format(wishListItem.estAmountHigh)}</td>
              <td>{wishListItem.date}</td>

              <td>
                <button
                  className="btn btn-warning m-1"
                  type="button"
                  onClick={() => this.handleItemDelete(wishListItem.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning m-1"
                  type="button"
                  onClick={() => this.handleItemDelete(wishListItem.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderWishListTable(this.state.wishListItems)
    );

    let AddItemButton = styled.button`
      background-color: #383276;
      color: white;
      border: solid 1px #383276;
      border-radius: 5px;
    `;

    let HeaderDiv = styled.div`
      width: 100%;
      justify-items: end;
      display: inline-grid;
    `;

    return (
      <div>
        <h1>Wish List</h1>
        <HeaderDiv>
          <AddItemButton type="submit" onClick={this.toggleModal}>
            Add Wish List Item
          </AddItemButton>
        </HeaderDiv>
        <CreateWishListItem
          isOpen={this.state.modalIsOpen}
          handleClose={this.toggleModal}
          handleCreate={this.handleItemCreate}
        />
        <p>These are the current wish list items</p>
        {contents}
      </div>
    );
  }
}
