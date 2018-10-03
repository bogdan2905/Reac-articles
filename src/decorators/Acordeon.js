import React, {Component} from 'react'


export default (OriginalComponent) => class Accordion extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            idOpened: null
        }
    }

    render()
    {
        return (
          <OriginalComponent {...this.props} {...this.state} toggle = {this.toggle.bind(this)}/>
        );
    }

    toggle = (id) => () =>
    {
        if(id === this.state.idOpened) id = null;

        this.setState({
            idOpened: id
        });
    }
}