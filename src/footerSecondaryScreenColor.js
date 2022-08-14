import React, { Component } from 'react';

var positionLookup = {
    "1": "Amazon", "2": "Otto", "3": "Media Markt", "4": "Saturn","5": "Euronics","6": "Expert",
}

var positionLookupColor = {
    "1": "colorBox amazon", "2": "colorBox otto", "3": "colorBox mm", "4": "colorBox saturn","5": "colorBox euronics","6": "colorBox expert",
}


export default class FooterSecondaryScreenColor extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
                    <div className='flexFilter'>
                        <div className={positionLookupColor[""+this.props.competitor]}></div>
                        <div className='colorBoxTitle'>{positionLookup[""+this.props.competitor]}</div>
                    </div>
                </div>)
    }
}