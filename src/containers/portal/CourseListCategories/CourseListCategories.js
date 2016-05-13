import React, { Component } from 'react';
import {
  CourseListCategoryItem,
} from 'components';

export default class CourseListCategories extends Component {

  render() {
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
              <CourseListCategoryItem category={category} key={category.slug}/>
            );
          })}
        </ul>
      </div>
    );
  }
}
