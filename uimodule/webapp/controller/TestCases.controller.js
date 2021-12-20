sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "com/vravipati/integrationsuiteextensionapp1/controller/BaseController",
    "com/vravipati/integrationsuiteextensionapp1/model/formatter",
    "com/vravipati/integrationsuiteextensionapp1/service/integration-suite-service",
    "com/vravipati/integrationsuiteextensionapp1/util/setBusy"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (JSONModel, Controller, formatter, IntegrationSuiteService, setBusy) {
        "use strict";

        return Controller.extend("com.vravipati.integrationsuiteextensionapp1.controller.TestCases", {

            formatter: formatter,
            viewModelName: "TestCases",

            onInit: function () {

                console.log("Inside Init...")

                var oViewModel = new JSONModel({
                    testcases: []
                });

                this.setModel(oViewModel, this.viewModelName);

                setBusy(
                    this.getView(),
                    this.initModels(oViewModel).then(function () {
                        //console.log("init models completed...")
                        //console.log(oViewModel)
                        //you can implement some thing here.
                        //call other functions once all the data is loaded in to models.
                    })
                )

            },

            initModels: function (oViewModel) {

                return jQuery.when(
                    this.initTestCases(oViewModel)
                    //add more asynchronous methods to add more data.
                );

            },

            initTestCases: function (oViewModel) {
                return IntegrationSuiteService.getTestCases().then(function (testcases) {
                    console.log("After getting testcases");
                    console.log(JSON.parse(testcases));
                    oViewModel.setData({ testcases: JSON.parse(testcases) }, true);
                });
            },


        });
    });
