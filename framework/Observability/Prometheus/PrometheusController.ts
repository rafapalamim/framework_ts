import Controller from '../../Controller/Controller'
import HttpRequest from '../../Server/HttpRequest'
import HttpResponse from '../../Server/HttpResponse'
import HttpServer from '../../Server/HttpServer'
import Prometheus from 'prom-client'

export default class PrometheusController implements Controller {

    register(server: HttpServer): void {
        server.addRoute('get', '/metrics', async (request: HttpRequest<{}, {}>, response: HttpResponse) => {
            response.set('Content-Type', Prometheus.register.contentType)
            response.end(await Prometheus.register.metrics())
        })
    }

}