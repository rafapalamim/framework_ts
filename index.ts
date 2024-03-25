import ExampleController from './app/ExampleModule/ExampleController'
import ExpressHttpServerAdapter from './framework/Server/HttpAdapters/ExpressHttpServerAdapter'

const app = new ExpressHttpServerAdapter()
const exampleController = new ExampleController()
exampleController.register(app)

app.listen(3000)