import TileDimensionNew from './tile-dimension-new';
import TileDimensionBack from './tile-dimension-backbutton';
import React, { Component } from 'react';

const grafanaConnector = require('./connectors/grafana/connector-grafana.js');

export default class PaneDimensionsNew extends Component {
    
    constructor(props) {
        super(props);
        this.handletogglePanel = this.handletogglePanel.bind(this);
        this.state = {
            selectedTileDimension: null,
            selectedTileName:null,
            panelNameActive:"",
            tileDimensions: [],
            hardCodedImages: [require('./images/Distribution/distribution_final.png').default,
            require('./images/Finanzen/finanzkennzahlen_final.png').default,
            require('./images/Kommunikation/kommunikation_final.png').default,
            require('./images/Produkt/produkt_final.png').default,
            require('./images/Sonstiges/sonstiges_final.png').default,]
        };
    }

    handletogglePanel(panelName) {
        this.setState({panelNameActive: panelName});
        this.props.togglePanel(panelName);
      }

    render() {
        const { tileDimensions } = this.state
        return tileDimensions.length ? this.renderTileDimensions() : (
            <span>Loading Dimensions...</span>
          )
    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
        this.props.toggle(this.state.active);
    };

    renderTileDimensions() {
        const panelActive = this.state.panelNameActive;
        console.log(this.state.tileDimensions);
        return (
            <div class="boardsAreaContent">
                {this.state.tileDimensions.map((d, idx, {length}) => {
                    if (panelActive == d.title) {
                        return <TileDimensionNew onTogglePanel={this.handletogglePanel} panelActive={true} dashboards={d.uid} value={d.title} image={this.state.hardCodedImages[idx]} />
                    }else{
                        return <TileDimensionNew onTogglePanel={this.handletogglePanel} panelActive={false} dashboards={d.uid} value={d.title} image={this.state.hardCodedImages[idx]} />
                    }
                })}
            </div>
            
            
        )
    }
    
    componentDidMount() {
        this.state.selectedTileDimension = "Dimension A";
        this.props.fetchTileDimensions()
          .then(res => this.setState({ tileDimensions: res }) )
      }
    
      componentDidUpdate(prevProps) {
        if (this.props.toggleFilter !== prevProps.toggleFilter) {
            if (this.props.toggleFilter == true){
                this.setState({ panelNameActive: "" }, () => {
                    console.log(this.state.panelNameActive);
                }); 
            }
          }
      }
}