import React, { Component } from 'react'
import './sass/App.scss';
import Cities from './components/Cities';
import TimeZoneSlider from './components/TimeZoneSlider';
import AutocompleteTextbox from './components/AutocompleteTextbox';
import moment from 'moment';


export default class App extends Component {
	state = {
		cities: [],
		selectedTime: moment(),
	}

	addCity = (city) => {
		this.setState({
			cities: [...this.state.cities, city]
		});
	}

	removeCity = (city) => {
		this.setState({
			cities: [...this.state.cities].filter(c => c !== city)
		});
	}

	setSelectedTime = (time) => {
		this.setState({
			selectedTime: time
		})
	}

	render() {
		return (
			<div>
				<div className="navbar">
					<div className="container">
						<h1>
							TimeZone
						</h1>
						<img alt="logo" class="logo" src="./logo.png"/>
					</div>
				</div>
				<section>
					<div className="container">
						<p className="body">
							Easily convert between time zones using a modern and pleasant UI, that works well both on desktop and mobile!
						</p>
						<p className="body">
							Developed as a progressive web app so you can add this to your home screen on your mobile device, and use it like a native app.
						</p>
					</div>
				</section>
				<section className="light-bg">
					<div className="container">
						<h2>
							Add cities
						</h2>
						<p className="body">
							Search for cities in the search bar to below to add them to the list, and then drag the time bar to see the time in different time zones.
						</p>
						<AutocompleteTextbox
							label="Time zones"
							updateParent={this.addCity}
							entries={moment.tz.names()}
						/>
						<Cities
							cities={this.state.cities}
							removeCity={this.removeCity}
							selectedTime={this.state.selectedTime}
						/>
					</div>
				</section>
				<section>
					<div className="container">
						<h2>
							Adjust the time
						</h2>
						
						<TimeZoneSlider
							selectedTime={this.state.selectedTime}
							setSelectedTime={this.setSelectedTime}
						/>
					</div>
				</section>
			</div>
		);
	}
}
