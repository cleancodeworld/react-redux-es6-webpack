import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {CourseForm} from 'components';
import { connect } from 'react-redux';
import {
  PortalLayout,
  PortalAuthorLayout
} from '../index';
import { create as courseCreate } from 'redux/modules/course/create';

@connect(
  ({auth, portalCurrent}) => ({ auth, portalId: portalCurrent.getIn(['meta', 'id']) }),
  { courseCreate }
)
export default class CourseCreate extends Component {

  static propTypes = {
    auth: PropTypes.object,
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
      authorId: this.props.auth.getIn(['user', 'userId'])
    };
    const {portalId} = this.props;
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} title="Create a Course">
          <PortalAuthorLayout>
            <Helmet title="Home"/>
            <CourseForm initialValues={initialFormValues}
                        onSubmit={ model => this.props.courseCreate(portalId, model).then(()=> this.setState({saved: true})) }
                        submitStatus={this.state.saved}/>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}
