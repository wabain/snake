export const INITIAL_WAIT_TICKS = 40
export const TICK_DECAY_EXPONENT = 0.5

export const TICK_DURATION_MS = 25

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
