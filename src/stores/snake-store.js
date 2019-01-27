import { UP, DOWN, LEFT, RIGHT } from '../constants'

import SnakeActions from './snake-actions'
import TimingActions from './timing-actions'

import { store } from '../alt'

const WIDTH = 21
const HEIGHT = 21

@store('SnakeStore')
export default class SnakeStore {
    constructor() {
        this.state = {
            container: { width: WIDTH, height: HEIGHT },
            collided: false,
            direction: RIGHT,
            coordinates: [
                { x: Math.floor(WIDTH / 2), y: Math.floor(HEIGHT / 2) }
            ],
            food: []
        }

        this._loadInitialFood()

        this.bindActions(SnakeActions)
        this.bindAction(TimingActions.TICK, this.onTick)
        this.bindAction(TimingActions.RESUME_GAME, this.onResumeGame)
    }

    onSetDirection(direction) {
        this.setState({ direction })
    }

    onTick() {
        // Get the coordinates shifted one tick in the direction
        const { x, y } = this._getIncrementedCoords(
            this.state.coordinates[0],
            this.state.direction
        )

        if (
            x < 0 ||
            y < 0 ||
            x >= this.state.container.width ||
            y >= this.state.container.height ||
            this.state.coordinates.some(
                ({ x: x2, y: y2 }) => x === x2 && y === y2
            )
        ) {
            this.setState({ collided: true })
            return
        }

        const coordinates = this.state.coordinates.slice()
        coordinates.unshift({ x, y })

        let foodIndex = null

        this.state.food.some((morsel, i) => {
            if (morsel.x === x && morsel.y === y) {
                foodIndex = i
                return true
            }
        })

        // If there is no food then the snake moves forward. Otherwise, it is
        // extended with the food.
        if (foodIndex === null) {
            coordinates.pop()

            this.setState({ coordinates: coordinates })
        } else {
            const food = this.state.food.slice()
            food.splice(foodIndex, 1, this._getFoodPiece())

            this.setState({ food: food, coordinates: coordinates })
        }
    }

    onResumeGame() {
        this.setState({ collided: false })
    }

    _loadInitialFood() {
        for (let i = 0; i < 10; i++) {
            // Mutate the state in place because we're only doing this during initialization
            this.state.food.push(this._getFoodPiece())
        }
    }

    _getFoodPiece() {
        // Keep iterating until we get coordinates which aren't used for something else
        for (;;) {
            const x = Math.floor(Math.random() * this.state.container.width)
            const y = Math.floor(Math.random() * this.state.container.height)

            if (
                this.state.food.some(morsel => morsel.x === x && morsel.y === y)
            )
                continue

            if (
                this.state.coordinates.some(
                    coords => coords.x === x && coords.y === y
                )
            )
                continue

            return { x, y }
        }
    }

    _getIncrementedCoords({ x, y }, direction) {
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
}
