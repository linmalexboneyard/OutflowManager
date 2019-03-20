import React, { Component } from "react";
import styled from "styled-components";

export class EditModal extends Component {
  static displayName = EditModal.name;

  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  //#region //* forms -----------------------------------------------------------------------
  forms = {
    WishList: (
      <form onSubmit={this.props.handleEdit} method="dialog">
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
    )
  };

  renderForm = formtype => {
    return this.forms[formtype];
  };
  //#endregion

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderForm(this.props.modalType)
    );

    let Modal = styled.dialog`
      height: auto;
      display: grid;
      width: 75%;
    `;

    let ModalHeader = styled.div`
      display: inline-grid;
      grid-template-columns: auto auto;
      justify-content: space-between;
    `;

    return (
      <Modal hidden={this.props.isClosed}>
        <ModalHeader>
          <h1>{this.props.children}</h1>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={this.props.handleClose}
          >
            X
          </button>
        </ModalHeader>
        {contents}
      </Modal>
    );
  }
}
