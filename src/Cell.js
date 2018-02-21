import React from 'react';

const Cell = props => {
    return(
        <div onClick={()=>console.log('clicked')} className="col-3">
            <button className='w-100'>1</button>
        </div>
    );
};

export default Cell;