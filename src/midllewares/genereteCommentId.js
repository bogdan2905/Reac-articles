export default state => next => action => {
    const {type, payload} = action;
    if (!action.generateId) return next(action);

    next({...action, payload: {...payload, id: makeId()}});
}

function makeId() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}