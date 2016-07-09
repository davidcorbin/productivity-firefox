/**
 * Copyright (c) 2016 David Corbin. All rights reserved.
 */

(function() {

  "use strict";

  var tabs = require("sdk/tabs");
  var request = require("sdk/request");

  // Send data to desktop app
  function send(data) {
    // HTTP post request
    request.Request({
      url: "http://localhost:8000/productivity",
      content: data,
      onComplete: function(response) {
        // If data received by Productivity
        if (response.status==200) {
          console.log("Successful: " + response.text);
        }
        else {
          console.log("Error: " + response.status);
        }
      }
    }).post();
  }

  // Connect to desktop application
  function connect() {
    send('{"status":"running", "source":"' + getUA() + '"}');
  }

  // Get user agent
  function getUA() {
    var windows = require("sdk/window/utils");
    var window = windows.getMostRecentBrowserWindow();
    return window.navigator.userAgent;
  }
  
  // Generate array from tab data
  function getTabData(status, url, title) {
    var data = {};
    data.status = status;
    data.url = url;
    data.title = title;
    data.browser = "Firefox";
    return data;
  }
  
  // Previous url sent
  var prevUrl = "";

  // Event called after a tabs content is loaded
  tabs.on('pageshow', function(tab) {
    // Don't send message if new tab or duplicate of previous url
    if (tab.url=="about:blank" || tab.url=="about:newtab" || tab.url==prevUrl) {
      return;
    }
    var tabdata = getTabData("tab_switched", tab.url, tab.title);
    console.log(tabdata);
    send(JSON.stringify(tabdata));
    // Set previous url
    prevUrl = tab.url;
  });
  
  // Event called when current tab is switched by user clicking another tab
  tabs.on('activate', function(tab) {
    // Don't send message if new tab
    if (tab.url=="about:blank" || tab.url=="about:newtab" || tab.url==prevUrl) {
      return;
    }
    var tabdata = getTabData("tab_switched", tab.url, tab.title);
    console.log(tabdata);
    send(JSON.stringify(tabdata));
    prevUrl = tab.url;
  });

  // Send connect message when browser/addon loaded
  connect();

})();
