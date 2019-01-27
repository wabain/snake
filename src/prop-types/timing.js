import { READY, ACTIVE, PAUSED, TERMINATED } from '../constants'

import PropTypes from 'prop-types'

export default PropTypes.shape({
    timer: PropTypes.oneOf([READY, ACTIVE, PAUSED, TERMINATED]),
    ticks: PropTypes.number.isRequired
})
