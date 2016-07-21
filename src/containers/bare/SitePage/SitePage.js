import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {asyncConnect} from 'redux-connect';
import { load, isLoaded } from 'redux/modules/sitePage';

@asyncConnect([{
  promise: ({params, store: {dispatch, getState}}) => {
    const promises = [];
    if (!isLoaded(getState(), params.sitePageId)) {
      promises.push(dispatch(load(params.sitePageId, params.sitePageName)));
    }
    return Promise.all(promises);
  }
}])

@connect(({sitePage}, ownProps)=>({ sitePage: sitePage.get(ownProps.params.sitePageId) }))

export default class SitePage extends Component {
  static propTypes = {
    sitePage: PropTypes.object.isRequired,
  };

  render() {
    const {sitePage} = this.props;
    if (!sitePage) return (<span/>);
    return (
      <div className="row">
        <div className="col-md-offset-3 col-md-6">
          <Helmet title="Home"/>
          <h1 className="text-center">{sitePage.get('title')}</h1>
          <div dangerouslySetInnerHTML={(()=>({__html: sitePage.get('html')}))()}></div>
        </div>
      </div>
    );
  }
}
