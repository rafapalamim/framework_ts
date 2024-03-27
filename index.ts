import PrometheusController from './@framework/Observability/Prometheus/PrometheusController'
import ExpressHttpServerAdapter from './@framework/Server/Adapters/Express/ExpressHttpServerAdapter'
import PrometheusCollectRequestDuration from './@framework/Observability/Prometheus/Middlewares/PrometheusCollectRequestDuration'
import HttpServerBuilder from './@framework/Server/Builder/HttpServerBuilder'
import ExampleController from './src/ExampleModule/ExampleController'
import StartRequestTime from './@framework/Server/Middlewares/StartRequestTime'

const appBuilder = new HttpServerBuilder(new ExpressHttpServerAdapter())
appBuilder.addMiddlewares([new StartRequestTime()])
appBuilder.addRoutes([new ExampleController(), new PrometheusController()])
appBuilder.addObservabilityMiddlewares(new PrometheusCollectRequestDuration())

const app = appBuilder.build()

app.listen(3000)