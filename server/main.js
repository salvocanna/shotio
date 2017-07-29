import express from 'express'
import path from 'path'
import webpack from 'webpack'
import { createServer } from 'http'
// import { apolloExpress, graphiqlExpress } from 'apollo-server-express';
// import { makeExecutableSchema } from 'graphql-tools';
// import bodyParser from 'body-parser';
import logger from '../build/lib/logger'
import webpackConfig from '../build/webpack.config'
import project from '../project.config'
import serverSocket from './serverSocket'
import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql';

// import { server, database } from './config';
// import typeDefs from './typeDefs';
// import resolvers from './resolvers';
// import { getTokenFromRequest } from './utils/auth';
// mongoose.Promise = global.Promise;
// mongoose.connect(`mongodb://${database.host}:${database.port}/${database.name}`);
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', () => console.log('We are connected!'));

const app = express();
// const schema = makeExecutableSchema({ typeDefs, resolvers });
//var corsOptions = { origin: 'http://localhost:3000' };

//app.use(cors(corsOptions));

// app.use('/graphql', bodyParser.json(), apolloExpress(request => ({
//     schema,
//     context: { /* token: getTokenFromRequest(request)*/ }
// })));
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
    hello: () => {
        return 'Hello world!';
    },
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

const httpServer = createServer(app);

httpServer.listen(3000, () => {
    logger.success('Server is running at http://localhost:3000');
});

// const socket = serverSocket(httpServer);

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  logger.info('Enabling webpack development and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : path.resolve(project.basePath, project.srcDir),
    hot         : true,
    quiet       : false,
    noInfo      : false,
    lazy        : false,
    stats       : 'normal',
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(path.resolve(project.basePath, 'public')))

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use('/', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  logger.warn(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(path.resolve(project.basePath, project.outDir)))
}

module.exports = app
