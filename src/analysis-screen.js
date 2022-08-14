import React, { Component } from "react";
import Iframes from './analyseScreenIframes';
import IframesColor from './analyseScreenIframes';
import HeaderSecondaryScreen from './headerSecondaryScreen';
import FooterSecondaryScreenColor from './footerSecondaryScreenColor';
import FooterSecondaryScreenNoColor from './footerSecondaryScreenNoColor';

const grafanaConnector = require('./connectors/grafana/connector-grafana.js');

var positionLookup = {
    "1": "oneIframe", "2": "twoIframe", "3": "threeIframe", "4": "fourIframe","5": "fiveIframe","6": "sixIframe",
}

var counter = 0;

export default class AnalysisScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            folderName:"",
            folderTitle:"",
            visualizations: [],
            filters: {competitors: [], products: [], startDate: "", endDate: ""}
        };
    }

    

    render() {
        counter = 0;
        if(this.state.visualizations.length==0){
            return <div className="containerSecondary"><img class="logoSecondary" src={require('./images/LogoFinNoBack.png').default}></img></div>    
        }else{
            if(this.state.visualizations[0].dashboardUid=="mpM1a5U7z" && (this.state.visualizations[0].id == "2" || this.state.visualizations[0].id == "4")){
            return(
                <div className='screenPanels'>
                    <div id="div-panels">
                        <div className="headerSecondaryScreen">
                            <HeaderSecondaryScreen title={this.state.visualizations[0].title} folderName={this.state.folderName} folderTitle={this.state.folderTitle}/>
                        </div>
                        <div className="flexBoxIframes">
                            {this.state.filters.competitors.map((d, idx, { length }) => {
                                counter = length;
                                if (this.state.filters.competitors.indexOf("1") > -1){
                                    counter = counter - 1;
                                }
                                if (this.state.filters.competitors.indexOf("2") > -1){
                                    counter = counter - 1;
                                }
                                if(d === "3" || d === "4" || d === "5" || d === "6" ){
                                    return (<Iframes className={positionLookup[""+counter]} dashboardUid={this.state.visualizations[0].dashboardUid} products={this.state.filters.products} competitors={d} startDate={this.state.filters.startDate} endDate={this.state.filters.endDate} id={this.state.visualizations[0].id}/>)
                                }   
                            })}
                        </div>
                    </div>
                </div>
            )
        } else if ((this.state.visualizations[0].dashboardUid=="x1s0acUnk" && (this.state.visualizations[0].id == "8")) ||
                    (this.state.visualizations[0].dashboardUid=="LMLh-c8nk" && (this.state.visualizations[0].id == "16" || this.state.visualizations[0].id == "18" || this.state.visualizations[0].id == "20" || this.state.visualizations[0].id == "22" || this.state.visualizations[0].id == "24" || this.state.visualizations[0].id == "26")) ||
                    (this.state.visualizations[0].dashboardUid=="vBl4Ud37k" && (this.state.visualizations[0].id == "2" || this.state.visualizations[0].id == "4")) ||
                    (this.state.visualizations[0].dashboardUid=="R_Ix-cU7z" && (this.state.visualizations[0].id == "8" || this.state.visualizations[0].id == "12")) ||
                    (this.state.visualizations[0].dashboardUid=="oEgILuCnk" && (this.state.visualizations[0].id == "2" || this.state.visualizations[0].id == "4")) ||
                    (this.state.visualizations[0].dashboardUid=="zbR4oGjnk" && (this.state.visualizations[0].id == "4" || this.state.visualizations[0].id == "6")) ||
                    (this.state.visualizations[0].dashboardUid=="Y-c--58nz" && (this.state.visualizations[0].id != "2"))) {
                        return(
                            <div className='screenPanels'>
                                <div id="div-panels">
                                <div className="headerSecondaryScreen">
                                    <HeaderSecondaryScreen title={this.state.visualizations[0].title} folderName={this.state.folderName} folderTitle={this.state.folderTitle}/>
                                </div>
                                    <div className="flexBoxIframes">
                                        {this.state.filters.competitors.map((d, idx, { length }) => {
                                            console.log(length);
                                            counter = length;
                                            console.log(counter);
                                                return <Iframes className={positionLookup[""+counter]} dashboardUid={this.state.visualizations[0].dashboardUid} products={this.state.filters.products} competitors={d} startDate={this.state.filters.startDate} endDate={this.state.filters.endDate} id={this.state.visualizations[0].id}/>  
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
        }else if ((this.state.visualizations[0].dashboardUid=="5u7ta5U7k" && (this.state.visualizations[0].id == "2"))) {
                            return(
                                <div className='screenPanels'>
                                    <div id="div-panels">
                                        <div className="locationRelative">
                                            <HeaderSecondaryScreen title={this.state.visualizations[0].title} folderName={this.state.folderName} folderTitle={this.state.folderTitle}/>
                                        </div>
                                        <div className="containerIframe">
                                        <div className="containerIframe2">
                                        {this.state.visualizations.map((d, idx, { length }) => {
                                            return <iframe id="map" src={grafanaConnector.composeIFrameURL(d.dashboardUid, this.state.filters.products, this.state.filters.competitors, this.state.filters.startDate, this.state.filters.endDate, d.id)} width="100%" height="90%" frameborder="0"></iframe>
                                        })}
                                        </div>
                                        </div>
                                        <div className="locationRelativeFooter">
                                            {this.state.filters.competitors.map((d, idx, { length }) => {
                                                return (<FooterSecondaryScreenColor competitor={d}/>)
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
            }else{
                return (
                    <div className='screenPanels'>
                        <div id="div-panels">
                            <div className="headerSecondaryScreen">
                                <HeaderSecondaryScreen title={this.state.visualizations[0].title} folderName={this.state.folderName} folderTitle={this.state.folderTitle}/>
                            </div>
                            <div className="containerIframe">
                            <div className="containerIframe2">
                            {this.state.visualizations.map((d, idx, { length }) => {
                                return <iframe id="singleFrame" src={grafanaConnector.composeIFrameURL(d.dashboardUid, this.state.filters.products, this.state.filters.competitors, this.state.filters.startDate, this.state.filters.endDate, d.id)} width="100%" height="90%" frameborder="0"></iframe>
                            })}
                            </div>
                            </div>
                            <div className="flexBoxFilterSecondary">
                                {this.state.filters.competitors.map((d, idx, { length }) => {
                                    return (<FooterSecondaryScreenColor competitor={d}/>)
                                })}
                            </div>
                        </div>
                    </div>
                    
                )
            }
        }
    }

    componentDidMount() {
        window.api.on('panelAddToWindow', (event, data) => {
            console.log(data)
            // TODO: check if data.browserWindow is the browser window where component is mounted (otherwise it will be added to all screens)
            grafanaConnector.getGrafanaPanelById(data.visualization.dashboardUid, data.visualization.id)
                .then(res => {
                    let panelsNew = this.state.visualizations;
                    panelsNew.push({title:res.description, internalId: data.visualization.internalId, dashboardUid: data.visualization.dashboardUid, id: data.visualization.id,competitors:data.visualization.competitors,products:data.visualization.products ,startDate:data.visualization.startDate,endDate:data.visualization.endDate });
                    //TODO: fetch iFrame url from res object (is a grafanaPanel object) and pass to Panel in render method
                    this.setState({ visualizations: panelsNew });
                    console.log(data);
                    console.log(res);
                    this.setState({ folderTitle: res.folderTitle });
                    
                    console.log("visualizations length after fetch :" + this.state.visualizations.length);
                    grafanaConnector.getGrafanaFolderByDashboardUid(data.visualization.dashboardUid)
                        .then(res => {
                            this.setState({ folderName: res });
                        })
                })
        });

        window.api.on('panelRemoveFromWindow', (event, data) => {
            console.log(data)
            // TODO: check if data.browserWindow is the browser window where component is mounted (otherwise it will be removed from all screens)
            var visualizationsNew = this.state.visualizations;
            var index = -1;
            visualizationsNew.forEach((x, i) => {
                if (x.internalId == data.visualizationInternalId) {
                    index = i;
                }
            });
            if (index !== -1) {
                visualizationsNew.splice(index, 1);
            }
            this.setState({ visualizations: visualizationsNew });
            console.log("visualizations length after fetch :" + this.state.visualizations.length);
        });

        window.api.on('updatedFilterBroadcast', (event, data) => {
            this.setState({ filters: data });
        });

        // to initially set filters on analysis screen
        (async () => {
            await window.api.filterRequest();
        })();
    }
}