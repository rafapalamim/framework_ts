import Controller from '../../framework/Controller/Controller'
import HttpRequest from '../../framework/Server/HttpRequest'
import HttpResponse from '../../framework/Server/HttpResponse'
import HttpServer from '../../framework/Server/HttpServer'

export default class ExampleController implements Controller {

    register(server: HttpServer): void {
        server.addRoute('get', '/test', async (request: HttpRequest<{}, {}>, response: HttpResponse) => {
            const output = await Promise.resolve(1)
            response.status(200).send({ hello: 'true', promise: output, request: request.body })
        })

        server.addRoute('post', '/test', async (request: HttpRequest<{name: string}, {}>, response: HttpResponse) => {
            const output = await Promise.resolve(1)
            console.log(request)
            response.status(200).send({ hello: 'true', promise: output, request: request.body })
        })
    }

}