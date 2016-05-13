import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { CourseAccountingForm } from 'components';
import {
  PortalLayout,
  PortalAuthorLayout,
  PortalAuthorCourseLayout,
} from '../index';
import { load, edit } from 'redux/modules/course/price';

@asyncConnect([{
  promise: ({store: {dispatch}, params}) => {
    const promises = [];
    if (params.courseName) {
      promises.push(dispatch(load(params.courseName)));
    }
    return Promise.all(promises);
  }
}])
@connect(
  ({courseLoaded, coursePrice}, ownProps) => ({
    course: courseLoaded.getIn(['entities', ownProps.params.courseName]),
  }),
  { edit }
)
export default class CourseAccounting extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    course: PropTypes.object.isRequired,
    edit: PropTypes.func.isRequired,
  };

  state = {
    saved: false
  }

  render() {
    const {params: { courseName }, course} = this.props;
    const breadcrumbs = [
      { url: '/author', name: 'Author' },
      { url: '/author/course/list', name: 'Course Mgr' },
      { url: '/author/course/' + courseName, name: course.get('name') },
    ];
    const defaultPrice = {
      paid: true,
      currency: 'USD',
      price: 30
    };
    const price = course.get('price') ? course.get('price').toJS() : defaultPrice;

    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} boldTitle="Course Mgr" title={' - ' + course.get('name')}>
          <PortalAuthorLayout>
            <PortalAuthorCourseLayout params={this.props.params}>
              <Helmet title="Home"/>
              <CourseAccountingForm
                initialValues={price}
                submitStatus={this.state.saved}
                onSubmit={model => {
                  this.setState({saved: false});
                  return this.props.edit(model, courseName).then(() => this.setState({saved: true}));
                }}/>
            </PortalAuthorCourseLayout>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}
