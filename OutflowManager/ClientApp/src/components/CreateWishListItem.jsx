import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

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
        if (this.state.toWishList === true) {
            return <Redirect
                to={{
                    pathname: "/wish-list",
                    state: { wishListItems: this.state.wishListItems }
                }}
            />
        }

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
