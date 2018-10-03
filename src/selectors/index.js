import {createSelector} from 'reselect'
import {mapToArr} from "../Utils";

const articlesGetter = state => state.articles.items;
const filtersGetter = state => state.filters;
const idGetter = (state, props) => props.id;
const commentsGetter = state => state.comments.items;

export const filtersSelector = createSelector(articlesGetter, filtersGetter, (articles, filters) => {
    const {selected, dateRange: {from, to}} = filters;
    return mapToArr(articles).filter(({id, date}) => {
        let published = Date.parse(date);
        return (!selected.length || selected.includes(id)) &&
            (!from || !to || (published > from && published < to))
    });
});

export const commentsSelectorFactory = () =>
    createSelector(idGetter, commentsGetter, (id, comments) => {
        return comments.get(id);
    });
