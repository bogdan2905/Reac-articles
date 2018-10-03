import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {increment} from '../AC'

class Counter extends React.Component {
    static propTypes = {
        counter: PropTypes.number
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>{this.props.counter}</h2>
                <button onClick={this.handleIncrement}>inc</button>
            </div>
        );
    }

    handleIncrement = () => {
        this.props.increment();
    }
}

function mapStateToProps(state) {
    return {
        counter: state.count
    }
}

const decorator = connect(mapStateToProps, {increment});

export default decorator(Counter);