export type LogLevelType = 'info' | 'warning' | 'emergency'

export default interface Logger {
    info(data: object) : Promise<void>
    warning(data: object) : Promise<void>
    emergency(data: object) : Promise<void>
}