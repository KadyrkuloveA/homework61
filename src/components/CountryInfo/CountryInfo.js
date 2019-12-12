import React from 'react';
import './CountryInfo.css';

const CountryInfo = props => {
    return (
        <div className='CountryInf'>
            <h2>{props.name}</h2>
            <img src={props.img} alt={props.name}/>
            <h4>{props.capital}</h4>
            <h5>{props.population + ' people'}</h5>
            <div style={{display : props.borders.length > 0 ? "block" : "none"}}>
                <p>Borders With:</p>
                <ul>
                    {props.borders.map(border => (
                        <li>{border}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CountryInfo;