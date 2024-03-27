import Controller from '../../Controller/Controller'
import HttpRequest from '../../Server/HttpRequest'
import HttpResponse from '../../Server/HttpResponse'
import HttpServer from '../../Server/HttpServer'
import Prometheus from 'prom-client'

export default class PrometheusController implements Controller {

    register(server: HttpServer): void {
        server.registerRoute('get', '/metrics', async (request: HttpRequest<{}, {}>, response: HttpResponse) => {
            response.setHeader('Content-Type', Prometheus.register.contentType)
            response.send(await Prometheus.register.metrics())
        })
    }
}