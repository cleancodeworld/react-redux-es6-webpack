import React, {Component, PropTypes} from 'react';

export default class TextEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    browser: false
  }

  componentDidMount() {
    this.setState({ browser: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  render() {
    let res = (<div>Loading</div>);
    if (this.state.browser) {
      const RteEditor = require('./RteEditor');
      res = (
        <RteEditor
          value={this.state.value}
          onChange={this.onChange}
        />
      );
    }
    return res;
  }
}
