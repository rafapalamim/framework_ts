import PrometheusController from './@framework/Observability/Prometheus/PrometheusController'
import ExpressHttpServerAdapter from './@framework/Server/Adapters/Express/ExpressHttpServerAdapter'
import PrometheusCollectRequestDuration from './@framework/Observability/Prometheus/Middlewares/PrometheusCollectRequestDuration'
import HttpServerBuilder from './@framework/Server/Builder/HttpServerBuilder'
import ExampleController from './src/ExampleModule/ExampleController'
import StartRequestTime from './@framework/Server/Middlewares/StartRequestTime'
import ExpressErrorHandler from './@framework/Server/Adapters/Express/Middlewares/ExpressErrorHandler'
import ExpressRouteNotFound from './@framework/Server/Adapters/Express/Middlewares/ExpressRouteNotFound'

const appBuilder = new HttpServerBuilder(new ExpressHttpServerAdapter())
appBuilder.addMiddlewares([new StartRequestTime()])
appBuilder.addRoutes([new ExampleController(), new PrometheusController()])
appBuilder.addMiddlewares([new ExpressRouteNotFound(), new ExpressErrorHandler()])
appBuilder.addObservabilityMiddlewares(new PrometheusCollectRequestDuration())
const app = appBuilder.build()

app.listen(3000)