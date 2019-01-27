import reduceSnake from './snake'
import reduceTiming from './timing'

/**
 * Top-level reducer
 */
export default function reduce(state, action) {
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
