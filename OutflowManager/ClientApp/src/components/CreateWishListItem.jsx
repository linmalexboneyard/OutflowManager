import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import ReactModal from 'react-modal';

export class CreateWishListItem extends Component {
    static displayName = CreateWishListItem.name;

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
            .then(data=> this.setState({ toWishList: true, wishListItems:data}))
    };

    renderForm = () => {
        return (
            <form onSubmit={this.props.handleCreate}>
                <div className="form-group">
                    <label>Item Wanted</label>
                    <input
                        type="text"
                        className="form-control"
                        id="1"
                        name="Payee"
                    />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="1"
                        name="Date"
                    />
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
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderForm();

        return (
            <ReactModal isOpen={this.props.isOpen}>
                <button className="btn btn-primary" type="submit" onClick={this.props.handleClose}>
                    Close
                </button>
                <h1>Add an Item to Your Wish List</h1>
                <div>
                    {contents}
                </div>
            </ReactModal>
        );
    }
}
