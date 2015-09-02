import React from 'react'

export default class SnakeFood extends React.Component {
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
