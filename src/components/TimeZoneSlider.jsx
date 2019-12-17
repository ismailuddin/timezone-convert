import React, { Component } from 'react';
import Draggable from 'react-draggable';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';

export default class TimeZoneSlider extends Component {
    static propTypes = {
        selectedTime: PropTypes.instanceOf(moment),
        setSelectedTime: PropTypes.func
    }

    state = {
        controlledPosition: {
            x: 0, y: 0
        },
        timeOffsetSeconds: 0,
        base: {
            name: moment.tz.guess(),
        },
        cities: [],
        offsetMinutes: -1 * moment().minutes(),
        time: moment(),
        // currentTime: moment()
    }

    componentDidMount() {
        const { x, y } = this.state.controlledPosition;
        let offset = this.calculateOffsetInPx(this.state.offsetMinutes);
        this.setState({
            controlledPosition: {
                x: x + offset,
                y
            },
        })
    }

    calculateOffsetInPx(minutes) {
        let a = minutes / (24 * 60);
        let pixels = a * (24 * 80);
        return pixels;
    }

    calculateOffsetInMinutes(pixels) {
        let a = pixels / (24 * 80);
        let minutes = a * (24 * 60);
        return minutes;
    }

    onControlledDrag = (e, ui) => {
        const { x }  = this.state.controlledPosition;
        const newX = x + ui.deltaX;
        let currentTime = moment(moment().hours(), "HH");
        let newTime;
        let minutes = Math.abs(this.calculateOffsetInMinutes(newX));
        if (newX < 0) {
            newTime = currentTime.add(minutes, 'minutes');
        } else if (newX > 0) {
            newTime = currentTime.subtract(minutes, 'minutes')
        } else if (newX === 0) {
            newTime = this.state.time;
        }
        this.setState({
            controlledPosition: {
                x: newX,
                y: 0
            },
        }, () => {
            this.props.setSelectedTime(newTime);
        });
    };


    resetTime = () => {
        let newTime = moment();
        let offset = this.calculateOffsetInPx(moment().minutes())
        this.setState({
            controlledPosition: {
                x: 0 - offset,
                y: 0
            },
        }, () => {
            this.props.setSelectedTime(newTime);
        });
    }


    render() {
        const hours = [];
        for (let i = 24; i > 0; i--) {
            const now = moment();
            hours.push(now.subtract(i, "hours").format("h A"));
        }
        return (
            <div>
                <button className="btn btn-red" onClick={this.resetTime}>
                    Set to current time
                </button>
                <div className="selected-time">
                    {this.props.selectedTime.format("hh:mm A")}
                </div>
                <div className="time-slider-container">
                    <div className="selected-time-indicator"></div>
                    <Draggable
                        bounds={{
                            left: -1440,
                            right: 1440
                        }}
                        axis="x"
                        onDrag={this.onControlledDrag}
                        handle=".handle"
                        position={this.state.controlledPosition}
                    >
                        <div className="time-slider">
                            <div className="handle">
                                {hours.map(h => (
                                    <div className="hour" key={h}>
                                        <div className="major-bar"></div>
                                        <div className="minor-bar"></div>
                                        <div className="minor-bar"></div>
                                        <div className="minor-bar"></div>
                                        <div className="minor-bar"></div>
                                        <div className="minor-bar"></div>
                                        <div className="minor-bar"></div>
                                        <div className="minor-bar"></div>
                                        <div className="minor-bar"></div>
                                        <div className="minor-bar"></div>
                                        <div className="time">
                                            {h}
                                        </div>
                                    </div>
                                ))}
                                {hours.map(h => (
                                    <div className="hour blue" key={h}>
                                        <div className="major-bar"></div>
                                        <div className="minor-bar"></div>
                                        <div className="minor-bar"></div>
                                        <div className="minor-bar"></div>
                                        <div className="minor-bar"></div>
                                        <div className="minor-bar"></div>
                                        <div className="minor-bar"></div>
                                        <div className="minor-bar"></div>
                                        <div className="minor-bar"></div>
                                        <div className="minor-bar"></div>
                                        <div className="time">
                                            {h}
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </Draggable>
                </div>

            </div>
        )
    }
}
