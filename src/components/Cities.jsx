import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment';
import { ReactComponent as CloseIcon} from '../img/close.svg'
import {Transition, config} from 'react-spring/renderprops'


export default class Cities extends Component {
    static propTypes = {
        cities: PropTypes.array,
        removeCity: PropTypes.func,
        selectedTime: PropTypes.instanceOf(Moment)
    }

    convertTimeZone(timeZone) {
		const timeObject = this.props.selectedTime.clone();
		return timeObject.tz(timeZone);
	}

    render() {
        return (
            <div className="cities">
                <Transition
                    items={this.props.cities}
                    config={config.wobbly}
                    from={{
                        transform: 'translateX(1000px)',
                        opacity: 1
                    }}
                    enter={{
                        transform: 'translatex(0px)'
                    }}
                    leave={{
                        opacity: 0
                    }}
                >
                    {item => props => 
                        <div style={props} className="city">
                            <div className="close-button" onClick={() => this.props.removeCity(item)}>
                                <CloseIcon width="15px" height="15px"/>
                            </div>
                            <h4>
                                {item}
                            </h4>
                            <div className="city-date">
                                {this.convertTimeZone(item).format("ddd Do MMM YYYY")}
                            </div>
                            <div className="city-time">
                                {this.convertTimeZone(item).format("hh:mm A")}
                            </div>
                        </div>
                    }
                </Transition>
                
            </div>
        )
    }
}
