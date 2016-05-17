import React, {PropTypes} from 'react';
import {
  PriceDisplay
} from './../index';

const CourseView = (props) => {
  const {course} = props;
  return (<div className="page-content">
      <div className="content-wrapper">
        <div className="panel panel-flat">
          <div className="panel-heading">
            <h6 className="panel-title">Traffic sources</h6>
          </div>
          <div className="panel-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <h1>{course.get('name')}</h1>
                  <p>{course.get('subtitle')}</p>
                  <ul className="list list-inline">
                    <li>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star-half-o"></i>
                      <i className="fa fa-star-o"></i>
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li>
                      1,553 ratings, 10,657 students enrolled
                    </li>
                    <li>
                      Instructed by <a href="#">[author]</a>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-8">
                  <div className="asset-container">
                  </div>
                </div>
                <div className="col-lg-4">
                  <h2>
                    <PriceDisplay coursePrice={course.get('coursePrice')}/>
                  </h2>

                  <p>
                    <a href="#" className="btn btn-primary legitRipple">
                      Take This Course
                    </a>
                  </p>

                  <p>
                  </p>
                  <hr/>

                  <table className="table table-borderless">
                    <tbody>
                    <tr>
                      <td>Lectures</td>
                      <td>{course.getIn(['lessons', 'order']).count()}</td>
                    </tr>
                    <tr>
                      <td>Video</td>
                      <td>[we need to add this field]</td>
                    </tr>
                    <tr>
                      <td>Skill Level</td>
                      <td>{course.get('level')}</td>
                    </tr>
                    <tr>
                      <td>Languages</td>
                      <td>{course.get('language')}</td>
                    </tr>
                    <tr>
                      <td>Includes</td>
                      <td>
                        [we need to add this field]
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div className="clearfix visible-xs-block"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Course Description */}
        <div className="panel panel-flat">
          <div className="panel-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-8 pb50">
                  <div id="desc" className="pos-r top-space-for-scroll ud-discover-tracker"
                       data-action="full-description-read" data-course-id="B0YceF1Q" data-user-id=""
                       data-target-selector-className="js-simple-collapse-more-btn" data-purpose="course-description">
                    <h3
                      className="tab-title">
                      Course Description
                    </h3>
                    <div dangerouslySetInnerHTML={(()=>({__html: course.get('description')}))()}></div>
                  </div>
                  <div id="curriculum" className="top-space-for-scroll" data-purpose="course-curriculum">
                    <h3 className="tab-title">
                      Curriculum
                    </h3>

                    <div className="table-responsive b0-xs">
                      <table className="cur-list table table-hover ud-landingpage-curriculum" data-course-id="657932"
                             data-is-more-to-load="1" data-num-displayed-items="100" data-is-seo-traffic="0">
                        <tbody>
                        {course.getIn(['lessons', 'order']).map(slug=> {
                          const lesson = course.getIn(['lessons', 'entities', slug]);
                          return (
                            [
                              <tr className="cur-list-row  ">
                                <td className="lec-icon tac hm cur-icon wa-force-xs">
                                  <i className="fa fa-play-circle"></i>
                                </td>

                                <td className="count wa-force-xs">
                                  {lesson.get('title')}
                                </td>

                                <td className="lec-title-and-preview">
                                  <div className="lec-title-and-preview-inner dif aic fxjsa-xs pr10-xs fxac-ie">
                                    <a href="/new-lecture/3928580/popup/" data-course-id="657932"
                                       data-lecture-id="3928580"
                                       className="btn btn-sm ud-popup ud-courseimpressiontracker preview-btn ml15 btn-primary legitRipple"
                                       data-tracking-type="lecture-preview">
                                      Preview
                                    </a>
                                  </div>
                                </td>
                                <td className="text-right lec-det">
                                  [01:33]
                                </td>
                              </tr>,
                              <tr className="cur-list-row-detail">
                                <td className="hm"></td>
                                <td colSpan="3"><p>{lesson.get('description')}</p></td>
                              </tr>
                            ]);
                        })}

                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div id="instructor" className="top-space-for-scroll" data-purpose="instructor-profile">
                    <div className="row">
                      <div className="col-sm-12">
                        <h3 className="tab-title">Instructor Biography</h3>
                      </div>

                      <div className="col-sm-2 ud-discover-tracker" data-action="instructor-name-clicked"
                           data-course-id="B0YceF1Q" data-user-id="A0MTdVhUTHg="
                           data-target-selector-className="js-discover-tracker-elm">
                        <a className="js-discover-tracker-elm" href="/user/bentristem/">
                          <img src="https://udemy-images.udemy.com/user/75x75/4355282_676b.jpg"/>
                        </a>
                      </div>
                      <div className="pos-r fxdc">
                        <div className="col-sm-12 ud-discover-tracker" data-action="full-instructor-biography-read"
                             data-course-id="B0YceF1Q" data-user-id="A0MTdVhUTHg="
                             data-target-selector-className="js-simple-collapse-more-btn">
                          <div className="mt10 js-simple-collapse empty-p" data-more="Full biography">
                            <div className="js-simple-collapse-inner">
                              <p>[Author Description]</p>
                              <p></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CourseView.contextTypes = {
  user: PropTypes.object,
};

CourseView.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseView;