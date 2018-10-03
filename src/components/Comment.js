import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {commentsSelectorFactory} from '../selectors'

function Comment(props) {

    const {comment} = props;
    return (
        <div>
            <h4>{comment.user}</h4>
            <span>{comment.text}</span>
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.shape({
        user: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    })
};

const mapStateToProps = () => {
    const commentsSelector = commentsSelectorFactory();

    return (state, ownProps) => {
        return {comment: commentsSelector(state, ownProps)}
    }
};

export default connect(mapStateToProps)(Comment);