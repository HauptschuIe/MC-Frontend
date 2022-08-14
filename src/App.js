import './App.css';
import PaneDimensions from './pane-dimensions';
import PaneScreens from './pane-screens';
import PaneVisualisations from './pane-visualisations';
import PaneFilterCompetitor from './pane-filter-competitor';
import PaneFilterProducts from './pane-filter-products';
import ToggleFilter from './toggleFilter';
import PaneDimensionsNew from './pane-dimensions-new'
import React, { Component } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { PaneDatepicker } from './pane-filter-date-picker';
import moment from 'moment';

const grafanaConnector = require('./connectors/grafana/connector-grafana.js');

export default class App extends Component {

  constructor(props) {
    super(props);
    this.handletoggleFilter = this.handletoggleFilter.bind(this);
    this.handletogglePanels = this.handletogglePanels.bind(this);
    this.handleChangeVisualisation = this.handleChangeVisualisation.bind(this);
    this.handleChangeCompetitor = this.handleChangeCompetitor.bind(this);
    this.handleChangeProducts = this.handleChangeProducts.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleChangeQ1 = this.handleChangeQ1.bind(this);
    this.handleChangeQ2 = this.handleChangeQ2.bind(this);
    this.handleChangeLastWeek = this.handleChangeLastWeek.bind(this);
    this.handleChangeLastMonth = this.handleChangeLastMonth.bind(this);
    this.state = {
      //Stores visualisations 
      paneVisualisations: [],
      //Stores Filter value
      startDateFilter: moment(new Date("2022/01/01")).valueOf(),
      endDateFilter: moment(new Date()).valueOf(),
      competitors: [],
      products: [],
      toggleFilter:true,
      togglePanels:false,
    };
  }

  handleChangeVisualisation(paneVisualisation) {
    this.setState({paneVisualisations: paneVisualisation});
  }

  handleChangeCompetitor(filterCompetitors) {
      this.setState(state  => {
            const competitors = state.competitors.includes(filterCompetitors)
              ? state.competitors.filter(i => i !== filterCompetitors)//remove items
              : [ ...state.competitors, filterCompetitors ]; // add item
          return {
            competitors,
          };
      // use callback of set state to wait until state has been set before executing broadcastFilterUpdate
    }, this.broadcastFilterUpdate),console.log(this.state.competitors);
  }

  handleChangeProducts(filterProducts) {
      this.setState(state  => {
        const products = state.products.includes(filterProducts)
          ? state.products.filter(i => i !== filterProducts)//remove items
          : [ ...state.products, filterProducts ]; // add item
      return {
        products,
      };
    }, this.broadcastFilterUpdate),console.log(this.state.products);
  }

  handleChangeStartDate(filterDateStart) {
    this.setState({startDateFilter: filterDateStart}, this.broadcastFilterUpdate);
  }

  handleChangeEndDate(filterDateEnd) {
    this.setState({endDateFilter: filterDateEnd}, this.broadcastFilterUpdate);
  }

  handleChangeQ1() {
   this.handleChangeEndDate(moment(new Date("2022/03/31")).valueOf());
   this.handleChangeStartDate(moment(new Date("2022/01/01")).valueOf());
  }

  handleChangeQ2() {
    this.handleChangeEndDate(moment(new Date("2022/06/30")).valueOf());
    this.handleChangeStartDate(moment(new Date("2022/04/01")).valueOf());
   }

   handleChangeLastWeek() {
    this.handleChangeStartDate(moment().subtract(7,'d').toDate().valueOf());
    this.handleChangeEndDate(moment(new Date()).valueOf());
   }

   handleChangeLastMonth() {
    this.handleChangeStartDate(moment().subtract(31,'d').toDate().valueOf());
    this.handleChangeEndDate(moment(new Date()).valueOf());
   }

  broadcastFilterUpdate() {
    let filters = { products: this.state.products, competitors: this.state.competitors, startDate: this.state.startDateFilter, endDate: this.state.endDateFilter};
    (async () => {
      const response = await window.api.filtersUpdated(filters);
      console.log(response);
    })();}

  handletoggleFilter(filterStatus) {
    this.setState({toggleFilter: filterStatus});
    if(filterStatus==true){
      this.setState({togglePanels: false});
    }
  }

  handletogglePanels(panelStatus) {
    
    if(panelStatus==""){
      this.setState({togglePanels: false});
    }else{
      this.setState({togglePanels: true});
    }
    
  }

  render() {
    const paneVisualisation = this.state.paneVisualisations;
    const startDate = this.state.startDateFilter;
    const endDate = this.state.endDateFilter;
    const competitors = this.state.competitors;
    const products = this.state.products;
    const toggleFilter = this.state.toggleFilter;
    const togglePanels = this.state.togglePanels;
  return (
    <div class='container'>
      <DndProvider backend={HTML5Backend}>
        <div class="headerArea">
          <div class="containerHeader">
            <div class="icon-area"><img class="logo" src={require('./images/LogoFinNoBack.png').default}></img></div>
            <div class="close-area">
                <div id="close-btn" class="close-container">
                  <div class="leftright"></div>
                  <div class="rightleft"></div>
                  <label class="close">close</label>
                </div>
            </div>
          </div>
        </div>
        <div class="toggleArea">
          <div class="containerArrow">
            <ToggleFilter togglePanel={togglePanels} toggle={this.handletoggleFilter}/>
          </div>
        </div>
        <div class="boardsArea">
            <PaneDimensionsNew toggleFilter={toggleFilter} togglePanel={this.handletogglePanels} fetchTileDimensions={() => grafanaConnector.getGrafanaFolders()}/>
        </div>
        <div class="monitorsArea">
          <div class="monitorsAreaContent">
            <PaneScreens startDate={startDate} endDate={endDate} competitors={competitors} products={products} />
          </div>
        </div>
        <div className={toggleFilter ? 'filterArea': 'filterarea sidebarClose'}>
          <div class="filterAreaContent">
            <div class="header">Zeitauswahl</div>
            <div className={toggleFilter ? 'boardsFlexTime': 'boardsFlexTime boardsFlexTimeClosed'}>
            <div class="wrapper">
                  <a class="button buttonTime" onClick={() => this.handleChangeQ1()}> Q1
                  </a>
                </div>
                <div class="wrapper">
                  <a class="button buttonTime" onClick={() => this.handleChangeQ2()}> Q2
                  </a>
                </div>
                <div class="wrapper">
                  <a class="button buttonTime" onClick={() => this.handleChangeLastWeek()}> Last Week
                  </a>
                </div>
                <div class="wrapper">
                  <a class="button buttonTime" onClick={() => this.handleChangeLastMonth()}> Last Month
                  </a>
                </div>
                
            </div>
            <PaneDatepicker toggle={toggleFilter} onStartDateChange={this.handleChangeStartDate} onEndDateChange={this.handleChangeEndDate} startDate={startDate} endDate={endDate}/>
            <div class="header">Wettbewerber</div>
            <PaneFilterCompetitor toggle={toggleFilter} onCompetitorChange={this.handleChangeCompetitor} />
            <div class="header">Produkte</div>
            <PaneFilterProducts toggle={toggleFilter} onProductsChange={this.handleChangeProducts}/>
          </div>
            
        </div>
      </DndProvider>
    </div>
  );
}
componentDidMount() {
  window.api.on('triggerFilterBroadcast', (event, arg) => {
    this.broadcastFilterUpdate()
  });

  document.getElementById("close-btn").addEventListener("click", function (e) {
    console.log("Triggered Close");
    window.api.close();
  });
}
}
