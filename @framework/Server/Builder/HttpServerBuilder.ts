import Controller from '../../Controller/Controller'
import HttpObservabilityMiddleware from '../../Observability/HttpObservabilityMiddleware'
import HttpMiddleware from '../HttpMiddleware'
import HttpServer from '../HttpServer'

export default class HttpServerBuilder {

    constructor(private readonly server: HttpServer) { }

    addRoutes(controllers: Controller[] | Controller): void {
        const routes = Array.isArray(controllers) ? controllers : [controllers]
        routes.map((controller) => controller.register(this.server))
    }

    addMiddlewares(middlewares: HttpMiddleware[] | HttpMiddleware): void {
        const newMiddlewares = Array.isArray(middlewares) ? middlewares : [middlewares]
        newMiddlewares.map((middleware) => middleware.register(this.server))
    }

    addObservabilityMiddlewares(middlewares: HttpObservabilityMiddleware[] | HttpObservabilityMiddleware): void {
        const newMiddlewares = Array.isArray(middlewares) ? middlewares : [middlewares]
        newMiddlewares.map((middleware) => middleware.register(this.server))
    }

    build(): HttpServer {
        return this.server
    }

}