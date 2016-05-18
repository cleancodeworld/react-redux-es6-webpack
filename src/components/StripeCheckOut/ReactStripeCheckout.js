import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';

export default class ReactStripeCheckout extends Component {

  onToken(token) {
    alert(JSON.stringify(token, null, 4));
  }

  render() {
    return (
      <StripeCheckout
        name="KNExpert"
        description="Knowledge experts"
        image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
        panelLabel="Give Money"
        amount={1000000}
        currency="USD"
        stripeKey="pk_test_ZlDhvs1xLhKDXDDwnjj9TiPV"
        email="info@knexeprt.com"
        token={this.onToken}

      >
        <button className="myOwnButton">
          Checkout KNExpert course
        </button>
      </StripeCheckout>
    );
  }
}
