import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import {
  CartCourseList,
} from 'components';

import {showSignUpModal} from 'redux/modules/auth';

import {
  withCourses,
  withCart,
} from 'hoc';

@withCourses
@withCart
@connect(null, { showSignUpModal })

export default class Cart extends Component {

  static propTypes = {
    courses: PropTypes.object,
    cart: PropTypes.object,
    order: PropTypes.object,
    showSignUpModal: PropTypes.func,
  };
  static pageHeader = {   // eslint-disable-line react/sort-comp
    title: 'Shopping Cart'
  };

  getTotalPrice = (entities, order, currency) => {
    let total = 0;
    order.map(courseName => {
      const course = entities.get(courseName);
      const price = course.getIn(['coursePrice', 'price']);
      if (price && course.getIn(['coursePrice', 'currency']) === currency) {
        total += price;
      }
    });
    return total;
  }

  render() {
    const {courses, cart} = this.props;
    const totalUSD = this.getTotalPrice(courses, cart.order, 'USD');
    const totalEuro = this.getTotalPrice(courses, cart.order, 'EURO');
    let priceString = '';
    if (totalUSD) {
      priceString += `${totalUSD}`;
    }
    if (totalEuro) {
      if (totalUSD) {
        priceString += ' + ';
      }
      priceString += `€${totalEuro}`;
    }
    return (
      <div className="page-container">
        <Helmet title="Cart"/>
        <div className="content-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <CartCourseList cart={cart} entities={courses} order={cart.order}
                          onSessionRequired={ ()=> this.props.showSignUpModal()} />
              </div>
              <div className="col-md-3">
                <div className="panel panel-flat">
                  <div className="panel-body">
                    <h6 className="text-semibold no-margin">Total:</h6>
                    <h1 className="panel-title price">${priceString}</h1>
                    <div className="content-group mt-10">
                      <a href="#" className="btn bg-primary legitRipple display-block">Checkout</a>
                    </div>
                    {/* -- coupon code not implemented yet --
                    <hr/>
                    <div className="input-group">
                      <input type="text" placeholder="Insert Coupon Code" className="form-control"/>
                      <span className="input-group-btn">
                        <button type="button" className="btn btn-primary legitRipple">Submit</button>
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
