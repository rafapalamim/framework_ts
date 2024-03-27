import RouteNotFoundError from '../../../../Error/RouteNotFoundError'
import HttpMiddleware from '../../../HttpMiddleware'
import HttpNextFunction from '../../../HttpNextFunction'
import HttpRequest from '../../../HttpRequest'
import HttpResponse from '../../../HttpResponse'
import HttpServer from '../../../HttpServer'
import 'express-async-errors'

export default class ExpressRouteNotFound implements HttpMiddleware {
    register(httpServer: HttpServer): void {
        httpServer.registerMiddleware((req: HttpRequest<{}, {}>, res: HttpResponse, next: HttpNextFunction) => {
            if (!req.route) throw new RouteNotFoundError(`Route '${req.requestedUrl}' not found`)
            next.call()
        })
    }

}