import HttpServer, { MethodType } from '../../HttpServer'
import express, { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from 'express'
import ExpressRequestAdapter from './ExpressRequestAdapter'
import ExpressResponseAdapter from './ExpressResponseAdapter'
import ExpressNextFunctionAdapter from './ExpressNextFunctionAdapter'
import ExpressErrorAdapter from './ExpressErrorAdapter'

export default class ExpressHttpServerAdapter implements HttpServer {

    private readonly app

    constructor() {
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    registerMiddleware(middlewareFunction: RequestHandler): void {
        this.app.use((request: Request, response: Response, next: NextFunction) => { 
            const newRequest = new ExpressRequestAdapter(request) as unknown as Request
            const newResponse = new ExpressResponseAdapter(response) as unknown as Response
            const newNext = new ExpressNextFunctionAdapter(next) as unknown as NextFunction
            middlewareFunction(newRequest, newResponse, newNext)
        })
    }

    registerErrorMiddleware(middlewareFunction: ErrorRequestHandler): void {        
        this.app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
            const newError = new ExpressErrorAdapter(err) as unknown as Error
            const newRequest = new ExpressRequestAdapter(request) as unknown as Request
            const newResponse = new ExpressResponseAdapter(response) as unknown as Response
            const newNext = new ExpressNextFunctionAdapter(next) as unknown as NextFunction

            middlewareFunction(newError, newRequest, newResponse, newNext)
        })
    }

    registerRoute(method: MethodType, url: string, callback: CallableFunction): void {
        this.app[method](url, (request: Request, response: Response, next: NextFunction) => callback(
            new ExpressRequestAdapter(request),
            new ExpressResponseAdapter(response),
            new ExpressNextFunctionAdapter(next)
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