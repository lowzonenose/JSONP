/* global requirejs */

requirejs.config({
    baseUrl : "",
    paths : {
        // lib 
        "log4js"  : "../lib/woodman/woodman-amd", // en mode 'production', log4js : "../lib/empty"
        "promise" : "../lib/promise",
        // config du logger
        "logger-cfg" : "Utils/Logger.cfg"
    }
});
