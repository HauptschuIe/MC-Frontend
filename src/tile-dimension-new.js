import React, { Component } from 'react';
import TileDimension from './tile-dimension';
import TileDimensionBack from './tile-dimension-backbutton';
import ToggleFilterDimension from './toggleFilterDimension';
import { TileVisualisation }from './tile-visualisation';

const grafanaConnector = require('./connectors/grafana/connector-grafana.js');

export default class TileDimensionNew extends Component {

    constructor(props) {
        super(props);
        this.state = {
            panelName:this.props.value,
            expanded:false,
            folderUID:this.props.dashboards,
            fodlerNAME:this.props.value,
            tileDimensions: [],
            selectedTileDimension: null,
        };
    }

    toggleClass() {
        const currentState = this.state.expanded;
        this.setState({ expanded: !currentState });
        if (this.state.expanded ==false){
            this.props.onTogglePanel(this.state.panelName);
        }else{
            this.props.onTogglePanel("");
        }
    };

    
    render() {
        return (
            <section className={this.props.panelActive ? 'containerExpandable': 'containerExpandable panelClosedContainer'}>
                <div class="one" onClick={() => this.toggleClass()}><img className='image' src={this.props.image}></img>{this.props.value}<div class="wrapper">
                    <ToggleFilterDimension expanded={this.state.expanded}/>
                </div></div>
                <div className={this.props.panelActive ? 'two': 'two panelClosed'}>
                    {this.state.tileDimensions.map((d, idx, {length}) => {
                        if(this.state.selectedTileDimension === "Dimension"){
                            return (<React.Fragment>
                                        <TileDimension panelActive={this.props.panelActive} value={d.title} onClick={() => this.handleClickDim(d.uid)}/>
                                    </React.Fragment>)
                        }else if(this.state.selectedTileDimension === "Visualisation" && length - 1 != idx){
                            console.log("kalsdasd")
                            return <TileVisualisation panelActive={this.props.panelActive} panel={d} value={d.description}/>
                        }else if(this.state.selectedTileDimension === "Visualisation" && length - 1 === idx){
                            return (<React.Fragment>
                                        <TileVisualisation panelActive={this.props.panelActive} panel={d} value={d.description} draggable="true"/>
                                        <TileDimensionBack panelActive={this.props.panelActive} onClick={() => this.handleBackClick()}/>
                                    </React.Fragment>)
                        }
                    })} 
                </div>
            </section>
        )
    }

    handleBackClick() {
        this.state.selectedTileDimension === "Dimension" ?  this.state.selectedTileDimension = "Visualisation" : this.state.selectedTileDimension = "Dimension"
        grafanaConnector.getGrafanaDashboards(this.props.dashboards)
          .then(res => this.setState({ tileDimensions: res }) )
    }

    handleClickDim(name) {
        this.state.selectedTileDimension === "Dimension" ?  this.state.selectedTileDimension = "Visualisation" : this.state.selectedTileDimension = "Dimension"
        this.state.selectedTileName = name;
        grafanaConnector.getGrafanaPanels(name)
          .then(res =>  this.setState({ tileDimensions: res }) )
    }

    componentDidMount() {
        this.state.selectedTileDimension = "Dimension";
        grafanaConnector.getGrafanaDashboards(this.props.dashboards)
          .then(res => this.setState({ tileDimensions: res }) )
      }

    componentDidUpdate(prevProps) {
        if (this.props.panelActive !== prevProps.panelActive) {
            this.setState({ expanded: this.props.panelActive });
          }
        
      }
}