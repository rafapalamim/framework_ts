import { NextFunction, Request, RequestHandler, Response } from 'express'
import HttpMiddleware from '../../../HttpMiddleware'

export default class PrometheusCollectRequestDurationInit implements HttpMiddleware<RequestHandler> {

    getMiddlewareFunction(): RequestHandler {
        return (req: Request, res: Response, next: NextFunction) => {
            console.log('oporrinha')
            res.locals.startEpoch = Date.now()
            next()
        }
    }

}