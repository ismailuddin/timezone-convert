import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import moment from 'moment-timezone';

export default class TimeZoneSlider extends Component {
    static propTypes = {
        prop: PropTypes
    }

    constructor(props) {
        super(props);
        this.containerPadding = 25;
        this.containerWidth = 1024 - (2 * this.containerPadding);
        this.boxPadding = 10;
        this.boxWidth = 200 + (2 * this.boxPadding);
    }

    state = {
        controlledPosition: {
            x: 0, y: 0
        },
        timeOffsetSeconds: 0,
        base: {
            name: moment.tz.guess(),
        },
        cities: []
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cities !== this.props.cities) {
            this.setState({
                cities: this.props.cities
            })
        }
    }


    onControlledDrag = (e, position) => {
        let { x, y } = position;
        if (x < 0) {
            // x = x - this.boxWidth;
        }
        let tOffset = (x / (this.containerWidth / 2)) * (60 * 60 * 18);
        this.setState({
            controlledPosition:{ 
                x, 
                y 
            },
            timeOffsetSeconds: tOffset
        });
    };



    render() {
        return (
            <div className="time-zone-slider-container">
                {this.state.cities.map(city => (
                    <div className="city-block">
                        {city} <br/>
                        {this.state.timeOffsetSeconds > 0 ?
                            moment().add(this.state.timeOffsetSeconds, 'seconds').tz(city).format("HH:mm")
                            :
                            moment().subtract(Math.abs(this.state.timeOffsetSeconds), 'seconds').tz(city).format("HH:mm")

                        }
                    </div>
                ))}
                <Draggable
                    bounds="parent"
                    axis="x"
                    onDrag={this.onControlledDrag}

                >
                    <div className="city-block-base">
                        {this.state.base.name}
                        <br/>
                        {this.state.timeOffsetSeconds > 0 ?
                            moment().add(this.state.timeOffsetSeconds, 'seconds').format("HH:mm")
                            :
                            moment().subtract(Math.abs(this.state.timeOffsetSeconds), 'seconds').format("HH:mm")

                        }
                    </div>
                </Draggable>

            </div>
        )
    }
}
