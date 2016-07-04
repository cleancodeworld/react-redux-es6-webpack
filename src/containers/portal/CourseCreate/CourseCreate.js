import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {CourseForm} from 'components';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { create as courseCreate } from 'redux/modules/course/create';
import { load as loadCategories, isLoaded as isCategoriesLoaded } from 'redux/modules/categories/loaded';
import { withPortal, withUser, withCourseCategories } from 'hoc';

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
  null,
  { courseCreate }
)
@withPortal
@withUser
@withCourseCategories

export default class CourseCreate extends Component {

  static propTypes = {
    user: PropTypes.object,
    portal: PropTypes.object,
    categories: PropTypes.object,
    courseCreate: PropTypes.func,
  };

  static pageHeader = {
    title: ' - Create',
    boldTitle: 'Course'
  };

  render() {
    const {portal, user, categories} = this.props;
    const initialFormValues = {
      level: 'all',
      language: 'English',
      category: '',
      duration: '',
      thumbnail: '',
      authorId: user.get('userId'),
      author: user.toJS()
    };
    return (
      <div>
        <Helmet title="Create Course"/>
        <CourseForm initialValues={initialFormValues} categories={categories}
                    onSubmit={ model => this.props.courseCreate(portal.meta.get('id'), model)}/>
      </div>
    );
  }
}
