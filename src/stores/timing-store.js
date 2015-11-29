import { READY, ACTIVE, PAUSED, TERMINATED } from '../constants'

import TimingActions from './timing-actions'
import SnakeStore from './snake-store'

import { store } from '../alt'

@store('TimingStore')
export default class TimingStore {
    constructor() {
        this.bindActions(TimingActions)

        this.state = {
            timer: READY,
            ticks: 0
        }
    }

    // TODO: Enforce state transitions?
    onStart() {
        this.setState({ timer: ACTIVE })
    }

    onPause() {
        this.setState({ timer: PAUSED })
    }

    onTerminate() {
        this.setState({ timer: TERMINATED })
    }

    onResumeGame() {
        if (this.state.timer === TERMINATED)
            this.setState({ timer: PAUSED })
    }

    onTick(ticks) {
        this.waitFor(SnakeStore.dispatchToken)

        if (SnakeStore.getState().collided)
            this.setState({ timer: TERMINATED })
        else
            this.setState({ ticks: this.state.ticks + ticks })
    }
}
