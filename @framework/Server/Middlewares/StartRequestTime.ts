import HttpMiddleware from '../HttpMiddleware'
import HttpNextFunction from '../HttpNextFunction'
import HttpRequest from '../HttpRequest'
import HttpResponse from '../HttpResponse'
import HttpServer from '../HttpServer'

export default class StartRequestTime implements HttpMiddleware {

    register(httpServer: HttpServer): void {
        httpServer.registerMiddleware((req: HttpRequest<{}, {}>, res: HttpResponse, next: HttpNextFunction) => {
            req.addStartTime()
            next.call()
        })
    }

}