import React from 'react';

const Cell = props => {
    return(
        <div className="col-3">
            <button onClick={props.onClick} className='w-100'>{props.value}</button>
        </div>
    );
};

export default Cell;