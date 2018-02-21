import React from 'react';

const Cell = props => {
    return(
        <div onClick={()=>console.log(props)} className="col-3">
            <button className='w-100'>{props.value}</button>
        </div>
    );
};

export default Cell;