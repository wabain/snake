import alt from '../alt'
import TimingActions from './timing-actions'

import SnakeStore from './snake-store'

@alt.createStore
export default class TimingStore {
    constructor() {
        this.bindActions(TimingActions)

        this.state = {
            started: false,
            terminated: false,
            active: false,
            ticks: 0
        }
    }

    onStart() {
        this.setState({ started: true, active: true })
    }

    onPause() {
        this.setState({ active: false })
    }

    onTerminate() {
        this.setState({ active: false, terminated: true })
    }

    onTick() {
        this.waitFor(SnakeStore.dispatchToken)

        if (SnakeStore.getState().collided)
            this.setState({ active: false, terminated: true })
        else
            this.setState({ ticks: this.state.ticks + 1 })
    }
}
