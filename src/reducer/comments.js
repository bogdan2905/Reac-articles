import {arrToMap} from '../Utils';
import {ADD_COMMENT, LOAD_ALL_COMMENTS, START, SUCCESS} from "../constants";
import {Record, OrderedMap} from 'immutable'

const defaultComments = Record({
    items: new OrderedMap({})
});

const CommentRecord = Record({
    id: null,
    user: null,
    text: null
});

export default (comments = new defaultComments(), action) => {
    const {type, payload} = action;

    switch (type)
    {
        case ADD_COMMENT:
            const {id, user, text} = payload;
            return comments.setIn(['items'], new CommentRecord({id, user, text}));
        case LOAD_ALL_COMMENTS + SUCCESS:
            return comments.update('items', items=>items.merge(arrToMap(payload.response, CommentRecord)));
    }
    return comments;
}