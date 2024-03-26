import ExampleController from './app/ExampleModule/ExampleController'
import PrometheusController from './framework/Observability/Prometheus/PrometheusController'
import ExpressHttpServerAdapter from './framework/Server/Adapters/Express/ExpressHttpServerAdapter'
import PrometheusCollectRequestDurationEnd from './framework/Server/Adapters/Express/Observability/PrometheusCollectRequestDurationEnd'
import PrometheusCollectRequestDurationInit from './framework/Server/Adapters/Express/Observability/PrometheusCollectRequestDurationInit'


const app = new ExpressHttpServerAdapter()
app.registerMiddleware(new PrometheusCollectRequestDurationInit().getMiddlewareFunction())
new ExampleController().register(app)
app.registerMiddleware(new PrometheusCollectRequestDurationEnd().getMiddlewareFunction())
new PrometheusController().register(app)

app.listen(3000)