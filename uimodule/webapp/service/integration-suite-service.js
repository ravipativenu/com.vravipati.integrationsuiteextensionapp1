"use strict";

sap.ui.define([
  "com/vravipati/integrationsuiteextensionapp1/service/http",
  ], function (http) {

    var host = "";
    var servicePath = "api/testing";
    var baseUrl = host + servicePath;
    var parameters = "";
    var parameters1 = "";
    var parameters2 = "";

    return {

      getTestCases: function() {
        return http
        .get(baseUrl + "/testcases")
        .then(function (response) {
          console.log(response)
          return response;
        });

      },

      getScenarios: function() {
        return http
        .get(baseUrl + "/scenarios")
        .then(function (response) {
          console.log(response)
          return response;
        });

      },

      loadTestCase: function(data) {
        return http
        .post(baseUrl + "/testcases", data)
        .then(function (response) {
          console.log(response)
          return response;
        });

      },

      getPayload: function(filename) {
        return http
        .get(baseUrl + "/payload?id=" + filename)
        .then(function (response) {
          console.log(response)
          return response;
        });
      }

    }

 });