import { UP, DOWN, LEFT, RIGHT } from '../constants'
import { SET_DIRECTION, TICK, START, RESUME_GAME } from './actions'

const WIDTH = 21
const HEIGHT = 21

const initialGameState = {
    container: { width: WIDTH, height: HEIGHT },
    collided: false,
    started: false,
    direction: RIGHT,
    coordinates: [{ x: Math.floor(WIDTH / 2), y: Math.floor(HEIGHT / 2) }],
    food: []
}

/*
 * TODO: Make this deterministic by factoring out randomness of getFoodPiece
 */
export default function reduceSnake(state, action) {
    if (!state) {
        // Load an initialized game by default
        state = Object.assign({}, initialGameState, { started: true })
        loadInitialFood(state)
    }

    switch (action.type) {
        case SET_DIRECTION:
            const { direction } = action.payload
            return Object.assign({}, state, { direction })

        case TICK:
            return handleTick(state)

        case START:
            if (state.collided || !state.started) {
                state = Object.assign({}, initialGameState, { started: true })
                loadInitialFood(state)
            }
            return state

        case RESUME_GAME:
            return state.collided
                ? Object.assign({}, state, { collided: false })
                : state

        default:
            return state
    }
}

function loadInitialFood(state) {
    state.food = []
    for (let i = 0; i < 10; i++) {
        // Mutate the state in place because we're only doing this during initialization
        state.food.push(getFoodPiece(state))
    }
}

function handleTick(state) {
    let { container, coordinates, direction } = state

    // Get the coordinates shifted one tick in the direction
    const newCoords = getIncrementedCoords(coordinates[0], direction)
    const { x, y } = newCoords

    if (
        x < 0 ||
        y < 0 ||
        x >= container.width ||
        y >= container.height ||
        coordinates.some(({ x: x2, y: y2 }) => x === x2 && y === y2)
    ) {
        return Object.assign({}, state, { collided: true })
    }

    coordinates = [newCoords, ...coordinates]

    let foodIndex = null

    state.food.some((morsel, i) => {
        if (morsel.x === x && morsel.y === y) {
            foodIndex = i
            return true
        }
    })

    // If there is no food then the snake moves forward. Otherwise, it is
    // extended with the food.
    if (foodIndex === null) {
        coordinates.pop()

        return Object.assign({}, state, { coordinates })
    } else {
        const food = state.food.slice()
        food.splice(foodIndex, 1, getFoodPiece(state))

        return Object.assign({}, state, { food, coordinates })
    }
}

function getFoodPiece({ container, coordinates, food }) {
    // Keep iterating until we get coordinates which aren't used for something else
    for (;;) {
        const x = Math.floor(Math.random() * container.width)
        const y = Math.floor(Math.random() * container.height)

        if (food.some(morsel => morsel.x === x && morsel.y === y)) {
            continue
        }

        if (coordinates.some(coords => coords.x === x && coords.y === y)) {
            continue
        }

        return { x, y }
    }
}

function getIncrementedCoords({ x, y }, direction) {
    switch (direction) {
        case UP:
            y--
            break

        case DOWN:
            y++
            break

        case LEFT:
            x--
            break

        case RIGHT:
            x++
            break
    }

    return { x, y }
}
