const { contextBridge, ipcRenderer } = require('electron');

const validChannels = ["browserWindowAdd", "panelAddToWindow", "panelRemoveFromWindow", "updatedFilterBroadcast", "triggerFilterBroadcast"];

// Adds an object 'api' to the global window object:
contextBridge.exposeInMainWorld('api', {
    panelAddSend: async (arg) => {
        return await ipcRenderer.invoke('panelAddSend', arg);
    },
    panelRemoveSend: async (arg) => {
        return await ipcRenderer.invoke('panelRemoveSend', arg);
    },
    on: (channel, callback) => {
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, callback);
        }
    },
    getAnalysisBrowserWindows: async (arg) => {
        return await ipcRenderer.invoke('getAnalysisBrowserWindows', arg);
    },
    
    getIdDisplays: async (arg) => {
        return await ipcRenderer.invoke('getIdDisplays', arg);
    },

    filtersUpdated: async (arg) => {
        return await ipcRenderer.invoke('filtersUpdated', arg);
    },

    filterRequest: async (arg) => {
        return await ipcRenderer.invoke('filterRequest', arg);
    },
    
    close: async (arg) => {
        return await ipcRenderer.invoke('close', arg);
    },
    
});