import React, {Component} from 'react';
import Select from 'react-select';

export default class SelectComponent extends Component {
  render() {
    const { value, onBlur, ...props } = this.props;   // eslint-disable-line react/prop-types
    return (
      <Select
        {...props}
        value={value || ''}
        onBlur={() => onBlur(value)} />
    );
  }
}
