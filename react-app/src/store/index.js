import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import conversationReducer from './conversations';
import sessionReducer from './session';
import stickerReducer from './stickers';
import topicReducer from './topics';
import userReducer from './user'

const rootReducer = combineReducers({
  session: sessionReducer,
  user: userReducer,
  sticker: stickerReducer,
  conversations: conversationReducer,
  topics: topicReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
