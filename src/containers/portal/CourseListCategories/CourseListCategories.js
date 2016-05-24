import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import {
  CourseListCategoryItem,
} from 'components';
import { withCourseCategories } from 'hoc';

@withCourseCategories
export default class CourseListCategories extends Component {

  static propTypes = {
    categories: PropTypes.object,
    category: PropTypes.string,
  }

  render() {
    const activeCategory = this.props.category;
    const {entities, order} = this.props.categories;
    return (
      <div className="category-content no-padding">
        <Helmet title={activeCategory}/>
        <ul className="navigation navigation-main navigation-accordion">
          {order.map(categoryId => {
            const category = entities.get(categoryId);
            return (
              <CourseListCategoryItem category={category} key={category.get('slug')}
                                      isActiveCategory={(category.get('slug') === activeCategory)}/>
            );
          })}
        </ul>
      </div>
    );
  }
}
