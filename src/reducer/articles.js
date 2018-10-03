import {
    ADD_COMMENT,
    DELETE_ARTICLE,
    LOAD_ARTICLES,
    LOAD_ARTICLE_TEXT,
    START,
    SUCCESS,
    LOAD_ALL_COMMENTS
} from '../constants'
import {arrToMap} from "../Utils";
import {Record, OrderedMap} from 'immutable'
import comments from "./comments";

const ArticleRecord = Record({
    loading: false,
    loaded: false,
    id: undefined,
    title: undefined,
    commentLoaded: false,
    commentLoading: false,
    text: '',
    comments: []
});

const dataRecord = Record({
    loading: false,
    loaded: false,
    items: new OrderedMap({})
});

const defaultArticles = new dataRecord({});


export default (articles = defaultArticles, action) => {
    const {type, payload} = action;

    switch (type) {
        case DELETE_ARTICLE:
            return articles.deleteIn(['items', payload.id]);

        case ADD_COMMENT:
            const {articleId} = payload;
            return articles.updateIn(['items', articleId, 'comments'], comments => comments.concat(action.id));

        case LOAD_ARTICLES + START:
            return articles.set('loading', true);

        case LOAD_ARTICLES + SUCCESS:
            return articles.set('items', arrToMap(action.response, ArticleRecord))
                .set('loading', false)
                .set('loaded', true);
        case LOAD_ARTICLE_TEXT + START:
            return articles.setIn(['items', payload.id, 'loading'], true);

        case LOAD_ARTICLE_TEXT + SUCCESS:
            return articles.setIn(['items', payload.id], new ArticleRecord(payload.response))
                .setIn(['items', payload.id, 'loading'], false)
                .setIn(['items', payload.id, 'loaded'], true);

        case LOAD_ALL_COMMENTS + START:
            return articles.setIn(['items', payload.idArticle, 'commentLoading'], true);

        case LOAD_ALL_COMMENTS + SUCCESS:
            return articles.setIn(['items', payload.idArticle, 'commentLoading'], false)
                .setIn(['items', payload.idArticle, 'commentLoaded'], true);
    }
    return articles;
}

