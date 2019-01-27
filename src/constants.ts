export const INITIAL_WAIT_TICKS = 20

// Tick duration in ms
export const TICK_DURATION = 50

// Decay rate of wait between updates in ticks given prior ticks
export const WAIT_DECAY_RATE = 1 / 50

export type Direction = 'left' | 'up' | 'right' | 'down'

export const LEFT = 'left'
export const UP = 'up'
export const RIGHT = 'right'
export const DOWN = 'down'

export type TimerState = 'ready' | 'active' | 'paused' | 'terminated'

export const READY = 'ready'
export const ACTIVE = 'active'
export const PAUSED = 'paused'
export const TERMINATED = 'terminated'

/** Typechecked assert that all constant values have been accounted for */
export function assertNever(typeName: string, value: never): never {
    throw new Error(`Unexpected ${typeName}: ${value}`)
}
