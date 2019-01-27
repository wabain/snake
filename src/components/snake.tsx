import React from 'react'
import { CSSTransition } from 'react-transition-group'

import { SnakeState } from '../store/snake'

import SnakePath from './snake-path'
import SnakeFood from './snake-food'

export type SnakeProps = {
    snake: SnakeState
    boxSize: number
    showGrid?: boolean
    style?: React.CSSProperties
}

export default class Snake extends React.Component<SnakeProps> {
    render() {
        const { width: hBoxes, height: vBoxes } = this.props.snake.container

        const x = '-0.5'
        const y = '-0.5'

        const attributes = {
            height: hBoxes * this.props.boxSize,
            width: vBoxes * this.props.boxSize,
            viewBox: `${x} ${y} ${hBoxes} ${vBoxes}`,
            style: Object.assign({ background: 'black' }, this.props.style)
        }

        const food = this.props.snake.food.map(({ x, y }, i) => (
            <SnakeFood key={i} x={x} y={y} />
        ))
        const grid = this.props.showGrid ? (
            <Grid width={vBoxes} height={hBoxes} boxSize={this.props.boxSize} />
        ) : null

        return (
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                {...attributes}
            >
                <SnakePath {...this.props} />
                {food}
                {grid}
                <CSSTransition
                    in={this.props.snake.collided}
                    classNames="gameover"
                    timeout={{ enter: 500 }}
                    exit={false}
                >
                    <rect
                        className="gameover-overlay"
                        x={x}
                        y={y}
                        width={hBoxes}
                        height={vBoxes}
                    />
                </CSSTransition>
            </svg>
        )
    }
}

/** Grid for debugging */
export function Grid({
    width,
    height,
    boxSize
}: {
    width: number
    height: number
    boxSize: number
}) {
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
