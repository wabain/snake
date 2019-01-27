import React from 'react'
import PropTypes from 'prop-types'

export default class SnakeFood extends React.Component {
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
