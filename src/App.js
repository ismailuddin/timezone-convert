import React, { Component } from 'react'
import './sass/App.scss';
import Cities from './components/Cities';
import TimeZoneSlider from './components/TimeZoneSlider';
import AutocompleteTextbox from './components/AutocompleteTextbox';
import moment from 'moment';
import { motion } from 'framer-motion';

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
						<motion.h1
							initial={{ y: -100 }}
							animate={{ y: 0 }}
						>
							TimeZone
						</motion.h1>
						<motion.h3
							initial={{ y: -100 }}
							animate={{ y: 0 }}
							transition={{ delay: 0.1 }}
						>
							Convert between time zones
						</motion.h3>
						{/* <img alt="logo" className="logo" src="./logo.png"/> */}
					</div>
				</div>
				<section>
					<div className="container">
						<motion.p className="body"
							initial={{ y: 100 }}
							animate={{ y: 0 }}
							transition={{ delay: 0.2 }}
						>
							Easily convert between time zones using a modern and pleasant UI, that works well both on desktop and mobile!
						</motion.p>
					</div>
				</section>
				<section>
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
						{/* <h2>
							Adjust the time
						</h2> */}
						
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
