import credentials from '../../credentials/grafana-credentials.json';
const axios = require('axios');
const { GrafanaFolder } = require('../../helper-classes/grafana-folder.js');
const { GrafanaDashboard } = require('../../helper-classes/grafana-dashboard.js');
const { GrafanaPanel } = require('../../helper-classes/grafana-panel.js');

async function callGrafanaGET(uri) {
    const res = await axios.get(credentials.url + uri, {
        auth: {
            username: credentials.username,
            password: credentials.password
        }
    }).catch(function (error) {
        if (error.response) {
            // Request made and server responded
            throw "Exception while contacting Grafana server. Server responded with response: \n" +
            error.response.status + " - " + error.response.data + " - " + error.response.headers;
        } else if (error.request) {
            // The request was made but no response was received
            throw "Exception while contacting Grafana server. No response received.";
        } else {
            // Something happened in setting up the request that triggered an Error
            throw "Exception while setting up request to Grafana server: " + error.message;
        }
    });

    if (res.status == 200) {
        return res
    }
    else {
        throw "Exception while contacting Grafana server. Server responded with code " + res.status
    }
}

// returns an array of objects of type GrafanaFolder
export async function getGrafanaFolders() {
    var folders = [];
    const res = await callGrafanaGET('/api/search?folderIds');

    if (typeof res.data !== "undefined") {
        for (var i = 0; i < res.data.length; i++) {
            const obj = res.data[i];
            if (obj.type == "dash-folder") {
                console.log("-----------" + obj.uid + obj.title);
                var grafanaFolder = new GrafanaFolder(obj.uid, obj.title);
                folders.push(grafanaFolder);
            }
        }
    }

    return folders;
}

// returns an array of objects of type GrafanaDashboard
export async function getGrafanaDashboards(folderUid) {
    var dashboards = [];
    const res = await callGrafanaGET('/api/search?folderIds');

    if (typeof res.data !== "undefined") {
        for (var i = 0; i < res.data.length; i++) {
            const obj = res.data[i];
            if (obj.type == "dash-db" && obj.folderUid == folderUid) {
                console.log("-----------" + obj.uid + obj.title);
                var grafanaDashboard = new GrafanaDashboard(obj.uid, obj.title);
                dashboards.push(grafanaDashboard);
            }
        }
    }

    return dashboards;
}

// returns an array of objects of type GrafanaPanel
export async function getGrafanaPanels(dashboardUid) {
    var panels = [];
    const res = await callGrafanaGET('/api/dashboards/uid/' + dashboardUid);

    if (typeof res.data !== "undefined" && res.data.dashboard !== "undefined" && res.data.dashboard.panels !== "undefined") {
        for (var i = 0; i < res.data.dashboard.panels.length; i++) {
            const obj = res.data.dashboard.panels[i];
            console.log("-----------" + obj.id + obj.title + obj.type + obj.description + res.data.dashboard.uid);
            var grafanaPanel = new GrafanaPanel(obj.id, obj.title, obj.type, obj.description, res.data.dashboard.uid);
            panels.push(grafanaPanel);
        }
    }

    return panels;
}

export async function getGrafanaFolderByUid(folderUid) {
    const res = await callGrafanaGET('/api/search?folderIds');

    if (typeof res.data !== "undefined") {
        for (var i = 0; i < res.data.length; i++) {
            const obj = res.data[i];
            if (obj.type == "dash-folder" && obj.uid == folderUid) {
                console.log("-----------" + obj.uid + obj.title);
                return new GrafanaFolder(obj.uid, obj.title);
            }
        }
    }
}

export async function getGrafanaDashboardByUid(dashboardUid) {
    const res = await callGrafanaGET('/api/search?folderIds');

    if (typeof res.data !== "undefined") {
        for (var i = 0; i < res.data.length; i++) {
            const obj = res.data[i];
            if (obj.type == "dash-db" && obj.uid == dashboardUid) {
                console.log("-----------" + obj.uid + obj.title);
                return new GrafanaDashboard(obj.uid, obj.title);
            }
        }
    }
}

export async function getGrafanaPanelById(dashboardUid, panelId) {
    const res = await callGrafanaGET('/api/dashboards/uid/' + dashboardUid);

    if (typeof res.data !== "undefined" && res.data.dashboard !== "undefined" && res.data.dashboard.panels !== "undefined") {
        for (var i = 0; i < res.data.dashboard.panels.length; i++) {
            const obj = res.data.dashboard.panels[i];
            if (obj.id == panelId) {
                console.log("-----------" + obj.id + obj.title + obj.type + obj.description + res.data.dashboard.uid,res.data.meta.folderTitle);
                console.log("Jetzt" + obj.id + obj.title + obj.type + obj.description + res.data.dashboard.uid,res.data.meta.folderTitle);
                console.log(res);
                return new GrafanaPanel(obj.id, obj.title, obj.type, obj.description, res.data.dashboard.uid,res.data.meta.folderTitle);
            }
        }
    }
}

export async function getGrafanaFolderByDashboardUid(dashboardUid) {
    const res = await callGrafanaGET('/api/dashboards/uid/' + dashboardUid);

    if (typeof res.data !== "undefined" && res.data.dashboard !== "undefined") {
        console.log("-----------" + res.data.dashboard.title);
        return res.data.dashboard.title;
    }
}

export function composeIFrameURL(dashboardUid, productsFilters, competitorFilters, timeStart, timeEnd, panelId) {
    // TODO: how to get the iFrame URL?
    //credentials.url + "/d-solo/" + dashboardUid + dashboardName + "?" + "orgId=1&panelId=" + panelId + productFilters + competitorFilters + timefilter
    console.log(timeStart);
    console.log(timeEnd);
    console.log(productsFilters);
    console.log(competitorFilters);
    console.log(dashboardUid);
    console.log(panelId);
    let folder = getGrafanaFolderByDashboardUid(dashboardUid);

    let s = "http://134.103.176.57:3000/d-solo/"+dashboardUid+"/"+folder+"?orgId=1&panelId="+panelId+"&from="+timeStart+"&to="+timeEnd;

    let competitors = "";  
    let products = "";
    for (var i = 0; i < competitorFilters.length; i++) {
        const obj = competitorFilters[i];
        competitors = competitors + "&var-competitor=" + obj;
    } 

    if ((dashboardUid == "R_Ix-cU7z" && (panelId == 4 || panelId == 10 || panelId == 12)) ||
        (dashboardUid == "LMLh-c8nk" && (panelId == 4))) {
        for (var i = 0; i < productsFilters.length; i++) {
            const obj = productsFilters[i];
            products = products + "&var-product=" + obj;
        }
    }

    s = s + competitors + products;
    //"http://134.103.176.57:3000/d-solo/9R50acU7k/youtube?orgId=1&var-product=2&var-product=3&var-competitor=2&var-competitor=5&var-competitor=6&from=1652094525367&to=1652116125367&panelId=6"
    return s;
}
