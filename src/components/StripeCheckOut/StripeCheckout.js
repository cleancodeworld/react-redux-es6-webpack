import React, {Component, PropTypes} from 'react';

export default class StripeCheckout extends Component {
  static propTypes = {
    onSuccess: PropTypes.func
  };

  state = {
    browser: false
  }

  componentWillMount() {
    this.setState({ browser: false }); // eslint-disable-line react/no-did-mount-set-state
  }

  componentDidMount() {
    this.setState({ browser: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  render() {
    let res = (<div>Loading</div>);
    const {onSuccess} = this.props;
    if (this.state.browser) {
      const ReactStripeCheckout = require('./ReactStripeCheckout');
      res = (
        <ReactStripeCheckout onSuccess={onSuccess}
        />
      );
    }
    return res;
  }
}
