import React, { Component } from 'react';

export default class ToggleFilterDimension extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div className={this.props.expanded ? 'arrow2 right2': 'arrow2'} ></div>
        )
    }
}