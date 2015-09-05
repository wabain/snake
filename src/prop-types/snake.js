import { PropTypes } from 'react'
import { UP, RIGHT, DOWN, LEFT } from '../constants'

const coordinateType = PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
})

export default PropTypes.shape({
    container: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    }).isRequired,
    collided: PropTypes.bool.isRequired,
    direction: PropTypes.oneOf([UP, RIGHT, DOWN, LEFT]).isRequired,
    coordinates: PropTypes.arrayOf(coordinateType).isRequired,
    food: PropTypes.arrayOf(coordinateType).isRequired
})
