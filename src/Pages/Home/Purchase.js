import React from 'react';
import { useParams } from 'react-router-dom';

const Purchase = () => {
    const {id}=useParams();

    return (
        <div>
            <h2>this is purchase page: {id}</h2>
        </div>
    );
};

export default Purchase;