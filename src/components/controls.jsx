import React from 'react'

import { READY, ACTIVE, PAUSED, TERMINATED } from '../constants'

import timingProps from '../prop-types/timing'

/**
 * Expose controls
 *
 * TODO: add help here?
 */
export default class Controls extends React.Component {
    static get propTypes() {
        return {
            timing: timingProps
        }
    }

    render() {
        let handler, message

        switch (this.props.timing.timer) {
            case READY:
                handler = this.props.start
                message = 'Start'
                break

            case ACTIVE:
                handler = this.props.pause
                message = 'Pause'
                break

            case PAUSED:
                handler = this.props.start
                message = 'Unpause'
                break

            case TERMINATED:
                handler = this.props.start
                message = 'New game'
                break

            default:
                throw new Error(
                    `unexpected timer state ${this.props.timing.timer}`
                )
        }

        return (
            <div className="controls">
                <button className="btn" type="button" onClick={handler}>
                    {message}
                </button>
            </div>
        )
    }
}
