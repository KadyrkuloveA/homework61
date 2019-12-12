import React from 'react';
import './CountryList.css';

const CountryList = props => {
    return (
            <li onClick={props.onClick}>{props.children}</li>
    );
};

export default CountryList;