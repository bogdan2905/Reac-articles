import React, {Component} from 'react'
import Article from './Article'
import PropTypes from 'prop-types'
import accordion from '../decorators/Acordeon'
import {connect} from 'react-redux'
import {filtersSelector} from '../selectors'
import {loadArticles} from '../AC'
import Loader from "./Loader";

class ArticleList extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,
        //from accordion
        idOpened: PropTypes.string,
        toggle: PropTypes.func
    };


    componentDidMount() {
        const {loading, loaded} = this.props;
        if (!loading || !loaded)
            this.props.loadArticles();
    }


    render() {
        const {articles, idOpened, toggle, loading} = this.props;
        if (loading) return <Loader/>;

        const articleElems = articles.map(article =>
            <li key={article.id}>
                <Article
                    isOpen={idOpened === article.id}
                    article={article}
                    toggle={toggle(article.id)}
                />
            </li>);

        return (
            <ul>
                {articleElems}
            </ul>
        )
    }


}

export default connect((state) => {
    return {
        articles: filtersSelector(state),
        loading: state.articles.loading,
        loaded: state.articles.loaded
    }
}, {loadArticles})(accordion(ArticleList));