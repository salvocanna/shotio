import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { SubscriptionClient } from 'subscriptions-transport-ws';
// import { applyMiddleware } from 'redux';

const GRAPHQL_ENDPOINT = 'ws://localhost:3000/graphql';


const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
    reconnect: true,
});

export default new ApolloClient({
    networkInterface: client,
});

// const networkInterface = createNetworkInterface({ uri: '/graphql' });
// networkInterface.use([{
//     applyMiddleware(req, next) {
//         if (!req.options.headers) {
//             req.options.headers = {};  // Create the header object if needed.
//         }
//
//         // Get the authentication token from local storage if it exists
//         // req.options.headers.token = token ? token : null;
//         next();
//     }
// }]);
//
// export default new ApolloClient({
//     networkInterface
// });
