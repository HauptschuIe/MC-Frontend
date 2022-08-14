import React, { Component } from 'react';

export default class HeaderSecondaryScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div><p className='headerSecondaryTitle1'>{this.props.title}</p><p className='headerSecondaryTitle2'>{this.props.folderTitle} / {this.props.folderName}</p></div>
        )
    }
}