export const INITIAL_WAIT_TICKS = 20

// Tick duration in ms
export const TICK_DURATION = 50

// Decay rate of wait between updates in ticks given prior ticks
export const WAIT_DECAY_RATE = 1 / 50

export type Direction = 'left' | 'up' | 'right' | 'down'

export const LEFT: Direction = 'left'
export const UP: Direction = 'up'
export const RIGHT: Direction = 'right'
export const DOWN: Direction = 'down'

export const READY = 'ready'
export const ACTIVE = 'active'
export const PAUSED = 'paused'
export const TERMINATED = 'terminated'
