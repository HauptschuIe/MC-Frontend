import React, { Component } from 'react';


var positionLookup = {
    "Locations": require('./images/Distribution/standorte_final.png').default,
    "Onlineshop": require('./images/Distribution/onlineshop_final.png').default,
    "Financial Key Figures": require('./images/Finanzen/finanzen_final.png').default,
    "Newsletter": require('./images/Kommunikation/newsletter_final.png').default,
    "Twitter": require('./images/Kommunikation/twitter_final.png').default,
    "YouTube": require('./images/Kommunikation/youtube_final.png').default,
    "Availability & Deals": require('./images/Produkt/deals_final.png').default,
    "Shopping Cart": require('./images/Produkt/warenkorb_final.png').default,
    "Customer Ratings": require('./images/Sonstiges/customerrating_final.png').default,
    "Employee Ratings": require('./images/Sonstiges/employeerating_final.png').default,
    "User Demographics": require('./images/Sonstiges/demographics_final.png').default,
}

export default class TileDimension extends Component {
    render() {
        console.log(this.props)
        return (
            
            <button className={this.props.panelActive ? 'btn': 'btn btnClosed'} onClick={() => this.props.onClick()}><img className='imageVisualisation' src={positionLookup[this.props.value]}/><span>{this.props.value}</span></button>
        )
    }
}