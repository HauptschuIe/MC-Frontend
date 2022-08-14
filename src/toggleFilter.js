import React, { Component } from 'react';

export default class ToggleFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: true,
        };
    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState }, () => {
            this.props.toggle(this.state.active);
          }); 
    };
    
    render() {
        return (
                <div className={this.state.active ? 'arrow': 'arrow right'} onClick={() => this.toggleClass(this.state.active)}></div>
        )
    }

    componentDidUpdate(prevProps) {
        if (this.props.togglePanel !== prevProps.togglePanel) {
            if (this.props.togglePanel){
                this.setState({ active: false }, () => {
                    this.props.toggle(this.state.active);
                }); 
            }
          }
      }
}

