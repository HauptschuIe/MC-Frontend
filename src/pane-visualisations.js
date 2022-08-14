import { TileVisualisation } from './tile-visualisation';
import React, { Component } from 'react';

const grafanaConnector = require('./connectors/grafana/connector-grafana.js');

export default class PaneVisualisations extends Component {

    render() {
        const { visualisations } = this.props
        return visualisations.length ? this.renderTileDimensions() : (
            <span>Loading Visualisations...</span>
          )
    }

    renderTileDimensions() {
        return (
            <div className='boardsFlex'>
                {this.props.visualisations.map((d, idx, {length}) => {
                   return <TileVisualisation panel={d} value={d.title}/>
                })}
            </div>
            
        )
    }

}