import { Request } from 'express'
import HttpRequest from '../HttpRequest'

export default class ExpressRequest<R, Q> implements HttpRequest<R, Q> {
    constructor(private readonly request: Request<{}, {}, R, Q>) { }

    get body(): R {
        return this.request.body
    }

    get query(): Q {
        return this.request.query
    }

}