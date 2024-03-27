import BaseError from './BaseError'

export default class InfrastructureError extends BaseError {
    constructor(message: string, errorCode?: number) {
        super(message, errorCode)
        Object.setPrototypeOf(this, InfrastructureError.prototype)
    }
}