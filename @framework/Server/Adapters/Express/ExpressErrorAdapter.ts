import BaseError from '../../../Error/BaseError'
import HttpError from '../../HttpError'

export default class ExpressErrorAdapter implements HttpError {
    constructor(private readonly error: Error) {}

    get message(): string {
        return this.error.message
    }

    get stack(): string | undefined {
        return this.error.stack
    }
    
    get errorCode(): number {
        if(this.error instanceof BaseError) return this.error.errorCode
        return 500
    }

    get type(): string {
        return this.error.constructor.name
    }

    isBaseErrorInstance(): boolean {
        return this.error instanceof BaseError
    }
}