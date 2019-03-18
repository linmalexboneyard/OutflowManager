﻿import React, { Component } from 'react';

export class CreateWishListItem extends Component {
    static displayName = CreateWishListItem.name;

    constructor(props) {
        super(props);
        this.state = { loading: false };
    }

    handleSubmit = event => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data);
        fetch("api/WishListItems", {
            method: "post",
            body: data
        })
            .then(response => response.json())
            .then(this.props.reRender);
    };

    renderForm = () => {
        return (
            <form onSubmit={this.handleSubmit}>
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
            <div>
                <h1>Add an Item to Your Wish List</h1>
                <div>
                    {contents}
                </div>
            </div>
        );
    }
}
