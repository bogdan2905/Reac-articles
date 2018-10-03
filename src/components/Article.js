import React, {Component} from 'react'
import CommentList from './CommentList'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {deleteArticle, loadArticleText} from '../AC'

class Article extends Component {
    static propTypes = {
        isOpen: PropTypes.bool,
        toggle: PropTypes.func,
        article: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            comments: PropTypes.array
        })
    };


    componentWillReceiveProps({article, isOpen, loadArticleText}) {
        if(!article.loading && !article.text &&  isOpen) loadArticleText(article.id);
    }

    render() {
        const {article, isOpen, toggle} = this.props;

        return (
            <div>
                <h3>{article.title}</h3>
                <div>{article.date}</div>
                <button onClick={toggle}>
                    {isOpen ? 'close' : 'open'}
                </button>
                <button onClick={this.handleDelete}>delete</button>
                {this.getBody(article)}
            </div>
        )
    }


    getBody(article) {
        if (!this.props.isOpen) return null;
        return (
            <div>
                <section>{article.text}</section>
                <div><CommentList article={article}/></div>
            </div>
        )
    }

    handleDelete = () => {
        const {article, deleteArticle} = this.props;

        deleteArticle(article.id);
    }

}

export default connect(null, {deleteArticle, loadArticleText})(Article);
