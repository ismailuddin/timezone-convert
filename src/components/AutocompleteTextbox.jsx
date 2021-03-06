import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AutocompleteTextbox extends Component {
	static propTypes = {
		entries: PropTypes.array,
		updateParent: PropTypes.func,
		label: PropTypes.string
	}
	
	state = {
		suggestions: [],
		text: ""
	};

	onTextChange = (e) => {
		const value = e.target.value;
		let suggestions = [];
		if (value.length > 0) {
			const regex = new RegExp(`${value.trim()}`, 'i');
			suggestions = this.props.entries.sort().filter((v) => regex.test(v));
		}
		this.setState({
			suggestions: suggestions,
			text: value
        });
	};

	renderSuggestions() {
		const { suggestions } = this.state;
		if (suggestions.length === 0) {
			return null;
		}
		return <ul className="autocomplete-suggestions">{suggestions.map((item) => <li onClick={() => this.selectSuggestion(item)}>{item}</li>)}</ul>;
	}

	selectSuggestion(value) {
		this.setState({
			text: "",
			suggestions: []
		}, () => {
            this.props.updateParent(value);
        });
	}

	render() {
		const { text } = this.state;
		return (
			<div className="autocomplete">
                <label>{this.props.label}</label>
				<input
                    value={text}
                    onChange={this.onTextChange} 
                    type="text"
                    onBlur={() => setTimeout(() => { this.setState({suggestions: []})}, 500)}
                />
				{this.renderSuggestions()}
			</div>
		);
	}
}
