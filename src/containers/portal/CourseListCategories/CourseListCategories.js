import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import {
  CourseListCategoryItem,
} from 'components';

@connect(
  ({categoriesLoaded}) => ({
    entities: categoriesLoaded.get('entities'),
    order: categoriesLoaded.get('order'),
  })
)
export default class CourseListCategories extends Component {

  static propTypes = {
    category: PropTypes.string,
    entities: PropTypes.object,
    order: PropTypes.object,
  }

  render() {
    const activeCategory = this.props.category;
    const {entities, order} = this.props;
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
