import {createStore, applyMiddleware} from 'redux'
import reducer from '../reducer'
import logger from "../midllewares/logger";
import generateCommentId from "../midllewares/genereteCommentId";
import api from '../midllewares/api'
import thunk from 'redux-thunk'

const enhancer = applyMiddleware(thunk, generateCommentId, api, logger);

const store = createStore(reducer, enhancer);

window.store = store;

export default store;