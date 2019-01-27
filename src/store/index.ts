import { Action } from './actions'
import reduceSnake, { SnakeState } from './snake'
import reduceTiming, { TimingState } from './timing'

type State = { snake: SnakeState; timing: TimingState }

/**
 * Top-level reducer
 */
export default function reduce(state: State | undefined, action: Action) {
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
