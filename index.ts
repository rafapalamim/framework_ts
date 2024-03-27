import ExampleController from './app/ExampleModule/ExampleController'
import PrometheusController from './framework/Observability/Prometheus/PrometheusController'
import ExpressHttpServerAdapter from './framework/Server/Adapters/Express/ExpressHttpServerAdapter'
import PrometheusCollectRequestDurationEnd from './framework/Server/Adapters/Express/Observability/PrometheusCollectRequestDurationEnd'
import PrometheusCollectRequestDurationInit from './framework/Server/Adapters/Express/Observability/PrometheusCollectRequestDurationInit'

const app = new ExpressHttpServerAdapter()

new PrometheusCollectRequestDurationInit().register(app)
new ExampleController().register(app)
new PrometheusController().register(app)
new PrometheusCollectRequestDurationEnd().register(app)

app.listen(3000)