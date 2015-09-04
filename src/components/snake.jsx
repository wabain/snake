import React from 'react'

import SnakePath from './snake-path.jsx'
import SnakeFood from './snake-food.jsx'

export default class Snake extends React.Component {
    render() {
        const { width: hBoxes, height: vBoxes } = this.props.snake.container

        const attributes = {
            height: hBoxes * this.props.boxSize,
            width: vBoxes * this.props.boxSize,
            viewBox: `-0.5 -0.5 ${hBoxes} ${vBoxes}`,
            style: { background: 'black', ...this.props.style }
        }

        const food = this.props.snake.food.map(({ x, y }, i) => <SnakeFood key={i} x={x} y={y} />)
        const grid = this.props.showGrid ? this._getGrid() : null

        return (
            <svg {...attributes}>
                <SnakePath {...this.props} />
                { food }
                { grid }
            </svg>
        )
    }

    /** Grid for debugging */
    _getGrid() {
        const { width, height } = this.props.snake.container
        const grid = []

        for (let i=0; i <= height; i++) {
            const x = i - 0.5
            grid.push(this._getGridLine(grid.length, {x1: x, y1: -0.5, x2: x, y2: height + 0.5}))
        }

        for (let i=0; i <= width; i++) {
            const y = i - 0.5
            grid.push(this._getGridLine(grid.length, {x1: -0.5, y1: y, x2: height + 0.5, y2: y}))
        }

        return grid
    }

    _getGridLine(key, coords) {
        return <line key={key} stroke="white" strokeWidth={1/this.props.boxSize} {...coords} />
    }
}