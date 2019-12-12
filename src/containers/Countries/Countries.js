import React, {Component} from 'react';
import axios from 'axios';
import CountryList from "../../components/CountryList/CountryList";
import CountryInfo from "../../components/CountryInfo/CountryInfo";
import './Countries.css';

class Countries extends Component {
    state = {
        countries: [],
        loadedCountry: null,
        borders: null
    };

    async componentDidMount() {
        const response = await axios.get('v2/all?fields=name;alpha3Code');
        this.setState({countries: response.data});
    }

    countryInf = (key) => {
        let country;
        let borders;

        axios.get('v2/alpha/' + key).then(result => {
            country = result.data;

            Promise.all(result.data.borders.map(border => {
                return axios.get('v2/alpha/' + border);
            })).then(response => {
                borders = response.map(border => border.data.name);
            }).then(() => {
                this.setState({borders, loadedCountry: country});
            });

        });
    };

    render() {
        console.log(this.state.borders);
        return (
            <div className='Countries'>
                <ul className='list'>
                    {this.state.countries.map(country => (
                        <CountryList
                            key={country.alpha3Code}
                            onClick={() => this.countryInf(country.alpha3Code)}
                        >{country.name}</CountryList>
                    ))}
                </ul>
                {this.state.loadedCountry && <CountryInfo
                    name={this.state.loadedCountry.name}
                    img={this.state.loadedCountry.flag}
                    capital={this.state.loadedCountry.capital}
                    population={this.state.loadedCountry.population}
                    borders={this.state.borders}
                />}
            </div>
        );
    }
}


export default Countries;