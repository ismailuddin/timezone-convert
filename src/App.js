import React, { Component } from 'react'
import './sass/App.scss';
import TimeZoneSlider from './components/TimeZoneSlider';
import AutocompleteTextbox from './components/AutocompleteTextbox';
import moment from 'moment';


export default class App extends Component {

	state = {
		cities: [],
		selectedTime: moment()
	}

	addCity = (city) => {
		this.setState({
			cities: [...this.state.cities, city]
		})
	}

	setSelectedTime = (time) => {
		this.setState({
			selectedTime: time
		})
	}

	convertTimeZone(timeZone) {
		const timeObject = this.state.selectedTime.clone();
		return timeObject.tz(timeZone);
	}

	render() {
		return (
			<div>
				<div className="navbar">
					<div className="container">
						<h1>
							<span aria-label="clock" role="img">⏰ </span> TimeZone <span aria-label="map" role="img">🗺</span>
						</h1>
						<div className="items">
							<h3>About</h3>
							<h3>About</h3>
						</div>

					</div>
				</div>
				<section>
					<div className="container">

						<p className="body">
							Search for cities in the search bar to below to add them to the list, and then drag the time bar to see the time in different time zones.
						</p>
					</div>
				</section>
				<section className="light-bg">
					<div className="container">
						<h2>
							Add cities
						</h2>
						<p className="body">
						</p>
						<AutocompleteTextbox
							label="Time zones"
							updateParent={this.addCity}
							entries={moment.tz.names()}
						/>
						<div className="cities">
							{this.state.cities.map(city => (
								<div className="city">
									<h4>
										{city}
									</h4>
									<div className="city-date">
										{this.convertTimeZone(city).format("ddd Do MMM YYYY")}
									</div>
									<div className="city-time">
										{this.convertTimeZone(city).format("hh:mm A")}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
				<section>
					<div className="container">
						<h2>
							Adjust the time
						</h2>
						
						<TimeZoneSlider
							cities={this.state.cities}
							setSelectedTime={this.setSelectedTime}
						/>
					</div>
				</section>
			</div>
		);
	}
}
