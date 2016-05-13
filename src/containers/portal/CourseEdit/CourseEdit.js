import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {CourseForm} from 'components';
import { edit } from 'redux/modules/course/edit';
import {
  PortalLayout,
  PortalAuthorLayout,
  PortalAuthorCourseLayout,
} from '../index';

@connect(
  ({courseLoaded}, ownProps) => ({
    course: courseLoaded.getIn(['entities', ownProps.params.courseName]),
  }),
  { edit }
)
export default class CourseEdit extends Component {

  static propTypes = {
    course: PropTypes.object.isRequired,
    edit: PropTypes.func,
    params: PropTypes.object.isRequired,
  };
  state = {
    saved: false
  }

  render() {
    const { course, params } = this.props;
    const {courseName} = params;
    const breadcrumbs = [
      { url: '/author', name: 'Author' },
      { url: '/author/course/list', name: 'Course Mgr' },
      { url: '/author/course/' + courseName, name: course.get('name') },
    ];
    let courseValues = course;
    if (typeof courseValues.toJS !== 'undefined') {
      courseValues = courseValues.toJS();
    }
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} boldTitle="Course Mgr" title={`- ${course.get('name')}` }>
          <PortalAuthorLayout>
            <PortalAuthorCourseLayout params={params}>
              <Helmet title="Home"/>
              <CourseForm initialValues={courseValues}
                          onSubmit={ model => this.props.edit(model, courseName).then(()=> this.setState({saved: true})) }
                          submitStatus={this.state.saved}/>
            </PortalAuthorCourseLayout>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}
