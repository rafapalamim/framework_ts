import BaseError from './BaseError'

export default class AuthorizationError extends BaseError {
    constructor(message: string) {
        super(message, 403)
        Object.setPrototypeOf(this, AuthorizationError.prototype)
    }
}