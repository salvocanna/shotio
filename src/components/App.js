import React from 'react'
import { browserHistory, Router } from 'react-router'
// import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
// import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from '../ApolloClient'

// Create the client as outlined above
// const client = new ApolloClient();

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <ApolloProvider store={this.props.store} client={ApolloClient}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={this.props.routes} />
        </div>
      </ApolloProvider>
    )
  }
}

export default App
