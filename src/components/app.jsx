import React from 'react'
import connectToStores from 'alt/utils/connectToStores'

import { INITIAL_DURATION, DECAY_RATE } from '../constants'

import alt from '../alt'
import TimingStore from '../stores/timing-store'
import SnakeStore from '../stores/snake-store'

import SnakeActions from '../stores/snake-actions'
import TimingActions from '../stores/timing-actions'

import Snake from './snake.jsx'
import Controls from './controls.jsx'

@connectToStores
export default class App extends React.Component {
    constructor() {
        super()
        // Don't put the timeout in state because setting/unsetting it shouldn't trigger a rerender
        this._timeout = null
    }

    static getStores() {
        return [TimingStore, SnakeStore]
    }

    static getPropsFromStores() {
        return { timing: TimingStore.getState(), snake: SnakeStore.getState() }
    }

    componentWillReceiveProps(nextProps) {
        const timing = this.props.timing
        const nextTiming = nextProps.timing

        // Start the timeout for the next tick whenever the timingis activated or the tick
        // increments
        // FIXME: is there a better place to do this?
        if ((!timing.active && nextTiming.active) || timing.ticks !== nextTiming.ticks) {
            this._triggerTick(nextTiming.ticks)
        } else if (this.props.timing.active && !nextProps.timing.active && this._timeout !== null) {
            clearTimeout(this._timeout)
            this._timeout = null
        }
    }

    render() {
        // TODO: listen for swipe gestures to support touch interfaces?
        return (
            <div onKeyDown={e => this._handleKeydown(e)} tabIndex={0}>
                <Snake boxSize={25} {...this.props} />
                <Controls {...this.props} />
            </div>
        )
    }

    _handleKeydown(e) {
        if (this.props.timing.active && 37 <= e.keyCode && e.keyCode <= 40) {
            // If an arrow key is pressed set the direction
            SnakeActions.setDirection(e.keyCode)
            e.preventDefault()
        } else if (e.keyCode === 13 || e.keyCode === 32) {
            // Start/stop the game when the space bar or enter key are pressed
            if (this.props.timing.active) {
                TimingActions.pause()
            } else {
                if (this.props.timing.terminated) alt.recycle()

                TimingActions.start()
            }

            e.preventDefault()
        }
    }

    _triggerTick(expectedTicks) {
        // TODO: better duration function
        const duration = Math.max(INITIAL_DURATION - expectedTicks * DECAY_RATE, 50)

        const timeout = setTimeout(() => {
            if (this.props.timing.active && this.props.timing.ticks === expectedTicks) {
                TimingActions.tick()
            }

            this._timeout = null
        }, duration)

        this._timeout = timeout
    }
}
