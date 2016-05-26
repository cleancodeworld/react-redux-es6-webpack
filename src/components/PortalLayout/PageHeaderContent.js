import React, {Component, PropTypes} from 'react';
import { goBack } from 'react-router-redux';
import {connect} from 'react-redux';

@connect(null, { goBack })
export default class PageHeaderContent extends Component {

  static propTypes = {
    pageHeader: PropTypes.object,
    goBack: PropTypes.func,
  }

  render() {
    const {pageHeader} = this.props;
    if (!pageHeader) return <span/>;
    const { title, boldTitle} = pageHeader;
    return (
      <div className="page-header-content">
        <div className="page-title">
          <h4>
            <a href="javascript:void(0)" onClick={()=>this.props.goBack()}> <i
              className="icon-arrow-left52 position-left"></i>
            </a>&nbsp;
            {
              boldTitle ? <span className="text-semibold">{boldTitle}</span> : <span></span>
            }
            {title}
          </h4>
        </div>
      </div>
    );
  }
}
