import TileDimension from './tile-dimension';
import TileDimensionBack from './tile-dimension-backbutton';
import React, { Component } from 'react';

const grafanaConnector = require('./connectors/grafana/connector-grafana.js');

export default class PaneDimensions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTileDimension: null,
            selectedTileName:null,
            tileDimensions: [],
        };
    }

    render() {
        const { tileDimensions } = this.state
        return tileDimensions.length ? this.renderTileDimensions() : (
            <span>Loading Dimensions...</span>
          )
    }

    renderTileDimensions() {
        return (
            <div className='boardsFlex'>
            {this.state.tileDimensions.map((d, idx, {length}) => {
                if(this.state.selectedTileDimension === "Dimension A"){
                    return <TileDimension value={d.title} onClick={() => this.handleClickDimA(d.uid,this.state.selectedTileDimension)}/>
                }else if(this.state.selectedTileDimension === "Dimension B" && length - 1 != idx){
                    return <TileDimension value={d.title} onClick={() => this.handleClickDimB(d.uid)}/>
                }else if (this.state.selectedTileDimension === "Dimension B" && length - 1 === idx){
                    return (<React.Fragment>
                        <TileDimension value={d.title} onClick={() => this.handleClickDimB(d.uid)}/>
                            <TileDimensionBack onClick={() => this.handleBackClick()}/>
                            </React.Fragment>)
                }
            })}
            </div>
        )
    }

    handleBackClick() {
        this.state.selectedTileDimension === "Dimension A" ?  this.state.selectedTileDimension = "Dimension B" : this.state.selectedTileDimension = "Dimension A"
        grafanaConnector.getGrafanaFolders().then(res => this.setState({ tileDimensions: res }) )
        this.props.onVisualisationChange('')
    }

    handleClickDimA(name,dimension) {
        dimension === "Dimension A" ?  this.state.selectedTileDimension = "Dimension B" : this.state.selectedTileDimension = "Dimension A"
        grafanaConnector.getGrafanaDashboards(name)
          .then(res => this.setState({ tileDimensions: res }) )
        this.state.selectedTileName = name;
    }

    handleClickDimB(name) {
        this.state.selectedTileName = name;
        grafanaConnector.getGrafanaPanels(name)
          .then(res => this.props.onVisualisationChange(res) )
    }

    componentDidMount() {
        this.state.selectedTileDimension = "Dimension A";
        this.props.fetchTileDimensions()
          .then(res => this.setState({ tileDimensions: res }) )
      }
}