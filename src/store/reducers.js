import { combineReducers } from 'redux'
import locationReducer from './location'
import { reducer as reduxFormReducer } from 'redux-form'
import mainReducer from './main'
import ApolloClient from '../ApolloClient'

export const makeRootReducer = (asyncReducers) => {


  return combineReducers({
    location: locationReducer,
    main: mainReducer,
    form: reduxFormReducer,
    apollo: ApolloClient.reducer(),
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
