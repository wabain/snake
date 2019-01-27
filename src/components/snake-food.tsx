import React from 'react'
import PropTypes from 'prop-types'

export type SnakeFoodProps = {
    x: number
    y: number
}

export default class SnakeFood extends React.Component<SnakeFoodProps> {
    static get propTypes() {
        return {
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired
        }
    }

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
