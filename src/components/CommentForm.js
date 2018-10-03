import React from 'react'
import './CommentForm.css'
import {connect} from 'react-redux'
import {addComment} from '../AC'

class CommentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            text: '',
        };

        this.limit = {
            user: {
                min: 5,
                max: 6
            },
            text: {
                min: 20,
                max: 50
            }
        };
    }

    initDefaultState = () => {
        this.setState({user: '', text: ''});
    };
    handleSubmit = (ev) => {
        //alert(`user: ${this.state.user} text: ${this.state.text}`);
        const {addComment, idArticle} = this.props;
        addComment(idArticle, this.state.user, this.state.text);
        this.initDefaultState();
        ev.preventDefault();
    };

    handleOnChange = (name) => (ev) => {
        let value = ev.target.value;
        if (value.length > this.limit[name].max) return;
        this.setState({[name]: value});
    };


    getClass = (nameInput) => {
        return this.state[nameInput].length && this.state[nameInput].length < this.limit[nameInput].min ? 'warning' : '';
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input className={this.getClass('user')}
                       type="text"
                       name="user"
                       value={this.state.user}
                       onChange={this.handleOnChange('user')}/>
                <textarea className={this.getClass('text')}
                          name="text"
                          value={this.state.text}
                          onChange={this.handleOnChange('text')}/>
                <input type="submit" name="add"/>
            </form>
        )
    }
}

export default connect(null, {addComment})(CommentForm);