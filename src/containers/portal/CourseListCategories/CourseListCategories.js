import React, { Component, PropTypes } from 'react';
import {
  CourseListCategoryItem,
} from 'components';

export default class CourseListCategories extends Component {

  static propTypes = {
    category: PropTypes.string,
  }

  render() {
    const activeCategory = this.props.category;
    const categories = [
      { slug: 'business', name: 'Business' },
      { slug: 'development', name: 'Development' },
      { slug: 'graphics', name: 'Graphics' },
    ]; // temporary for test
    return (
      <div className="category-content no-padding">
        <ul className="navigation navigation-main navigation-accordion">
          {categories.map(category => {
            return (
              <CourseListCategoryItem category={category} key={category.slug} isActive={(category.slug === activeCategory)}/>
            );
          })}
        </ul>
      </div>
    );
  }
}
