/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ZDEMO_CURD/ZDEMO_CURD/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});