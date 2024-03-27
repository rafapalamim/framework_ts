import HttpServer from './HttpServer'

export default interface HttpMiddleware {
    register(httpServer: HttpServer): void
}