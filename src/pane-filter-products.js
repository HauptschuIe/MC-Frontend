import React, { Component } from 'react';
import TileFilter from './tile-filter';


export default class PaneFilterProducts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //TODO: Select Competitors From Database
            hardCodedProductTitles: ["XBOX S","Iphone 12","GalaxyS21","Xiaomi 11T","Fritzbox","MarioKart","SoStream","Switch","TP-Link","Fitbit V3","Fitbit V2","Apple W3"],
            hardCodedProducts: ["2","3","4","5","6","7","8","10","11","12","13","14"],
            hardCodedImages: [require('./images/xbox.png').default,
            require('./images/iphone.png').default,
            require('./images/samsung.png').default,
            require('./images/xiaomi.png').default,
            require('./images/fritzbox.png').default,
            require('./images/mariokart.png').default,
            require('./images/sodastream.png').default,
            require('./images/switch.png').default,
            require('./images/router.png').default,
            require('./images/smartwatch1.png').default,
            require('./images/smartwatch2.png').default,
            require('./images/smartwatch3.png').default],
        };
    }

    render() {
        const { hardCodedProducts } = this.state
        return hardCodedProducts.length ? this.renderTileFilter() : (
            <span>Loading Filter...</span>
          )
    }

    renderTileFilter() {
        
        return (
            <div className={this.props.toggle ? 'boardsFlexProducts': 'boardsFlexProducts boardsFlexTimeClosed'}>
                {this.state.hardCodedProducts.map((d, idx, {length}) => {
                   return <TileFilter onClick={() => this.updateProductsArray(d)} value={this.state.hardCodedProductTitles[idx]} image={this.state.hardCodedImages[idx]}/>
                })}
            </div>
            
        )
    }

    updateProductsArray(products){
        this.props.onProductsChange(products);
    }

}


           