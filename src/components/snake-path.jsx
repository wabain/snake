import React from 'react'
import snakeProps from '../prop-types/snake'

export default class SnakePath extends React.Component {
    static get propTypes() {
        return {
            snake: snakeProps.isRequired
        }
    }

    render() {
        const coords = this._getCoordinates()

        const display = {
            stroke: 'red',
            strokeWidth: 1,
            strokeLinecap: 'square'
        }

        return <path d={coords} {...display}></path>
    }

    _getCoordinates() {
        if (this.props.snake.coordinates.length === 1) {
            const { x, y } = this.props.snake.coordinates[0]
            return `M${x},${y} l0,0`
        }

        return this.props.snake.coordinates.map(({ x, y }, i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
    }
}
