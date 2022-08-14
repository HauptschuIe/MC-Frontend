import React, { Component } from 'react';
import { useEffect, useState } from "react";
import { ItemTypes } from './tile-visualisation.js'
import { useDrop } from 'react-dnd'
import { useDrag } from 'react-dnd'

var internalPanelId = 0;

var positionLookup = {
    "LH-TL": "topleft", "LH-TR": "topmidleft", "LH-BL": "bottomleft",
    "LH-BR": "bottommidleft", "RH-TL": "topmidright", "RH-TR": "topright", "RH-BL": "bottommidright", "RH-BR": "bottomright"
}

export function TileScreen({ position, browserWindowId}) {
    const [visualisations, setVisualizations] = useState([]);
    // *********DROP OF NEW VISUALIZATION TO BE ADDED TO SCREEN*********
    const [{ isOver, canDrop, getItem }, drop] = useDrop(
        () => ({
            accept: ItemTypes.VISUALIZATION,
            drop: (item) => onDrop({ internalId: ++internalPanelId, dashboardUid: item.panel.dashboardUid, id: item.panel.id, title: item.panel.description},browserWindowId, visualisations, setVisualizations),
            canDrop: () => canDropVis(visualisations),
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            })
        }),[visualisations, setVisualizations, browserWindowId]
    )

    if (browserWindowId == null) {
        return <p className='screenDisabled'>Screen Disabled</p>
    }

    return (
        <div ref={drop} className={positionLookup[position]}>
            {visualisations.map((vis, idx, { length }) => {
                console.log("Rendered with length: " + visualisations.length);
                //TOFIX: layout of TileVisualisationOnScreenPreview is ugly
                return <TileVisualisationOnScreenPreview visualization={vis} browserWindowId={browserWindowId} visualisations={visualisations} setVisualizations={setVisualizations} />
            })}
        </div>
    );
}

function TileVisualisationOnScreenPreview({ visualization, browserWindowId, visualisations, setVisualizations }) {

    // *********DRAG OF VISUALIZATION TO TRASHCAN*********
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.VISUALIZATIONONSCREEN,
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: (item, monitor) => { if (monitor.didDrop()) { onRemove(visualization, browserWindowId, visualisations, setVisualizations) } },
        item: { visualization },
    }), [visualization, browserWindowId, visualisations, setVisualizations])

    return (
        <div className='tileonscreen'
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
        ><p className='tileonscreencontent'>{visualization.title}</p></div>
    );
}

function canDropVis(visualizations) {
    if (visualizations.length < 4) {
        return true;
    } else {
        return false;
    }
}

function onDrop(selectedVisualization, browserWindowId,visualizations, setVisualizations) {
    (async () => {
        const response = await window.api.panelAddSend({ browserWindow: browserWindowId, visualization: selectedVisualization});
        console.log(response);
        //TODO: only push to this.state.visualizations if send to other window was successful
        setVisualizations(arr => [...arr, selectedVisualization]);
    })();
}

function onRemove(selectedVisualization, browserWindowId,visualizations, setVisualizations) {
    (async () => {
        console.log(selectedVisualization);
        const response = await window.api.panelRemoveSend({ browserWindow: browserWindowId, visualizationInternalId: selectedVisualization.internalId });
        console.log(response);
        //TODO: only remove from this.state.visualizations if send to other window was successful
        setVisualizations(arr => arr.filter(item => item.internalId != selectedVisualization.internalId));
    })();
}



