/*! 
    Licence BSD
    
    Copyright (c) 2008-2015, Institut National de l'Information Géographique et Forestière France
    Tous droits réservés.
    
    La redistribution du code source, modifié ou non, sous forme de binaire est soumise aux conditions suivantes :
    Le copyright ci-dessus, la présente liste des conditions et l'avertissement qui la suit doivent figurer dans le code source.
    La documentation et/ou les fichiers accompagnant le code source distribué sous forme de binaire doivent faire apparaître le copyright ci-dessus, 
    la présente liste des conditions et l'avertissement qui la suit.
    Le nom de l'Institut National de l'Information Géographique et Forestière, pas plus que ceux de ses collaborateurs, ne sauraient être utilisés 
    dans le but de promouvoir ou de légitimer un produit dérivé de ce programme sans autorisation écrite préalable à cet effet.
    
    CE PROGRAMME EST FOURNI « TEL QU'EN L'ÉTAT » PAR LES MEMBRES DU CONSEIL D'ADMINISTRATION ET LEURS COLLABORATEURS ET IL N'EST DONNÉ AUCUNE GARANTIE, 
    IMPLICITE OU EXPLICITE, QUANT À SON UTILISATION COMMERCIALE, PROFESSIONNELLE OU AUTRE. LES MEMBRES DU CONSEIL D'ADMINISTRATION ET LEURS COLLABORATEURS 
    NE PEUVENT EN AUCUN CAS ÊTRE TENUS POUR RESPONSABLES DE QUELQUE DOMMAGE OU PRÉJUDICE DIRECT, INDIRECT, SECONDAIRE OU ACCESSOIRE (Y COMPRIS LES PERTES 
    FINANCIÈRES DUES AU MANQUE À GAGNER, À L'INTERRUPTION D'ACTIVITÉS, OU LA PERTE D'INFORMATIONS ET AUTRES) DÉCOULANT DE L'UTILISATION DU PROGRAMME, OU 
    DE L'IMPOSSIBILITÉ D'UTILISER CELUI-CI, ET DONT L'UTILISATEUR ACCEPTE L'ENTIÈRE RESPONSABILITÉ.
*/
var log4js,loggerCfg,UtilsLoggerByDefault,JSONP;log4js=void 0,loggerCfg={loggers:[{root:!0,level:"all",appenders:[{type:"Console",layout:{type:"PatternLayout",pattern:"%d{yyyy-MM-dd HH:mm:ss} [%p] %c - %m%n"}}]}]},UtilsLoggerByDefault=function(Log4js,Config){var LoggerByDefault={getLogger:function(name){Log4js.load(Config,function(error){if(error)throw error});var logname=name||"default";return Log4js.getLogger(logname)}};return LoggerByDefault}(log4js,loggerCfg),JSONP=function(Logger){var JSONP={call:function(options){if(!options)throw new Error("missing parameter : options !");if(!options.url)throw new Error("missing parameter : options.url !");if(options.timeOut||(options.timeOut=1e4),!options.onResponse)throw new Error("missing parameter : options.onResponse !");var urlHasCallbackKey=!1,urlHasCallbackName=!1,idx=options.url.indexOf("callback=");if(-1!=idx){urlHasCallbackKey=!0;var j=options.url.indexOf("&",idx);-1===j&&(j=options.url.length);var callbackName=options.url.substring(idx+9,j);callbackName&&(urlHasCallbackName=!0,options.callbackName=callbackName)}if(!urlHasCallbackKey){var k=options.url.indexOf("?");-1===k?options.url=options.url+"?callback=":k===options.url.length?options.url=options.url+"callback=":options.url=options.url+"&callback="}var HasCallbackName=options.callbackName?!0:urlHasCallbackName;if(urlHasCallbackName||(options.callbackName||(options.callbackName="callback"),options.url=options.url.replace("callback=","callback="+options.callbackName)),options.onTimeOut||(options.onTimeOut=function(){console.log("TimeOut while invoking url : "+options.url)}),!HasCallbackName){var onTimeOutTrigger=window.setTimeout(function(){window[options.callbackName]=function(){},options.onTimeOut()},options.timeOut);window[options.callbackName]=function(data){window.clearTimeout(onTimeOutTrigger),options.onResponse(data)}}var scriptu;scriptu=document.createElement("script"),scriptu.setAttribute("type","text/javascript"),scriptu.setAttribute("src",options.url),scriptu.setAttribute("charset","UTF-8"),scriptu.setAttribute("id","results"),document.body.appendChild(scriptu)}};return JSONP}(UtilsLoggerByDefault);