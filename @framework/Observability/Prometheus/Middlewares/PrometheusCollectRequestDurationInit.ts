import { NextFunction, Request, Response } from 'express'
import HttpServer from '../../../Server/HttpServer'
import HttpObservabilityMiddleware from '../../HttpObservabilityMiddleware'

export default class PrometheusCollectRequestDurationInit implements HttpObservabilityMiddleware {

    register(httpServer: HttpServer): void {
        httpServer.registerMiddleware((req: Request, res: Response, next: NextFunction) => {
            res.locals.startEpoch = Date.now()
            next()
        })
    }

}