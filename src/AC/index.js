import {
    INCREMENT, DELETE_ARTICLE, CHANGE_SELECTION, CHANGE_DATE_RANGE,
    ADD_COMMENT, LOAD_ARTICLES, LOAD_ARTICLE_TEXT, START, SUCCESS, FAIL, LOAD_ALL_COMMENTS
} from '../constants'

export function increment() {
    return {
        type: INCREMENT
    }
}

export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload: {
            id: id
        }
    }
}

export function changeSelect(selected) {
    return {
        type: CHANGE_SELECTION,
        payload: {
            selected: selected
        }
    }
}

export function changeDateRange(dateRange) {

    return {
        type: CHANGE_DATE_RANGE,
        payload: {
            dateRange
        }
    }
}

export function addComment(idArticle, user, text) {
    return {
        type: ADD_COMMENT,
        payload: {
            idArticle,
            user,
            text
        },
        generateId: true
    }
}

export function loadArticles() {
    return {
        type: LOAD_ARTICLES,
        callAPI: '/api/article',
    }
}

export function loadArticleText(id) {
    return dispatch => {
        dispatch({
            type: LOAD_ARTICLE_TEXT + START,
            payload: {id}
        });

        setTimeout(() => {
            fetch(`/api/article/${id}`)
                .then(res => res.json())
                .then(response => {
                    dispatch({
                        type: LOAD_ARTICLE_TEXT + SUCCESS,
                        payload: {
                            id, response
                        }
                    })
                })
                .catch(err => {
                    dispatch({
                        type: LOAD_ARTICLE_TEXT + FAIL,
                        payload: {id, err}
                    })
                })
        }, 1000)
    }
}

export function loadAllComments(idArticle) {
    return (dispatch) => {
        dispatch({
            type: LOAD_ALL_COMMENTS + START,
            payload: {idArticle}
        });

        setTimeout(() => {
            fetch(`/api/comment?article=${idArticle}`)
                .then(res => res.json())
                .then(response => dispatch({
                    type: LOAD_ALL_COMMENTS + SUCCESS,
                    payload: {idArticle, response: response}
                }))
                .catch(error => dispatch({
                    type: LOAD_ALL_COMMENTS + FAIL,
                    payload: {idArticle, error}
                }))
        }, 1000);
    }
}