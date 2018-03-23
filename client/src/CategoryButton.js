import React from 'react';
import Proptypes from 'prop-types';
import './CategoryButton.css';

const CategoryButton = props => {
    return (
        <button className='CategoryButton--button' onClick={() => props.chooseCategory(props.category)}>{props.category}</button>
    )
}

CategoryButton.propTypes = {
    category: Proptypes.string.isRequired,
    chooseCategory: Proptypes.func.isRequired
}

export default CategoryButton;