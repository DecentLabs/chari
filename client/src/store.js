import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers/rootReducer.js"
import { createLogger } from "redux-logger"


const enhancers = []
const middleware = [thunk]

if (process.env.NODE_ENV === "development") {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

    if (typeof devToolsExtension === "function") {
        enhancers.push(devToolsExtension())
    }

    const logger = createLogger({
        collapsed: true
    })
    middleware.push(logger)
}



const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
)

const initialState = {}
const store = createStore(rootReducer, initialState, composedEnhancers)

export default store
