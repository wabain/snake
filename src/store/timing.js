import { READY, ACTIVE, PAUSED, TERMINATED } from '../constants'
import { START, PAUSE, TICK, TERMINATE, RESUME_GAME } from './actions'

const initialState = {
    timer: READY,
    ticks: 0
}

export default function reduceTiming(state = initialState, action, isGameOver) {
    switch (action.type) {
        // TODO: Enforce state transitions?
        case START:
            if (state.timer == TERMINATED) state = initialState
            return Object.assign({}, state, { timer: ACTIVE })

        case PAUSE:
            return Object.assign({}, state, { timer: PAUSED })

        case TERMINATE:
            return Object.assign({}, state, { timer: TERMINATED })

        case RESUME_GAME:
            return state.timer == TERMINATED
                ? Object.assign({}, state, { timer: PAUSED })
                : state

        case TICK:
            if (isGameOver) {
                return Object.assign({}, state, { timer: TERMINATED })
            }

            const { ticks } = action.payload
            return Object.assign({}, state, { ticks: state.ticks + ticks })

        default:
            return state
    }
}
