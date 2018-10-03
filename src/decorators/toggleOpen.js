import React, {Component} from 'react'

export default (OriginComponents) => class wrappedComponents extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            isOpen: false
        }
    }


    toggle = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    render()
    {
        return (
            <OriginComponents {...this.props} {...this.state} toggle = {this.toggle}/>
        )
    }
}