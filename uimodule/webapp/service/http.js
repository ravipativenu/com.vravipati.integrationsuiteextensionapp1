sap.ui.define(["jquery.sap.global"], function (jQuery) {
    "use strict";
  
    return {
      get: function (url, data) {
        if (typeof data === "undefined") {
          data = {};
        }
  
        //data = jQuery.extend({}, { $format: "json" }, data);
        return this.request(url, data, "GET");
      },
  
      post: function (url, data) {
        return this.request(url, data, "POST");
      },
  
      patch: function (url, data) {
        return this.request(url, data, "PATCH");
      },
  
      request: function (url, data, method) {
        return jQuery.ajax({
          url: url,
          method: method,
          data: method === "GET" ? data : JSON.stringify(data),
          contentType: "application/json"
        });
      }
    };
  });