import React, { Component } from 'react';
import { useDrag } from 'react-dnd'
/*
export default class TileVisualisation extends Component {
    render() {
        return (
            <div
                ref={drag}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    fontSize: 25,
                    fontWeight: 'bold',
                    cursor: 'move',
                }}
            >
                <button className="btn">{this.props.value}</button>
            </div>
        )
    }


}
*/

var positionLookup = {
    "bargauge": require('./images/Panels/bar_hor_final.png').default,
    "geomap": require('./images/Panels/map_final.png').default,
    "stat": require('./images/Panels/stat_final.png').default,
    "gauge": require('./images/Panels/gauge_final.png').default,
    "barchart": require('./images/Panels/bar_ver_final.png').default,
    "timeseries": require('./images/Panels/line_final.png').default,
    "piechart": require('./images/Panels/pie_final.png').default,
    "magnesium-wordcloud-panel": require('./images/Panels/cloud_final.png').default,
}

export function TileVisualisation({ panel, value,panelActive}) {
    console.log("--123--" + panel.type)
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.VISUALIZATION,
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
        item: { panel },
    }), [panel])

    return (
        <div
            className='draggableDiv'
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                fontSize: 25,
                fontWeight: 'bold',
                cursor: 'move',
            }}
        >
            <button className={panelActive ? 'btn': 'btn btnClosed'}><img className='imageVisualisation' src={positionLookup[panel.type]}/><span>{value}</span></button>
        </div>
    )
}



export const ItemTypes = {
    VISUALIZATION: 'visualization',
    VISUALIZATIONONSCREEN: 'visualizationonscreen'
}