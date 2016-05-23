import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {CourseForm} from 'components';
import { edit } from 'redux/modules/course/edit';
import { load as loadCategories, isLoaded as isCategoriesLoaded } from 'redux/modules/categories/loaded';
import {
  PortalLayout,
  PortalAuthorLayout,
  PortalAuthorCourseLayout,
} from '../index';

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
  ({courseLoaded, portalCurrent, categoriesLoaded}, ownProps) => ({
    course: courseLoaded.getIn(['entities', ownProps.params.courseName]),
    portalId: portalCurrent.getIn(['meta', 'id']),
  }),
  { edit }
)
export default class CourseEdit extends Component {

  static propTypes = {
    course: PropTypes.object.isRequired,
    portalId: PropTypes.string.isRequired,
    edit: PropTypes.func,
    params: PropTypes.object.isRequired,
  };
  state = {
    saved: false
  }

  render() {
    const { course, params, portalId } = this.props;
    const {courseName} = params;
    const breadcrumbs = [
      { url: '/author', name: 'Author' },
      { url: '/author/course/list', name: 'Course Mgr' },
      { url: '/author/course/' + courseName, name: course.get('name') },
    ];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} boldTitle="Course Mgr" title={`- ${course.get('name')}` }>
          <PortalAuthorLayout>
            <PortalAuthorCourseLayout params={params}>
              <Helmet title={`Edit: ${course.get('name')}`}/>
              <CourseForm initialValues={course.toJS()}
                          onSubmit={ model => this.props.edit(model, courseName, portalId).then(()=> this.setState({saved: true})) }
                          submitStatus={this.state.saved}/>
            </PortalAuthorCourseLayout>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}
