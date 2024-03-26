import HttpServer, { MethodType } from '../../HttpServer'
import express, { NextFunction, Request, RequestHandler, Response } from 'express'
import ExpressRequestAdapter from './ExpressRequestAdapter'
import ExpressResponseAdapter from './ExpressResponseAdapter'

export default class ExpressHttpServerAdapter implements HttpServer {

    private readonly app

    constructor() {
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    registerMiddleware(middlewareFunction: RequestHandler): void {
        this.app.use(middlewareFunction)
    }

    addRoute(method: MethodType, url: string, callback: CallableFunction): void {
        this.app[method](url, (request: Request, response: Response, next: NextFunction) => callback(
            new ExpressRequestAdapter(request),
            new ExpressResponseAdapter(response),
            next
        ))
    }

    listen(port: number): void {
        const appPort = port || 3000
        const server = this.app.listen(appPort, () => {
            console.log(`Listen on http://localhost:${appPort}`)
        })

        process.on('SIGTERM', () => {
            server.close((err: Error | undefined) => {
                
                if (err) {
                    console.error(err)
                    process.exit(1)
                }

                process.exit(0)
            })
        })
    }
}