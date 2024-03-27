import { Response } from 'express'
import HttpResponse from '../../HttpResponse'

export default class ExpressResponseAdapter implements HttpResponse {

    constructor(private readonly response: Response) { }

    setHeader(key: string, value: string): this {
        this.response.set(key, value)
        return this
    }

    setStatusCode(code: number): this {
        this.response.status(code)
        return this
    }

    send(data: unknown): void {
        this.response.send(data)
    }

    json(json: object): void {
        this.response.json(json)
    }

    get statusCode(): number {
        return this.response.statusCode
    }
}