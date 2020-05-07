function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZZP_TR19_3001_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}