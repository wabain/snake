import React from 'react'

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

        if (!this.props.timing.started) {
            handler = () => TimingActions.start()
            message = 'Start'
        } else if (this.props.timing.active) {
            handler = () => TimingActions.pause()
            message = 'Pause'
        } else if (!this.props.timing.terminated) {
            handler = () => TimingActions.start()
            message = 'Unpause'
        } else {
            // Throw all the state away
            handler = () => {
                alt.recycle()
                TimingActions.start()
            }
            message = 'New game'
        }

        return (
            <div>
                <button type="button" onClick={handler}>
                    {message}
                </button>
            </div>
        )
    }
}
