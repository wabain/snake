import { PropTypes } from 'react'

export default PropTypes.shape({
    started: PropTypes.bool.isRequired,
    terminated: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    ticks: PropTypes.number.isRequired
})
