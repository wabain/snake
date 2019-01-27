import React from 'react'

import { READY, ACTIVE, PAUSED, TERMINATED, assertNever } from '../constants'
import { TimingState } from '../store/timing'

import { DispatchCallbacks } from './app'

export type ControlsProps = {
    timing: TimingState
} & DispatchCallbacks

/**
 * Expose controls
 *
 * TODO: add help here?
 */
export default function Controls({ timing, start, pause }: ControlsProps) {
    let handler, message

    switch (timing.timer) {
        case READY:
            handler = start
            message = 'Start'
            break

        case ACTIVE:
            handler = pause
            message = 'Pause'
            break

        case PAUSED:
            handler = start
            message = 'Unpause'
            break

        case TERMINATED:
            handler = start
            message = 'New game'
            break

        default:
            assertNever('timer state', timing.timer)
    }

    return (
        <div className="controls">
            <button className="btn" type="button" onClick={handler}>
                {message}
            </button>
        </div>
    )
}
