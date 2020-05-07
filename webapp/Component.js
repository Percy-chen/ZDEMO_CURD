sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"ZDEMO_CURD/ZDEMO_CURD/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("ZDEMO_CURD.ZDEMO_CURD.Component", {
		//---元数据
		metadata: {
			manifest: "json"
		},

		//---初始化方法
		init: function() {

			// 设置设备模型
			this.setModel(models.createDeviceModel(), "device");

			// 设置FLP模型
			// this.setModel(models.createFLPModel(), "FLP");

			// 设置本地模型
			this.setModel(models.createLocalModel());
			//---本地资源model路径获取

			//---页面跳转初始化
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
		},

		// 退出后销毁事件
		destroy: function() {
			this.getModel().destroy();
			this.getModel("i18n").destroy(); // 本地测试注释
			this.getModel("FLP").destroy(); // 本地测试注释
			this.getModel("device").destroy(); // 本地测试注释
			this.getModel("OData").destroy(); // 本地测试注释
			UIComponent.prototype.destroy.apply(this, arguments);
		}
	});
});