import React, { Component } from 'react';

export default class Weather extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        forecast: [],
        day: 0,
    }

    componentDidMount() {
        this.fetchWeather();
    }

    componentDidUpdate(prevProps) {
        if (this.props.city != prevProps.city) {
            console.log(this.props.city, prevProps.city)
            this.fetchWeather();
        }
    }

    fetchWeather() {
        fetch(`http://localhost:8080/forecast/${this.props.city}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    this.setState({ forecast: [...data.consolidated_weather] })
                }
            })
            .catch(e => {
                this.setState({forecast: []});
                alert("Could not find wether for entered city")
            })
    }

    incrementDay() {
        if (this.state.day < 5) {
            var dayNr = this.state.day;
            dayNr++;
            this.setState({ day: dayNr })
        }
    }

    decrementDay() {
        if (this.state.day > 0) {
            var dayNr = this.state.day;
            dayNr--;
            this.setState({ day: dayNr })
        }
    }

    getForecastDate() {
        if (this.state.day == 0) {
            return "today"
        }

        if (this.state.day == 1) {
            return "tomorrow"
        }

        return this.state.forecast[this.state.day].applicable_date
    }

    render() {
        const { forecast, day } = this.state;
        const forecastForDay = forecast.length ? forecast[day] : null;

        return (
            <>
                {forecast.length ?
                    <div className="container">
                        <h1>Weather in {this.props.city} for {this.getForecastDate()}</h1>
                        <p>{forecastForDay.weather_state_name}</p>
                        <div className="container">
                            <div className="row my-3">
                                <div class="col">
                                    <img src={forecastForDay.img} width="200" height="200"></img>
                                </div>
                                <div className="col">
                                    <h2>{Math.round(forecastForDay.the_temp)} {'\u00b0'}C</h2>
                                    <p>min: {Math.round(forecastForDay.min_temp * 10) / 10}{'\u00b0'}C</p>
                                    <p>max: {Math.round(forecastForDay.max_temp)}{'\u00b0'}C</p>
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col">
                                    {
                                        day > 0
                                            ? <button onClick={() => this.decrementDay()} className="btn btn-primary">Previous day</button>
                                            : <label></label>

                                    }
                                </div>
                                <div class="col">
                                    {
                                        day < 5
                                            ? <button onClick={() => this.incrementDay()} className="btn btn-primary">Next day</button>
                                            : <label></label>

                                    }
                                </div>
                            </div>
                        </div>

                    </div>

                    : <p>loading...</p>
                }
            </>
        );
    }

}