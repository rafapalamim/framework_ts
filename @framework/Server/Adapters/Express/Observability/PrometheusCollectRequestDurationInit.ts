import { NextFunction, Request, Response } from 'express'
import HttpServer from '../../../HttpServer'
import HttpObservabilityMiddleware from '../../../../Observability/HttpObservabilityMiddleware'

export default class PrometheusCollectRequestDurationInit implements HttpObservabilityMiddleware {

    register(httpServer: HttpServer): void {
        httpServer.registerMiddleware((req: Request, res: Response, next: NextFunction) => {
            res.locals.startEpoch = Date.now()
            next()
        })
    }

}