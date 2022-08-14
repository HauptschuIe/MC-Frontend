import React, { Component } from 'react';

export default class TileDimensionBack extends Component {
    render() {
        return (
            <button className={this.props.panelActive ? 'btn': 'btn btnClosed'} onClick={() => this.props.onClick()}> <img className='imageVisualisation' src={require('./images/Back.png').default}></img>Back </button>
        )
    }
    
}