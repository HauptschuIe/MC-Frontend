class GrafanaPanel {
  constructor(id, title, type, description, dashboardUid,folderTitle) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.description = description;
    this.dashboardUid = dashboardUid;
    this.folderTitle = folderTitle;
  }
}

module.exports = { GrafanaPanel };