import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { CourseForm } from 'components';
import {
  PortalLayout,
  PortalAuthorLayout
} from '../index';
import { create as courseCreate } from 'redux/modules/course/create';
import { load as loadCategories, isLoaded as isCategoriesLoaded } from 'redux/modules/categories/loaded';
import { asyncConnect } from 'redux-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    const portalMeta = state.portalCurrent.get('meta');
    // Load categories
    if (!isCategoriesLoaded(state)) {
      promises.push(dispatch(loadCategories(portalMeta.get('slug'))));
    }
    return Promise.all(promises);
  }
}])

@connect(
  ({auth, portalCurrent}) => ({
    userId: auth.getIn(['user', 'userId']),
    portalId: portalCurrent.getIn(['meta', 'id']),
  }),
  { courseCreate }
)
export default class CourseCreate extends Component {

  static propTypes = {
    userId: PropTypes.string,
    portalId: PropTypes.string,
    courseCreate: PropTypes.func,
  };

  state = {
    saved: false
  }

  render() {
    const breadcrumbs = [
      { url: '/author', name: 'Author' },
      { url: '/author/course/list', name: 'Create a Course' }
    ];
    const initialFormValues = {
      level: 'all',
      language: 'English',
      category: 'General',
      duration: 500,
      thumbnail: '',
      authorId: this.props.userId
    };
    const {portalId} = this.props;
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} title="Create a Course">
          <PortalAuthorLayout>
            <Helmet title="Create Course"/>
            <CourseForm initialValues={initialFormValues}
                        onSubmit={ model => this.props.courseCreate(portalId, model).then(()=> this.setState({saved: true})) }
                        submitStatus={this.state.saved}/>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}
