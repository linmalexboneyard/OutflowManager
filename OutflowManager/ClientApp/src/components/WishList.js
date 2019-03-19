import React, { Component } from "react";
import { CreateWishListItem } from "./CreateWishListItem";
import styled from "styled-components";

export class WishList extends Component {
  static displayName = WishList.name;

  constructor(props) {
    super(props);
    this.state = { wishListItems: [], loading: true, modalIsHidden: true };

    fetch("api/WishListItems")
      .then(response => response.json())
      .then(data => {
        this.setState({ wishListItems: data, loading: false });
      });
  }

  ColorScheme = {
    yellowish: "#EFE738",
    purplish: "#6C2EA1",
    pinkish: "#B22A8C"
  };

  ButtonData = {
    AddItemButton: {
      color: "white",
      backgroundcolor: this.ColorScheme.purplish,
      bordercolor: this.ColorScheme.purplish,
      margin: "0px"
    },
    DeleteButton: {
      color: "white",
      backgroundcolor: this.ColorScheme.pinkish,
      bordercolor: this.ColorScheme.pinkish,
      margin: "5px"
    },
    EditButton: {
      color: "black",
      backgroundcolor: this.ColorScheme.yellowish,
      bordercolor: this.ColorScheme.yellowish,
      margin: "5px"
    }
  };

  renderButton = buttonName => {
    let buttonData = this.ButtonData[buttonName];
    let Button = styled.button`
      background-color: ${buttonData.backgroundcolor};
      border: solid 1px ${buttonData.bordercolor};
      color: ${buttonData.color};
      border-radius: 5px;
      margin: ${buttonData.margin};
    `;
    return Button;
  };

  renderWishListTable = wishListItems => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });

    let EditButton = this.renderButton("EditButton");
    let DeleteButton = this.renderButton("DeleteButton");

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
                <DeleteButton
                  type="button"
                  onClick={() => this.handleItemDelete(wishListItem.id)}
                >
                  Delete
                </DeleteButton>
                <EditButton
                  type="button"
                  onClick={() => this.handleItemDelete(wishListItem.id)}
                >
                  Edit
                </EditButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  handleModalToggle = () => {
    this.state.modalIsHidden
      ? this.setState({ modalIsHidden: false })
      : this.setState({ modalIsHidden: true });
  };

  handleItemDelete = id => {
    let fetchURL = "api/WishListItems/" + id;
    fetch(fetchURL, {
      method: "delete"
    })
      .then(response => response.json())
      .then(data => this.setState({ wishListItems: data }));
  };

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

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderWishListTable(this.state.wishListItems)
    );

    const HeaderDiv = styled.div`
      width: 100%;
      justify-items: end;
      display: inline-grid;
    `;
    const AddItemButton = this.renderButton("AddItemButton");

    return (
      <div>
        <h1>Wish List</h1>
        <HeaderDiv>
          <AddItemButton type="submit" onClick={this.handleModalToggle}>
            Add Wish List Item
          </AddItemButton>
        </HeaderDiv>
        <CreateWishListItem
          isClosed={this.state.modalIsHidden}
          handleClose={this.handleModalToggle}
          handleCreate={this.handleItemCreate}
        />
        <p>These are the current wish list items</p>
        {contents}
      </div>
    );
  }
}
