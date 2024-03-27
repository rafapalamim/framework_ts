import { Request } from 'express'
import HttpRequest from '../../HttpRequest'

export default class ExpressRequestAdapter<R, Q> implements HttpRequest<R, Q> {
    constructor(private request: Request<{}, {}, R, Q>) { }

    get method(): string {
        return this.request.method
    }

    get path(): string {
        return this.request.path
    }

    get body(): R {
        return this.request.body
    }

    get query(): Q {
        return this.request.query
    }

    get route(): string | null {
        return this.request.route ? this.request.route.path : null
    }

    get requestedUrl(): string {
        return this.request.originalUrl
    }

    get currentUser(): unknown {
        return this.request.currentUser
    }

    get startTime(): number {
        return this.request.startedAtInMs
    }

    addStartTime(): void {
        this.request.startedAtInMs = Date.now()
    }

}