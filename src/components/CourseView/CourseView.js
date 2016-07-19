import React, {PropTypes, Component} from 'react';
import {
  PriceDisplay,
  CourseRate,
} from './../index';
import {LessonPreviewButton, PagePreviewButton, LessonRow, PageRow, LessonDetailsRow} from './components';
import {CheckOutModal} from 'components';

export default class CourseView extends Component {
  state = {
    checkOutModalOpen: false
  }

  render() {
    const {course,
      onRateCreate,
      isRated,
      onRateEdit,
      isWishListItem,
      addToWishList,
      removeFromWishList,
      isCartItem,
      addToCart,
      removeFromCart,
      showSignUpModal,
      isMyCoursesItem,
      } = this.props;

    const {user} = this.context;
    const {checkOutModalOpen} = this.state;
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="content-wrapper">
            <div className="panel panel-flat">
              <div className="panel-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-12">
                      <h1>{course.get('name')}</h1>
                      <p>{course.get('subtitle')}</p>
                      <ul className="list list-inline">
                        <li>
                          <CourseRate avgRate={course.get('avgRate')}
                                      onChange={(data)=> isRated ? onRateEdit(data) : onRateCreate(data)}/>
                        </li>
                        <li>{course.get('ratesCount')} students enrolled</li>
                        <li>
                          Instructed by <a
                          href="#">{`${course.getIn(['author', `firstName`])} ${course.getIn(['author', `lastName`])}`}</a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-8">
                      <div className="asset-container" className="text-center">
                        <img src={course.get('thumbnail')} style={{maxWidth: '100%', maxHeight: 400}}/>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <h2>
                        <PriceDisplay coursePrice={course.get('coursePrice')}/>
                      </h2>
                      {user
                        ? <p>
                        {isMyCoursesItem
                          ? <a href="javascript:void(0)"
                               className="btn btn-primary disabled legitRipple">
                          Enrolled course
                        </a>
                          : <a href="javascript:void(0)" onClick={()=>this.setState({checkOutModalOpen: true})}
                               className="btn btn-primary legitRipple">
                          Take This Course
                        </a>}
                      </p>
                        : <p>
                        <a href="javascript:void(0)" onClick={()=>showSignUpModal(course)}
                           className="btn btn-primary legitRipple">
                          Take This Course
                        </a>
                      </p>
                      }

                      {user ?
                        <p>
                          {isWishListItem
                            ? <a href="javascript:void(0)"
                                 onClick={()=>removeFromWishList(course)}
                                 className="btn btn-primary legitRipple">
                            Remove from wishlist
                          </a>
                            : <a href="javascript:void(0)"
                                 onClick={()=>addToWishList(course)}
                                 className="btn btn-primary legitRipple">
                            Add to wishlist
                          </a>

                          }
                        </p> : <p>
                        <a href="javascript:void(0)"
                           onClick={()=>showSignUpModal(course)}
                           className="btn btn-primary legitRipple">
                          Add to wishlsit
                        </a>
                      </p>
                      }

                      {user ?
                        <p>
                          {isCartItem
                            ? <a href="javascript:void(0)"
                                 onClick={()=>removeFromCart(course)}
                                 className="btn btn-primary legitRipple">
                            Remove from cart
                          </a>
                            : <a href="javascript:void(0)"
                                 onClick={()=>addToCart(course)}
                                 className="btn btn-primary legitRipple">
                            Add to cart
                          </a>
                          }
                        </p> : <p>
                        <a href="javascript:void(0)"
                           onClick={()=>showSignUpModal(course)}
                           className="btn btn-primary legitRipple">
                          Add to cart
                        </a>
                      </p>
                      }
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
                          <td>Skill Level</td>
                          <td>{course.get('level')}</td>
                        </tr>
                        <tr>
                          <td>Languages</td>
                          <td>{course.get('language')}</td>
                        </tr>
                        <tr>
                          <td>Duration</td>
                          <td>{ `${course.get('duration')} min` }</td>
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
                           data-target-selector-className="js-simple-collapse-more-btn"
                           data-purpose="course-description">
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
                          <table className="cur-list table table-hover ud-landingpage-curriculum"
                                 data-course-id="657932"
                                 data-is-more-to-load="1" data-num-displayed-items="100" data-is-seo-traffic="0">
                            <tbody>
                            {course.getIn(['lessons', 'order']).map((slug, lessonIndex)=> {
                              const lesson = course.getIn(['lessons', 'entities', slug]);
                              const res = [];
                              res.push(<LessonRow lesson={lesson}
                                                  isMyCoursesItem={isMyCoursesItem}
                                                  user={user}
                                                  index={lessonIndex + 1}
                                                  showSignUpModal={()=>showSignUpModal()}
                                                  showCheckOutModal={()=>this.setState({checkOutModalOpen: true})}
                                                  lessonPreviewButton={LessonPreviewButton}/>);
                              res.push(<LessonDetailsRow lesson={lesson}/>);
                              lesson.getIn(['pages', 'order']).map((pageSlug, pageIndex)=> {
                                const page = lesson.getIn(['pages', 'entities', pageSlug]);
                                res.push(<PageRow user={user}
                                                  index={pageIndex + 1}
                                                  isMyCoursesItem={isMyCoursesItem}
                                                  page={page}
                                                  showSignUpModal={()=>showSignUpModal()}
                                                  showCheckOutModal={()=>this.setState({checkOutModalOpen: true})}
                                                  pagePreviewButton={PagePreviewButton}/>);
                              });
                              return res;
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
                              <img src={course.get(['author', 'image'])}/>
                            </a>
                          </div>
                          <div className="pos-r fxdc">
                            <div className="col-sm-12 ud-discover-tracker" data-action="full-instructor-biography-read"
                                 data-course-id="B0YceF1Q" data-user-id="A0MTdVhUTHg="
                                 data-target-selector-className="js-simple-collapse-more-btn">
                              <div className="mt10 js-simple-collapse empty-p" data-more="Full biography">
                                <div className="js-simple-collapse-inner">
                                  <p>{`${course.getIn(['author', `firstName`])} ${course.getIn(['author', `lastName`])}`}</p>
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
          <CheckOutModal
            onSuccess={this.props.onCheckOutSuccess}
            show={checkOutModalOpen}
            amount={course.getIn(['coursePrice', 'price'])}
            onHide={()=>this.setState({checkOutModalOpen: false})}/>
        </div>
      </div>
    );
  }
}

CourseView.contextTypes = {
  user: PropTypes.object,
};

CourseView.propTypes = {
  course: PropTypes.object.isRequired,
  onRateCreate: PropTypes.func,
  onRateEdit: PropTypes.func,
  isRated: PropTypes.bool,
  isMyCoursesItem: PropTypes.bool,
  isWishListItem: PropTypes.bool,
  addToWishList: PropTypes.func,
  removeFromWishList: PropTypes.func,
  isCartItem: PropTypes.bool,
  addToCart: PropTypes.func,
  removeFromCart: PropTypes.func,
  showSignUpModal: PropTypes.func,
  onCheckOutSuccess: PropTypes.func
};
