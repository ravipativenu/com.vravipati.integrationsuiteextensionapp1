"use strict";

sap.ui.define([
  "com/vravipati/integrationsuiteextensionapp1/service/http",
  ], function (http) {

    var host = "/integrationsuiteextnbackend";
    var servicePath = "/api/testing";
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
      getSCPIMetrics: function (start, end) {
        if (start && end) {
          parameters = "?start=" + start + "&end=" + end;
        }
        return http
          .get(baseUrl + "/runtime-artifacts" + parameters)
          .then(function (response) {
            return response;
          });
      },

      getSCPIInterfaceDetails: function (id) {
        if (id) {
          parameters = "?id=" + id;
        }
        return http
          .get(baseUrl + "/interface-details" + parameters)
          .then(function (response) {
            return response;
          });
      },

      getSCPIMPLDetails: function (id, start, end) {
        if (id) {
          parameters = "?id=" + id + "&start=" + start + "&end=" + end;
        }
        return http
          .get(baseUrl + "/mpl-details" + parameters)
          .then(function (response) {
            return response;
          });
      },

      getUDMSDetails: function (id) {

        if (id) {
          parameters = `?id=${id}`;
        }
        return http
        .get(host + "/api/monitoring/udmsattributes" + parameters)
        .then(function (response) {
          //console.log("VENU DEBUG");
          //console.log(response);
          return response.value;
        });


      },

      getSCPIMPLUDMSDetails: function(id, start, end, udmsKey, udmsValue) {

        parameters1 = "";
        parameters2 = "";
        
        if (id) {
          parameters1 = "?id=" + id + "&start=" + start + "&end=" + end;
        }


        if (udmsKey != '' && udmsValue != '') {
          parameters2 = '&udmsKey=' + udmsKey + '&udmsValue=' + udmsValue ;
        }


        return http
        .get(host + "/api/monitoring/udmsdata" + parameters1 + parameters2)
        .then(function (response) {
          return response;
        });


      }

    }

 });