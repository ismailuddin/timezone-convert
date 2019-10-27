import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './sass/App.scss';
import TimeZoneSlider from './components/TimeZoneSlider';
import AutocompleteTextbox from './components/AutocompleteTextbox';
import moment from 'moment';


export default class App extends Component {
	static propTypes = {
		prop: PropTypes
	}

	state = {
		cities: []
	}

	addCity = (city) => {
		this.setState({
			cities: [...this.state.cities, city]
		})
	}

	render() {
		return (
			<div className="container">
				<AutocompleteTextbox
					label="Timezones"
					updateParent={this.addCity}
					entries={moment.tz.names()}
				/>
				<TimeZoneSlider
					cities={this.state.cities}
				/>
			</div>
		);
	}
}
