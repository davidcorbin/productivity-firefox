![alt tag](https://raw.githubusercontent.com/davidcorbin/productivity-firefox/master/icons/Productivity-icon-128.png)
# productivity-firefox
Firefox extension for Productivity 

## Documentation

### Events

This browser extension waits in the background until certain events are performed by the user. 

These events are when:
- the current tab URL changes
- the user switches tabs

### Data Transfer

When events occur, the browser extension sends data to the running Productivity desktop application. 
The data transfer is done via a POST request to http://127.0.0.1:8000/productivity. 
All data transfered is JSON in the form of:

`{"status":"tab_switched","url":"https://github.com/davidcorbin/productivity-firefox/new/master?readme=1","title":"New File"}`

Immediately when the extension starts, it sends a POST request to Productivity desktop application with the browser user agent.

### Responses

When the Productivity desktop application is running, it will accept http POST requests on 127.0.0.1 port 8000. When it receives data, it will reply with "Data received" and http status 200.
