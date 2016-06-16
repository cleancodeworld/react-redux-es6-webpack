import React, {Component, PropTypes} from 'react';

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
      title && boldTitle ?
        <div className="page-header-content">
          <div className="page-title">
            <h4>
              {
                boldTitle ? <span className="text-semibold">{boldTitle}</span> : <span></span>
              }
              {title}
            </h4>
          </div>
        </div>
        :
        <span/>
    )
      ;
  }
}
