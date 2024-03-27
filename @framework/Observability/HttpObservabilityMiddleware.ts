import HttpServer from '../Server/HttpServer'

export default interface HttpObservabilityMiddleware {
    register(httpServer: HttpServer) : void
}