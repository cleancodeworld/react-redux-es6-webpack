import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const ReactStripeCheckout = ({onSuccess, amount})=> {
  return (
    <StripeCheckout
      name="KNExpert"
      description="Knowledge experts"
      image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
      panelLabel="Give Money"
      amount={amount}
      currency="USD"
      stripeKey="pk_test_ZlDhvs1xLhKDXDDwnjj9TiPV"
      email="info@knexeprt.com"
      token={onSuccess}
    >
      <button className="btn btn-primary btn-block">
        Pay with Stripe
      </button>
    </StripeCheckout>
  );
};

export default ReactStripeCheckout;
