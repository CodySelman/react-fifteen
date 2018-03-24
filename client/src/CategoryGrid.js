import React from 'react';
import Proptypes from 'prop-types';
import './CategoryGrid.css';
import CategoryButton from './CategoryButton.js';

const CategoryGrid = props => {
    const categoryGrid = props.categories.map((category, index) => (
        <CategoryButton 
            key={index}
            category={category}
            chooseCategory={props.chooseCategory}
        />
    ));

    return (
        <div className='CategoryGrid--container'>
            {categoryGrid}
        </div>
    )
}

CategoryGrid.propTypes = {
    categories: Proptypes.array.isRequired,
    chooseCategory: Proptypes.func.isRequired 
}

export default CategoryGrid;