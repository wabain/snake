import React from 'react'
import { connect } from 'react-redux'

import {
    INITIAL_WAIT_TICKS,
    WAIT_DECAY_RATE,
    TICK_DURATION,

    // Timer states
    ACTIVE,
    Direction
} from '../constants'

import {
    SET_DIRECTION,
    TICK,
    START,
    PAUSE,
    RESUME_GAME
} from '../store/actions'
import { StoreState } from '../store/index'
import { SnakeState } from '../store/snake'
import { TimingState } from '../store/timing'

import Snake from './snake'
import Controls from './controls'

export type DispatchCallbacks = {
    setDirection: (d: Direction) => void
    tick: (t: number) => void
    start: () => void
    pause: () => void
    resumeGame: () => void
}

export type AppPropTypes = DispatchCallbacks & {
    snake: SnakeState
    timing: TimingState
}

const ARROW_KEYS_REGEX = /^Arrow(Up|Down|Left|Right)$/

function getArrowDirection(key: string): Direction | null {
    const parsed = ARROW_KEYS_REGEX.exec(key)

    if (!parsed) return null

    return parsed[1].toLowerCase() as Direction
}

function bindDispatch(dispatch: any): DispatchCallbacks {
    return {
        setDirection: direction => {
            dispatch({ type: SET_DIRECTION, payload: { direction } })
        },
        tick: ticks => {
            dispatch({ type: TICK, payload: { ticks } })
        },
        start: () => {
            dispatch({ type: START, payload: {} })
        },
        pause: () => {
            dispatch({ type: PAUSE, payload: {} })
        },
        resumeGame: () => {
            dispatch({ type: RESUME_GAME, payload: {} })
        }
    }
}

class App extends React.Component<AppPropTypes> {
    _timeout: number | null

    constructor(props: AppPropTypes) {
        super(props)
        // Don't put the timeout in state because setting/unsetting it shouldn't trigger a rerender
        this._timeout = null
    }

    componentWillReceiveProps(nextProps: AppPropTypes) {
        const { timer, ticks } = this.props.timing
        const { timer: nextTimer, ticks: nextTicks } = nextProps.timing

        // Start the timeout for the next tick whenever the timingis activated or the tick
        // increments
        // FIXME: is there a better place to do this?
        if (ticks !== nextTicks || (timer !== ACTIVE && nextTimer === ACTIVE)) {
            this._triggerTick(nextTicks)
        } else if (
            timer === ACTIVE &&
            nextTimer !== ACTIVE &&
            this._timeout !== null
        ) {
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

    _handleKeydown(e: React.KeyboardEvent) {
        let arrowDirection: Direction

        const timerState = this.props.timing.timer

        if (
            timerState === ACTIVE &&
            (arrowDirection = getArrowDirection(e.key))
        ) {
            // If an arrow key is pressed set the direction
            this.props.setDirection(arrowDirection)
            e.preventDefault()
        } else if (e.key === 'Enter' || e.key === ' ') {
            // Start/stop the game when the space bar or enter key are pressed
            if (timerState === ACTIVE) {
                this.props.pause()
            } else {
                this.props.start()
            }

            e.preventDefault()
        } else if (e.key === 'M' && e.shiftKey) {
            // Secret feature: Continue game on Shift+M
            if (this.props.snake.collided) {
                this.props.resumeGame()
            }

            e.preventDefault()
        }
    }

    _triggerTick(expectedTicks: number) {
        const waitTicks = Math.max(
            1,
            Math.round(INITIAL_WAIT_TICKS - expectedTicks * WAIT_DECAY_RATE)
        )
        const timeoutDuration = waitTicks * TICK_DURATION

        const timeout = setTimeout(() => {
            if (
                this.props.timing.timer === ACTIVE &&
                this.props.timing.ticks === expectedTicks
            ) {
                this.props.tick(waitTicks)
            }

            this._timeout = null
        }, timeoutDuration)

        this._timeout = timeout
    }
}

export default connect(
    ({ timing, snake }: StoreState) => ({ timing, snake }),
    bindDispatch
)(App)
