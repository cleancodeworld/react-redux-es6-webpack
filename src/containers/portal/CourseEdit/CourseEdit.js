import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {CourseForm} from 'components';
import { edit } from 'redux/modules/course/edit';
import { load as loadCategories, isLoaded as isCategoriesLoaded } from 'redux/modules/categories/loaded';
import { withCourse, withPortal, withCourseCategories } from 'hoc';

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
  { edit }
)
@withPortal
@withCourse
@withCourseCategories

export default class CourseEdit extends Component {

  static propTypes = {
    course: PropTypes.object.isRequired,
    portal: PropTypes.object.isRequired,
    edit: PropTypes.func,
    params: PropTypes.object.isRequired,
  };

  static pageHeader = {
    title: ' - Edit',
    boldTitle: 'Course'
  };

  render() {
    const { course, params, portal } = this.props;
    const {courseName} = params;
    return (
      <div>
        <Helmet title={`Edit: ${course.get('name')}`}/>
        <CourseForm initialValues={course.toJS()}
                    onSubmit={ model => this.props.edit(model, courseName, portal.meta.get('id')) }/>
      </div>
    );
  }
}
