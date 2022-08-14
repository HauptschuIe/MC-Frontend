import React, { Component } from 'react';

export default class TileFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };

    render() {
        return (
            <figure className={this.state.active ? 'active': null}  onClick={() => {this.props.onClick(); this.toggleClass();}}>
                  <div>
                      <span><img id="iconexpert" src={this.props.image}></img></span>
                      <span>{this.props.value}</span>
                  </div>
            </figure>
        )
    }
}