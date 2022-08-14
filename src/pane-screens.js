import React, { Component } from 'react';
import { TileScreen } from './tile-screen';
import { getDisplayPositionsFromConfig } from './helper-classes/screen-config-reader'
import { Trashcan } from './trashcan';

export default class PaneScreens extends Component {
    constructor(props) {
        super(props);
        this.state = {
            analysisBrowserWindows: [],
            tileScreens: [],
        };
    }

    render() {
        const { analysisBrowserWindows } = this.state
        return analysisBrowserWindows.length ? this.renderTileScreens() : (
            <span>Loading Screens...</span>
        )
    }

    renderTileScreens() {
        return (
            <div className='containerMonitore'>
                <Trashcan />
                {getDisplayPositionsFromConfig().map((p, idx, { length }) => {
                    {
                        let browWinIdTemp = null
                        this.state.analysisBrowserWindows.map((d, idx, { length }) => {
                            if (d.displayPosition === p) {
                                browWinIdTemp = d.browserWindowId
                            }
                        })
                        return <TileScreen position={p} browserWindowId={browWinIdTemp} />
                    }
                })}
            </div>
        )
    }

    componentDidMount() {
        (async () => {
            this.setState({ analysisBrowserWindows: await window.api.getAnalysisBrowserWindows() });
            console.log(this.state.analysisBrowserWindows);
            console.log(await window.api.getIdDisplays());
        })();
    }
}