import React, { Component } from 'react';

var positionLookup = {
    "1": "Amazon", "2": "Otto", "3": "Media Markt", "4": "Saturn","5": "Euronics","6": "Expert",
}



export default class FooterSecondaryScreenNoColor extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
                    <div className='flexFilter'>
                        <div className='colorBoxTitle'>{positionLookup[""+this.props.competitor]}</div>
                    </div>
                </div>)
    }
}