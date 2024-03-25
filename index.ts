import ExampleController from './app/ExampleModule/ExampleController'
import ExpressHttpAdapter from './framework/Server/HttpAdapters/ExpressHttpAdapter'

const app = new ExpressHttpAdapter()
const exampleController = new ExampleController()
exampleController.register(app)

app.listen(3000)