/*

export default class TileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // as long as browserWindowId is null, disable the entire component
            visualizations: [],
        };
    }

    // TODO: Drag on Drop instead of onClick; get dragged visualization (provide id and dashboard uid?)
    render() {
        if (this.props.browserWindowId == null) {
            return <p>Screen Disabled</p>
        } else {
            if (this.props.position == "LH-TL") {
                return (
                    <div className='topleft'>
                        <button className="btn" onClick={() => this.onDrop({ internalId: ++internalPanelId, dashboardUid: "pZEwd-s7z", id: "4" })}> + </button>
                        <button className="btn" onClick={() => this.onRemove(this.state.visualizations[0])}> - </button>
                    </div>
                )
            } else if (this.props.position == "LH-TR") {
                return (
                    <div className='topmidleft'>
                        <button className="btn" onClick={() => this.onDrop({ internalId: ++internalPanelId, dashboardUid: "pZEwd-s7z", id: "4" })}> + </button>
                        <button className="btn" onClick={() => this.onRemove(this.state.visualizations[0])}> - </button>
                    </div>
                )
            } else if (this.props.position == "LH-BL") {
                return (
                    <div className='bottomleft'>
                        <button className="btn" onClick={() => this.onDrop({ internalId: ++internalPanelId, dashboardUid: "pZEwd-s7z", id: "4" })}> + </button>
                        <button className="btn" onClick={() => this.onRemove(this.state.visualizations[0])}> - </button>
                    </div>
                )
            } else if (this.props.position == "LH-BR") {
                return (
                    <div className='bottommidleft'>
                        <button className="btn" onClick={() => this.onDrop({ internalId: ++internalPanelId, dashboardUid: "pZEwd-s7z", id: "4" })}> + </button>
                        <button className="btn" onClick={() => this.onRemove(this.state.visualizations[0])}> - </button>
                    </div>
                )
            } else if (this.props.position == "RH-TL") {
                return (
                    <div className='topmidright'>
                        <button className="btn" onClick={() => this.onDrop({ internalId: ++internalPanelId, dashboardUid: "pZEwd-s7z", id: "4" })}> + </button>
                        <button className="btn" onClick={() => this.onRemove(this.state.visualizations[0])}> - </button>
                    </div>
                )
            } else if (this.props.position == "RH-TR") {
                return (
                    <div className='topright'>
                        <button className="btn" onClick={() => this.onDrop({ internalId: ++internalPanelId, dashboardUid: "pZEwd-s7z", id: "4" })}> + </button>
                        <button className="btn" onClick={() => this.onRemove(this.state.visualizations[0])}> - </button>
                    </div>
                )
            } else if (this.props.position == "RH-BL") {
                return (
                    <div className='bottommidright'>
                        <button className="btn" onClick={() => this.onDrop({ internalId: ++internalPanelId, dashboardUid: "pZEwd-s7z", id: "4" })}> + </button>
                        <button className="btn" onClick={() => this.onRemove(this.state.visualizations[0])}> - </button>
                    </div>
                )
            } else if (this.props.position == "RH-BR") {
                return (
                    <div className='bottomright'>
                        <button className="btn" onClick={() => this.onDrop({ internalId: ++internalPanelId, dashboardUid: "pZEwd-s7z", id: "4" })}> + </button>
                        <button className="btn" onClick={() => this.onRemove(this.state.visualizations[0])}> - </button>
                    </div>
                )
            }
        }
    }

    onDrop(selectedVisualization) {
        (async () => {
            const response = await window.api.panelAddSend({ browserWindow: this.props.browserWindowId, visualization: selectedVisualization });
            console.log(response);
            //TODO: only push to this.state.visualizations if send to other window was successful
            var visualizationsNew = this.state.visualizations;
            visualizationsNew.push(selectedVisualization);
            this.setState({ visualizations: visualizationsNew });
        })();
    }

    onRemove(selectedVisualization) {
        (async () => {
            const response = await window.api.panelRemoveSend({ browserWindow: this.props.browserWindowId, visualizationInternalId: selectedVisualization.internalId });
            console.log(response);
            //TODO: only remove from this.state.visualizations if send to other window was successful
            var visualizationsNew = this.state.visualizations;
            var index = -1;
            visualizationsNew.forEach((x, i) => {
                if (x.internalId == selectedVisualization.internalId) {
                    index = i;
                }
            });
            if (index !== -1) {
                visualizationsNew.splice(index, 1);
            }
            this.setState({ visualizations: visualizationsNew });
        })();
    }
}
*/