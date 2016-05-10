import React, {Component, PropTypes} from 'react';

export default class PageHeaderContent extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    boldTitle: PropTypes.string,
  }

  render() {
    const {title, boldTitle} = this.props;
    return (
      <div className="page-header-content">
        <div className="page-title">
          <h4><i className="icon-arrow-left52 position-left"></i>&nbsp;
            {(() => {
              if (boldTitle) {
                return (<span className="text-semibold">{boldTitle}</span>);
              }
              return '';
            })()}
            {title}
          </h4>
        </div>
      </div>
    );
  }
}
