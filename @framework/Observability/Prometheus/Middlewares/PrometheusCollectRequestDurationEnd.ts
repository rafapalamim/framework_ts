import { httpRequestDurationMicroseconds } from '../Metrics'
import HttpObservabilityMiddleware from '../../HttpObservabilityMiddleware'
import HttpServer from '../../../Server/HttpServer'
import HttpRequest from '../../../Server/HttpRequest'
import HttpResponse from '../../../Server/HttpResponse'
import HttpNextFunction from '../../../Server/HttpNextFunction'

export default class PrometheusCollectRequestDurationEnd implements HttpObservabilityMiddleware {

    register(httpServer: HttpServer): void {

        httpServer.registerMiddleware((req: HttpRequest<{}, {}>, res: HttpResponse, next: HttpNextFunction) => {
            const responseTimeInMs = Date.now() - req.startedAtInMs

            httpRequestDurationMicroseconds
                .labels(req.method, req.path, res.statusCode.toString())
                .observe(responseTimeInMs)

            next.call()
        })
    }

}