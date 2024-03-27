import HttpError from '../../../HttpError'
import HttpMiddleware from '../../../HttpMiddleware'
import HttpNextFunction from '../../../HttpNextFunction'
import HttpRequest from '../../../HttpRequest'
import HttpResponse from '../../../HttpResponse'
import HttpServer from '../../../HttpServer'
import 'express-async-errors'

export default class ExpressErrorHandler implements HttpMiddleware {
    register(httpServer: HttpServer): void {
        httpServer.registerErrorMiddleware((err: HttpError, req: HttpRequest<{}, {}>, res: HttpResponse, next: HttpNextFunction) => {

            const stackTrace = process.env.NODE_ENV === 'development' && err.stack ? err.stack : ''

            const errorPayload: { statusCode: number, type: string, message: string, stack: string } = {
                statusCode: 500,
                type: '',
                message: '',
                stack: stackTrace
            }

            const isBaseErrorInstance = err.isBaseErrorInstance()

            errorPayload.statusCode = isBaseErrorInstance ? err.errorCode : 500
            errorPayload.type = isBaseErrorInstance ? err.type :'Undefined type error'
            errorPayload.message = isBaseErrorInstance ? err.message :'Undefined error'

            res.setStatusCode(errorPayload.statusCode).json(errorPayload)

            next.call()
        })
    }

}