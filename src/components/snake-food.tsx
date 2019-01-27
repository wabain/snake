import React from 'react'

export type SnakeFoodProps = {
    x: number
    y: number
}

export default class SnakeFood extends React.Component<SnakeFoodProps> {
    render() {
        const coords = `M${this.props.x},${this.props.y} l0,0`
        return (
            <path
                d={coords}
                stroke="white"
                strokeWidth={1}
                strokeLinecap="square"
            />
        )
    }
}
