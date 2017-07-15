import { combineReducers } from 'redux'
import locationReducer from './location'
import mainReducer from './main'
import { reducer as reduxFormReducer } from 'redux-form'

export const makeRootReducer = (asyncReducers) => {


  return combineReducers({
    location: locationReducer,
    main: mainReducer,
    form: reduxFormReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
