import React from 'react'

export default class SnakeFood extends React.Component {
    static get propTypes() {
        return {
            x: React.PropTypes.number.isRequired,
            y: React.PropTypes.number.isRequired
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
