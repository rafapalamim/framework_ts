import HttpServer, { MethodType } from '../HttpServer'
import express, { Request, Response } from 'express'
import ExpressRequestAdapter from './ExpressRequestAdapter'
import ExpressResponseAdapter from './ExpressResponseAdapter'

export default class ExpressHttpServerAdapter implements HttpServer {

    private readonly app

    constructor() {
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    addRoute(method: MethodType, url: string, callback: CallableFunction): void {
        this.app[method](url, (request: Request, response: Response) => callback(new ExpressRequestAdapter(request), new ExpressResponseAdapter(response)))
    }

    listen(port: number): void {
        const appPort = port || 3000
        this.app.listen(appPort, () => {
            console.log(`Listen on http://localhost:${appPort}`)
        })
    }

}