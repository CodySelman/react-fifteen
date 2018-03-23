import React from 'react';
import Proptypes from 'prop-types';

const CategoryButton = props => {
    return (
        <button onClick={() => props.chooseCategory(props.category)}>{props.category}</button>
    )
}

CategoryButton.propTypes = {
    category: Proptypes.string.isRequired,
    chooseCategory: Proptypes.func.isRequired
}

export default CategoryButton;