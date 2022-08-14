import React, { Component } from 'react';
import FooterSecondaryScreenColor from './footerSecondaryScreenColor';
import FooterSecondaryScreenNoColor from './footerSecondaryScreenNoColor';
const grafanaConnector = require('./connectors/grafana/connector-grafana.js');

export default class IframesColor extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={this.props.className}>
                    <iframe src={grafanaConnector.composeIFrameURL(this.props.dashboardUid, this.props.products, this.props.competitors, this.props.startDate, this.props.endDate, this.props.id)} width="100%" height="100%" frameborder="0"></iframe>
                    <div className="flexBoxFilterSecondaryMultiple">    
                        <FooterSecondaryScreenColor competitor={this.props.competitors}/>
                    </div>
            </div>
                    
            )
    }
}