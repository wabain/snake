import React from 'react'

import { READY, ACTIVE, PAUSED, TERMINATED, assertNever } from '../constants'
import { TimingState } from '../store/timing'

// XXX Circular?
import { DispatchCallbacks } from './app'

export type ControlsProps = {
    timing: TimingState
} & DispatchCallbacks

/**
 * Expose controls
 *
 * TODO: add help here?
 */
export default class Controls extends React.Component<ControlsProps> {
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
                assertNever('timer state', this.props.timing.timer)
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
