sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "com/vravipati/integrationsuiteextensionapp1/controller/BaseController",
    "com/vravipati/integrationsuiteextensionapp1/model/formatter",
    "com/vravipati/integrationsuiteextensionapp1/service/integration-suite-service",
    "com/vravipati/integrationsuiteextensionapp1/util/setBusy",
    "sap/ui/core/Fragment",
    'sap/m/MessageToast'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (JSONModel, Controller, formatter, IntegrationSuiteService, setBusy, Fragment, MessageToast) {
        "use strict";

        return Controller.extend("com.vravipati.integrationsuiteextensionapp1.controller.TestCases", {

            formatter: formatter,
            viewModelName: "TestCases",
            lookupModelName: "Lookups",
            payloadModelName: "Payload",

            onInit : function() {

                var oViewModel = new JSONModel({
                    testcases: []
                });

                var oLookupModel = new JSONModel({
                    scenarios: []
                });

                var oPayloadModel = new JSONModel({
                    data: {}
                })

                this.setModel(oViewModel, this.viewModelName);
                this.setModel(oLookupModel, this.lookupModelName);
                this.setModel(oPayloadModel, this.payloadModelName);

                setBusy(
                    this.getView(),
                    this.initModels(oViewModel, oLookupModel).then(function () {
                        //you can implement some thing here.
                        //call other functions once all the data is loaded in to models.
                    })
                )

            },

            initModels: function (oViewModel, oLookupModel) {

                return jQuery.when(
                    this.initTestCases(oViewModel),
                    this.initScenarios(oLookupModel)
                    //add more asynchronous methods to add more data.
                );

            },

            initTestCases: function (oViewModel) {
                return IntegrationSuiteService.getTestCases().then(function (testcases) {
                    oViewModel.setData({ testcases: JSON.parse(testcases) }, true);
                });
            },

            initScenarios: function (oLookupModel) {
                return IntegrationSuiteService.getScenarios().then(function (scenarios) {
                    oLookupModel.setData({ scenarios: JSON.parse(scenarios) }, true);
                });
            },


            onCreateTestCase: function () {
                // create dialog lazily
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "com.vravipati.integrationsuiteextensionapp1.view.CreateTestCase"
                    });
                } 
                this.pDialog.then(function(oDialog) {
                    oDialog.open();
                });
		    },

            onCloseDialog : function () {
                // note: We don't need to chain to the pDialog promise, since this event-handler
                // is only called from within the loaded dialog itself.
                this.byId("TestCaseDialog").close();
            },

            onCreateDialog : function(oEvent) {
                var that = this;
                var name = this.byId("nameComboBox").getProperty("value");
                var testcase = this.byId("testCaseInput").getProperty("value");
                var description = this.byId("descriptionInput").getProperty("value");
                var method = this.byId("methodInput").getProperty("value");
                var payload = {
                    "Name" : name,
                    "Testcase" : testcase,
                    "Description" : description,
                    "Method": method,
                };
                var file = sap.ui.getCore()._file;
                if(file && window.FileReader) {
                    var reader = new FileReader();
                    var filetemp = reader.readAsText(file)
                    payload["Filename"] = file.name
                    payload["Filetype"] = file.type
                    payload["Filesize"] = file.size
                    reader.onload = function(evn) {  
                        var filedata2= evn.target.result;
                        var encodedfiledata2 = btoa(filedata2);
                        payload["Filedata"] = encodedfiledata2
                        IntegrationSuiteService.loadTestCase(payload)
                        .then(function(response) {
                            that.byId("TestCaseDialog").close();
                            var msg = "Test case created";
                            MessageToast.show(msg);
                        })
                        .catch(function(error) {
                            var msg = "Test case creation failed with error: " + error.status + " : " + error.statusText + " : " + error.responseText;
                            MessageToast.show(msg);
                        });
                    }
                }
                
            },

            onFileUploadChange : function (oEvent) {
                oEvent.getParameter("files")[0]
                sap.ui.getCore()._file = oEvent.getParameter("files")[0];
            },

            onFileLinkPress : function (oEvent) {
                var that = this
                var oPayloadModel = that.getView().getModel("Payload")
                var filepath = oEvent.getSource().getProperty("title")
                // create dialog lazily
                IntegrationSuiteService.getPayload(filepath)
                .then(function(response) {
                    var oPayloadModel = that.getView().getModel("Payload")
                    var decodedresponse = JSON.parse(response)["data"] = atob(JSON.parse(response).data)
                    oPayloadModel.setData({ data: decodedresponse }, true);
                    if (!that.qDialog) {
                        that.qDialog = that.loadFragment({
                            name: "com.vravipati.integrationsuiteextensionapp1.view.ViewFile"
                        });
                    } 
                    that.qDialog.then(function(oDialog) {
                        oDialog.open();
                    });
                })
                .catch(function(error) {
                    if (!that.qDialog) {
                        that.qDialog = that.loadFragment({
                            name: "com.vravipati.integrationsuiteextensionapp1.view.ViewFile"
                        });
                    } 
                    that.qDialog.then(function(oDialog) {
                        oDialog.open();
                    });                    
                })
            },

            onFileCloseDialog : function () {
                // note: We don't need to chain to the pDialog promise, since this event-handler
                // is only called from within the loaded dialog itself.
                this.byId("FileDialog").close();
            },

            onFileOkDialog : function () {
                // note: We don't need to chain to the pDialog promise, since this event-handler
                // is only called from within the loaded dialog itself.
                this.byId("FileDialog").close();
            },


        });
    });