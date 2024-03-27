import Controller from '../../@framework/Controller/Controller'
import HttpRequest from '../../@framework/Server/HttpRequest'
import HttpResponse from '../../@framework/Server/HttpResponse'
import HttpServer from '../../@framework/Server/HttpServer'
import HttpNextFunction from '../Server/HttpNextFunction'

export default class ExampleController implements Controller {

    register(server: HttpServer): void {
        server.registerRoute('get', '/test', async (request: HttpRequest<{}, {}>, response: HttpResponse, next: HttpNextFunction) => {
            const output = await Promise.resolve(1)
            response.setStatusCode(200).send({ hello: 'true', promise: output, request: request.body })
            next.call()
        })

        server.registerRoute('post', '/test', async (request: HttpRequest<{ name: string }, {}>, response: HttpResponse, next: HttpNextFunction) => {
            const output = await Promise.resolve(1)
            response.setStatusCode(200).send({ hello: 'true', promise: output, request: request.body })
            next.call()
        })
    }

}