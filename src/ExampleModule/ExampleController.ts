import { NextFunction } from 'express'
import Controller from '../../@framework/Controller/Controller'
import HttpRequest from '../../@framework/Server/HttpRequest'
import HttpResponse from '../../@framework/Server/HttpResponse'
import HttpServer from '../../@framework/Server/HttpServer'

export default class ExampleController implements Controller {

    register(server: HttpServer): void {
        server.registerRoute('get', '/test', async (request: HttpRequest<{}, {}>, response: HttpResponse, next: NextFunction) => {
            const output = await Promise.resolve(1)
            response.status(200).send({ hello: 'true', promise: output, request: request.body })
            next()
        })

        server.registerRoute('post', '/test', async (request: HttpRequest<{name: string}, {}>, response: HttpResponse, next: NextFunction) => {
            const output = await Promise.resolve(1)
            console.log(request)
            response.status(200).send({ hello: 'true', promise: output, request: request.body })
            next()
        })
    }

}