import BaseError from './BaseError'

export default class RouteNotFoundError extends BaseError {
    constructor(message: string) {
        super(message, 404)
        Object.setPrototypeOf(this, RouteNotFoundError.prototype)
    }
}