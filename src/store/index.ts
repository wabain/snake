import { Action } from './actions'
import reduceSnake, { SnakeState } from './snake'
import reduceTiming, { TimingState } from './timing'

export type StoreState = { snake: SnakeState; timing: TimingState }

/**
 * Top-level reducer
 */
export default function reduce(state: StoreState | undefined, action: Action) {
    const snake = reduceSnake(state ? state.snake : undefined, action)
    const timing = reduceTiming(
        state ? state.timing : undefined,
        action,
        snake.collided
    )

    if (state && snake == state.snake && timing == state.timing) {
        return state
    }

    return { snake, timing }
}
