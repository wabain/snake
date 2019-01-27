import React from 'react'
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import PropTypes from 'prop-types'

import snakeProps from '../prop-types/snake'

import SnakePath from './snake-path.jsx'
import SnakeFood from './snake-food.jsx'

export default class Snake extends React.Component {
    static get propTypes() {
        return {
            snake: snakeProps.isRequired
        }
    }

    render() {
        const { width: hBoxes, height: vBoxes } = this.props.snake.container

        const x = '-0.5'
        const y = '-0.5'

        const attributes = {
            height: hBoxes * this.props.boxSize,
            width: vBoxes * this.props.boxSize,
            viewBox: `${x} ${y} ${hBoxes} ${vBoxes}`,
            style: { background: 'black', ...this.props.style }
        }

        const food = this.props.snake.food.map(({ x, y }, i) => (
            <SnakeFood key={i} x={x} y={y} />
        ))
        const grid = this.props.showGrid ? (
            <Grid width={vBoxes} height={hBoxes} boxSize={this.props.boxSize} />
        ) : null

        // Fade out the overlay when the game ends
        let overlay
        if (this.props.snake.collided) {
            overlay = (
                <rect
                    key="overlay"
                    className="overlay"
                    x={x}
                    y={y}
                    width={hBoxes}
                    height={vBoxes}
                />
            )
        } else {
            overlay = null
        }

        return (
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                {...attributes}
            >
                <SnakePath {...this.props} />
                {food}
                {grid}
                <CSSTransitionGroup
                    transitionName="gameover"
                    transitionEnterTimeout={500}
                    transitionLeave={false}
                    component="g"
                >
                    {overlay}
                </CSSTransitionGroup>
            </svg>
        )
    }
}

/** Grid for debugging */
export function Grid({ width, height, boxSize }) {
    const strokeWidth = 1 / boxSize
    const grid = []

    for (let i = 0; i <= height; i++) {
        const x = i - 0.5
        grid.push(
            <line
                key={grid.length}
                stroke="white"
                strokeWidth={strokeWidth}
                x1={x}
                y1={-0.5}
                x2={x}
                y2={height + 0.5}
            />
        )
    }

    for (let i = 0; i <= width; i++) {
        const y = i - 0.5
        grid.push(
            <line
                key={grid.length}
                stroke="white"
                strokeWidth={strokeWidth}
                x1={-0.5}
                y1={y}
                x2={height + 0.5}
                y2={y}
            />
        )
    }

    return <g>{grid}</g>
}

Grid.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    boxSize: PropTypes.number.isRequired
}
