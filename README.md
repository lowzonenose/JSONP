[![Build Status](https://travis-ci.org/lowzonenose/JSONP.svg)](https://travis-ci.org/lowzonenose/JSONP)

JSONP (or JSON with Padding) is a technique used by web developers to overcome the cross-domain restrictions imposed by browsers to allow data to be retrieved from systems other than the one the page was served by.


### USAGE 

```
 var options = { 
   url : 'http://localhost/response.json', 
   timeOut : 10000, 
   onResponse: function (response) { console.log('onResponse', response); }, 
   onTimeOut : function () { console.log("Time out !"); } 
 };
 JSONP.call(options);
 ```