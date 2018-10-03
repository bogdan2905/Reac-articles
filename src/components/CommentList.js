import React, {Component} from 'react'
import Comment from './Comment'
import WrapperToggle from '../decorators/toggleOpen'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'
import {connect} from 'react-redux'
import {loadAllComments} from '../AC'

class CommentList extends Component {
    static propTypes = {
        article: PropTypes.object.isRequired
    };

    static defaultProps = {
        comments: [],
    };


    componentWillReceiveProps({loaded, loading, article, isOpen, loadAllComments}) {
        if(!article.commentLoaded && !article.commentLoading && isOpen) loadAllComments(article.id);
    }

    render() {
        const {article, isOpen, toggle} = this.props;

        return (
            <div>
                <CommentForm idArticle={article.id}/>
                <ul>
                    <button onClick={toggle}>{isOpen ? 'close' : 'open'}</button>
                    {this.getComments(article.comments)}
                </ul>
            </div>
        )
    }

    getComments(comments) {
        if (!this.props.isOpen || !this.props.article.commentLoaded) return null;
        if (!comments.length) return <div>No comments yet</div>;

        return comments.map(id => <li key={id}><Comment id={id}/></li>);
    }


}


export default connect(null, { loadAllComments })(WrapperToggle(CommentList));
