import { NextFunction } from 'express'
import HttpNextFunction from '../../HttpNextFunction'

export default class ExpressNextFunctionAdapter implements HttpNextFunction {

    constructor(private nextFunction: NextFunction) {}

    call(err?: unknown): void {
        this.nextFunction(err)
    }

}