import React, { Component } from 'react';
import TileFilter from './tile-filter';


export default class PaneFilterCompetitor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //TODO: Select Competitors From Database
            hardCodedCompetitorTitles: ["Amazon","Otto","MediaMarkt","Saturn","Euronics","Expert"],
            hardCodedCompetitors: ["1","2","3","4","5","6"],
            hardCodedImages: [require('./images/amazon_gradient_800_445.png').default,
            require('./images/otto_gradient_800_445.png').default,
            require('./images/media_markt_gradient_800_445.png').default,
            require('./images/saturn_gradient_800_445.png').default,
            require('./images/euronics_gradient_800_445.png').default,
            require('./images/expert_gradient_800_445.png').default
            ],
        };
    }

    render() {
        const { hardCodedCompetitors } = this.state
        return hardCodedCompetitors.length ? this.renderTileFilter() : (
            <span>Loading Filter...</span>
          )
    }

    renderTileFilter() {
        
        return (
            <div className={this.props.toggle ? 'boardsFlexCompetitor': 'boardsFlexCompetitor boardsFlexTimeClosed'}>
                {this.state.hardCodedCompetitors.map((d, idx, {length}) => {
                    return <TileFilter onClick={() => this.updateCompetitorArray(d)} value={this.state.hardCodedCompetitorTitles[idx]} image={this.state.hardCodedImages[idx]}/>
                })}
            </div>
            
        )
    }

    updateCompetitorArray(competitor){
        this.props.onCompetitorChange(competitor);
    }

}


           