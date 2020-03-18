import React, { Component } from 'react';
import Weather from "./Weather";

export default class App extends Component {

    state = {
        cityInput: "",
        displayingCity: "",
        clicked: false
    }

    showWeather() {
        this.setState({ displayingCity: this.state.cityInput })
    }

    updateCity(value) {
        this.setState({
            cityInput: value
        })
    }

    render() {
        const { cityInput, displayingCity } = this.state;

        return (
            <>
                <div className="container my-3">
                    <input type="text" className="form-control my-3" name="city" onChange={(e) => this.updateCity(e.target.value)} value={cityInput} />
                    <button onClick={() => this.showWeather()} className="btn btn-primary mb-2">Show weather</button>

                </div>
                {
                    displayingCity && <Weather city={displayingCity} />
                }
            </>
        );
    }
}
