import React, { Component } from "react";
import { CreateModal } from "./CreateModal";
import styled from "styled-components";
import { MyButton } from "./MyButton";

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
  //#region //* Styling info -----------------------------------------------------------------------
  ColorScheme = {
    yellowish: "#EFE738",
    purplish: "#6C2EA1",
    pinkish: "#B22A8C"
  };

  ButtonStyling = {
    AddItemButton: {
      color: "white",
      backgroundcolor: this.ColorScheme.purplish,
      bordercolor: this.ColorScheme.purplish,
      margin: "5px"
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
  //#endregion //*---------------------------------------------------------------------------------------

  //#region //* Render and display functions -----------------------------------------------------------------------
  renderHeader = () => {
    let HeaderDiv = styled.div`
      width: 100%;
      display: inline-grid;
      justify-content: space-between;
      align-content: space-around;
      grid-template-columns: auto auto;
    `;

    let createButtonData = this.ButtonStyling["AddItemButton"];

    return (
      <HeaderDiv>
        <p>These are the current wish list items</p>
        <MyButton
          buttonData={createButtonData}
          type="submit"
          onClick={this.handleModalToggle}
        >
          Add Wish List Item
        </MyButton>
      </HeaderDiv>
    );
  };

  renderModal = () => {
    return (
      <CreateModal
        modalType="WishList"
        isClosed={this.state.modalIsHidden}
        handleClose={this.handleModalToggle}
        handleCreate={this.handleCreate}
      >
        Add an Item to Your Wish List
      </CreateModal>
    );
  };

  renderWishListTable = () => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });

    let editButtonData = this.ButtonStyling["EditButton"];
    let deleteButtonData = this.ButtonStyling["DeleteButton"];
    let { wishListItems } = this.state;
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
                <MyButton
                  buttonData={deleteButtonData}
                  type="button"
                  onClick={() => this.handleDelete(wishListItem.id)}
                >
                  Delete
                </MyButton>
                <MyButton
                  buttonData={editButtonData}
                  type="button"
                  onClick={() => this.handleEdit(wishListItem.id)}
                >
                  Edit
                </MyButton>
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
  //#endregion //*---------------------------------------------------------------------------------------

  //#region //* CRUD functions -----------------------------------------------------------------------
  handleDelete = id => {
    let fetchURL = "api/WishListItems/" + id;
    fetch(fetchURL, {
      method: "delete"
    })
      .then(response => response.json())
      .then(data => this.setState({ wishListItems: data }));
  };

  handleEdit = id => {
    console.log(id);
  };

  handleCreate = event => {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch("api/WishListItems", {
      method: "post",
      body: data
    })
      .then(response => response.json())
      .then(data =>
        this.setState({ wishListItems: data, modalIsHidden: true })
      );
  };
  //#endregion

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      <div>
        {this.renderHeader()}
        {this.renderModal()}
        {this.renderWishListTable()}
      </div>
    );

    return (
      <div>
        <h1>Wish List</h1>
        {contents}
      </div>
    );
  }
}