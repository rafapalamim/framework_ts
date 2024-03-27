import PrometheusController from './@framework/Observability/Prometheus/PrometheusController'
import ExpressHttpServerAdapter from './@framework/Server/Adapters/Express/ExpressHttpServerAdapter'
import PrometheusCollectRequestDurationEnd from './@framework/Server/Adapters/Express/Observability/PrometheusCollectRequestDurationEnd'
import PrometheusCollectRequestDurationInit from './@framework/Server/Adapters/Express/Observability/PrometheusCollectRequestDurationInit'
import HttpServerBuilder from './@framework/Server/HttpServerBuilder'
import ExampleController from './src/ExampleModule/ExampleController'

const appBuilder = new HttpServerBuilder(new ExpressHttpServerAdapter())
appBuilder.addObservabilityMiddlewares(new PrometheusCollectRequestDurationInit())
appBuilder.addRoutes([new ExampleController(), new PrometheusController()])
appBuilder.addObservabilityMiddlewares(new PrometheusCollectRequestDurationEnd())

const app = appBuilder.build()

app.listen(3000)