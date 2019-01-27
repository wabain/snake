import { Direction } from '../constants'

export type Action =
    | { type: 'setDirection'; payload: { direction: Direction } }
    | { type: 'start'; payload: {} }
    | { type: 'pause'; payload: {} }
    | { type: 'terminate'; payload: {} }
    | { type: 'tick'; payload: { ticks: number } }
    | { type: 'resumeGame'; payload: {} }
    | { type: '__nonexhaustiveDontMatch'; [key: string]: any }

export const SET_DIRECTION = 'setDirection'
export const START = 'start'
export const PAUSE = 'pause'
export const TICK = 'tick'
export const TERMINATE = 'terminate'
export const RESUME_GAME = 'resumeGame'
