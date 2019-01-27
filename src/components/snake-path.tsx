import React from 'react'
import snakeProps from '../prop-types/snake'
import { SnakeState } from '../store/snake'

export type SnakePathProps = {
    snake: SnakeState
}

export default class SnakePath extends React.Component<SnakePathProps> {
    static get propTypes() {
        return {
            snake: snakeProps.isRequired
        }
    }

    render() {
        const coords = this._getCoordinates()
        return (
            <path
                d={coords}
                stroke="red"
                strokeWidth={1}
                strokeLinecap="square"
            />
        )
    }

    _getCoordinates() {
        if (this.props.snake.coordinates.length === 1) {
            const { x, y } = this.props.snake.coordinates[0]
            return `M${x},${y} l0,0`
        }

        return this.props.snake.coordinates
            .map(({ x, y }, i) => `${i === 0 ? 'M' : 'L'}${x},${y}`)
            .join(' ')
    }
}
