import { NextFunction, Request, RequestHandler, Response } from 'express'
import HttpMiddleware from '../../../HttpMiddleware'
import { httpRequestDurationMicroseconds } from '../../../../Observability/Prometheus/Metrics'

export default class PrometheusCollectRequestDurationEnd implements HttpMiddleware<RequestHandler> {

    getMiddlewareFunction(): RequestHandler {
        return (req: Request, res: Response, next: NextFunction) => {
            console.log('oporra')
            const responseTimeInMs = Date.now() - res.locals.startEpoch

            httpRequestDurationMicroseconds
                .labels(req.method, req.path, res.statusCode.toString())
                .observe(responseTimeInMs)

            next()
        }
    }

}