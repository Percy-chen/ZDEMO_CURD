sap.ui.define(["./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/Device"
], function (BaseController, JSONModel, Filter, FilterOperator, MessageToast, MessageBox, Device) {
	"use strict";
	return BaseController.extend("ZDEMO_CURD.ZDEMO_CURD.controller.Main", {
		onInit: function (evt) {
			this._ODataModel = this.getModel("OData");
			this._JSONModel = this.getModel();
			// this.get_Doclist();
		},
		
		handleSearch: function () {
			this.setBusy(true);
			var Sel = this._JSONModel.getData().Sel;
			// var Sel = this._JSONModel.getProperty("/Sel");
			// var oBname = this.byId("Bname");
			// if (Sel.Bname === '') {
			// 	oBname.setValueState(sap.ui.core.ValueState.Error);
			// 	MessageBox.error("请先输入必输信息!", {
			// 		title: "错误"
			// 	});
			// 	return;
			// }
			// var oFilter1 = new sap.ui.model.Filter("Bname", sap.ui.model.FilterOperator.EQ, Sel.Bname);
			// var aFilters = [oFilter1];
			var sUrl = "/HeaderSet";
			var mParameters = {
				// filters: aFilters,
				success: function (oData, response) {
					if (response.statusCode === "200") {
						this._JSONModel.setProperty("/Item", oData.results);
						this._JSONModel.setProperty("/appProperties/expanded2", true);
						this._JSONModel.setProperty("/appProperties/expanded1", false);
					}
					if (response.statusCode !== "200") {
						this._JSONModel.setProperty("/Item", []);
					}
					this.setBusy(false);
				}.bind(this),
				error: function (oError) {
					this.setBusy(false);
				}.bind(this)
			};
			this._ODataModel.read(sUrl, mParameters);
			//this.getModel("OData").read(sUrl, mParameters);
		},
		handleUpdate: function (oEvent) {
			this.setBusy(true);
			var Item = this._JSONModel.getData().Item;
			var DataTable = this.getView().byId("DataTable");
			// var context = oEvent.getSource().getBindingContext().sPath;
			// var contexts = context.split("/");
			// var n = contexts[3];
			var context = DataTable.getSelectedContexts();
			if (context.length <= 0) {
				sap.m.MessageBox.warning("请至少选择一行", {
					title: "提示"
				});
				this.setBusy(false);
				return;
			}
			if (context.length !== 0) {
				var oSelectedItem = DataTable.getSelectedItem();
				var n = DataTable.indexOfItem(oSelectedItem);
			}
			var oBname = Item[n].Bname;
			var sPath = "/HeaderSet(IBname='" + oBname + "')";
			var mParameters = {
				success: function (oData, response) {
					if (response.statusCode === "204") {
						MessageBox.success("更新成功！");
						DataTable.removeSelections(true);
						this.handleSearch();
					}
					this.setBusy(false);
				}.bind(this),
				error: function (oError) {
					this.setBusy(false);
				}.bind(this)
			};
			this._ODataModel.update(sPath, Item[n], mParameters);
		},
		handleDel: function (oEvent) {
			this.setBusy(true);
			var Item = this._JSONModel.getData().Item;
			var DataTable = this.getView().byId("DataTable");
			// var context = oEvent.getSource().getBindingContext().sPath;
			// var contexts = context.split("/");
			// var n = contexts[3];
			var context = DataTable.getSelectedContexts();
			if (context.length <= 0) {
				sap.m.MessageBox.warning("请至少选择一行", {
					title: "提示"
				});
				this.setBusy(false);
				return;
			}
			if (context.length !== 0) {
				var oSelectedItem = DataTable.getSelectedItem();
				var n = DataTable.indexOfItem(oSelectedItem);
			}
			var oBname = Item[n].Bname;
			var sPath = "/HeaderSet(IBname='" + oBname + "')";
			var mParameters = {
				success: function (oData, response) {
					if (response.statusCode === "204") {
						MessageBox.success("删除成功！");
						DataTable.removeSelections(true);
						this.handleSearch();
					}
					this.setBusy(false);
				}.bind(this),
				error: function (oError) {
					this.setBusy(false);
				}.bind(this)
			};
			this._ODataModel.remove(sPath, mParameters);
		},
		handleCreate: function () {
			// this.setBusy(true);
			var oBname = this.byId("Bname");
			var oRequest = this._JSONModel.getData().Sel;
			if (oRequest.Bname === '') {
				oBname.setValueState(sap.ui.core.ValueState.Error);
				MessageBox.error("请先输入必输信息!", {
					title: "错误"
				});
				this.setBusy(false);
				return;
			} else {
				oBname.setValueState(sap.ui.core.ValueState.Null);
			}
			var token = this._fetchToken(); // Call local method to start the workflow instance     
			this._startInstance(token, oRequest);
		},
		_fetchToken: function () {
			var token;
			$.ajax({
				url: "/bpmworkflowruntime/rest/v1/xsrf-token",
				method: "GET",
				async: false,
				headers: {
					"X-CSRF-Token": "Fetch"
				},
				success: function (result, xhr, data) {
					token = data.getResponseHeader("X-CSRF-Token");
				}
			});
			return token;
		},
		_startInstance: function (token, data) {
			var oContext = {
				Bname: data.Bname,
				NameFirst: data.NameFirst,
				NameLast: data.NameLast,
				NameText: data.NameText
			};
			$.ajax({
				url: "/bpmworkflowruntime/rest/v1/workflow-instances",
				method: "POST",
				async: false,
				contentType: "application/json",
				headers: {
					"X-CSRF-Token": token
				},
				data: JSON.stringify({
					definitionId: "workflow_curd",
					context: oContext
				}),
				success: function (result, xhr, data) {
					MessageToast.show("工作流程已成功启动");
				}
			});
		},
	});
});