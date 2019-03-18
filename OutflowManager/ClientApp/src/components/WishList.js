import React, { Component } from 'react';

export class WishList extends Component {
  static displayName = WishList.name;

  constructor (props) {
    super(props);
    this.state = { wishListItems: [], loading: true };

      fetch('api/WishListItems')
      .then(response => response.json())
      .then(data => {
          this.setState({ wishListItems: data, loading: false });
      });
  }

    static renderWishListTable(wishListItems) {
        console.log(wishListItems);
    return (
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Payee</th>
            <th>High Price Point</th>
            <th>Low Price Point</th>
          </tr>
        </thead>
        <tbody>
          {wishListItems.map(wishListItem =>
            <tr key={wishListItem.id}>
              <td>{wishListItem.payee}</td>
              <td>{wishListItem.estAmountHigh}</td>
              <td>{wishListItem.estAmountLow}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render () {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
        : WishList.renderWishListTable(this.state.wishListItems);

    return (
      <div>
        <h1>Wish List</h1>
        <p>These are the current wish list items</p>
        {contents}
      </div>
    );
  }
}
