import {LOAD_ARTICLES, SUCCESS, START, FAIL} from '../constants'

export default state => next => action => {
    const {callAPI, type} = action;
    if (!callAPI) return next(action);

    next({
        ...action,
        type: type + START,
    });

    setTimeout(() => {
        fetch(callAPI)
            .then(res => res.json())
            .then(response => next({...action, type: type + SUCCESS, response}))
            .catch(next({...action, type: type + FAIL}))
    }, 1000)
}