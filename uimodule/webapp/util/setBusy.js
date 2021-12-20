sap.ui.define([], function () {
    "use strict";
    function setBusy(control, promise) {
      control.setBusy(true);
      return promise
        .then(function () {
          console.log(control.sViewName, " view busy promise resolved...");
          control.setBusy(false);
        })
        .fail(function () {
          console.log(control.sViewName, " view busy promise resolved...");
          control.setBusy(false);
        });
    }
  
    return setBusy;
  });