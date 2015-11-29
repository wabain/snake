import React from 'react'

import { READY, ACTIVE, PAUSED, TERMINATED } from '../constants'

import timingProps from '../prop-types/timing'

import alt from '../alt'
import TimingActions from '../stores/timing-actions'

/** Expose controls
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
                handler = () => TimingActions.start()
                message = 'Start'
                break

            case ACTIVE:
                handler = () => TimingActions.pause()
                message = 'Pause'
                break

            case PAUSED:
                handler = () => TimingActions.start()
                message = 'Unpause'
                break

            case TERMINATED:
                // Throw all the state away
                handler = () => {
                    alt.recycle()
                    TimingActions.start()
                }
                message = 'New game'
                break

            default:
                throw new Error(`unexpected timer state ${this.props.timing.timer}`)
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
