/* =========================================================== */
/* App MVC中 control 实现（App 控制器实现）                    */
/* =========================================================== */
sap.ui.define(["./BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	//---JS 严格模式
	"use strict";
	//--- 基于BaseController 扩展
	return BaseController.extend("ZDEMO_CURD.ZDEMO_CURD.controller.App", {

		/* =========================================================== */
		/* lifecycle methods 应用程序初始化          页面内容密度                  */
		/* =========================================================== */
		onInit: function() {
			this.getView().addStyleClass("sapUiSizeCompact");
		}
	});
});