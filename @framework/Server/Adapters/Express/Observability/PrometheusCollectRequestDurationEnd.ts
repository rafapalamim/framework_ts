import { NextFunction, Request, Response } from 'express'
import { httpRequestDurationMicroseconds } from '../../../../Observability/Prometheus/Metrics'
import HttpObservabilityMiddleware from '../../../../Observability/HttpObservabilityMiddleware'
import HttpServer from '../../../HttpServer'

export default class PrometheusCollectRequestDurationEnd implements HttpObservabilityMiddleware {

    register(httpServer: HttpServer): void {
        httpServer.registerMiddleware((req: Request, res: Response, next: NextFunction) => {
            const responseTimeInMs = Date.now() - res.locals.startEpoch

            httpRequestDurationMicroseconds
                .labels(req.method, req.path, res.statusCode.toString())
                .observe(responseTimeInMs)

            next()
        })
    }

}