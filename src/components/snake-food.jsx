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

        const display = {
            stroke: 'white',
            strokeWidth: 1,
            strokeLinecap: 'square'
        }

        return <path d={coords} {...display}></path>
    }
}
