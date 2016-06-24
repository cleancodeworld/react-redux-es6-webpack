import React, { Component, PropTypes } from 'react';

import Item from './Item/Item';

export default class CategoriesList extends Component {

  static propTypes = {
    categories: PropTypes.object,
    activeCategory: PropTypes.object,
  }

  render() {
    const {activeCategory, categories: {entities, order}} = this.props;
    return (
      categories.order.count()
        ?
        <div className="category-content no-padding">
          <ul className="navigation navigation-main navigation-accordion">
            {order.map(categoryId => {
              const category = entities.get(categoryId);
              return (
                <Item category={category} key={category.get('slug')}
                      isActiveCategory={activeCategory && category.get('slug') === activeCategory.get('slug')}/>
              );
            })}
          </ul>
        </div>
        :
        <span/>
    );
  }
}
