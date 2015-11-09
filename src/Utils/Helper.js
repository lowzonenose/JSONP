/**
 * Classe utilitaire
 * 
 * @module Helper
 * @alias Gp.Utils.Helper
 */
define([], function () {

    "use strict";

    var Helper = {
        
        /**
		 * concatenation des parametres key/value dans les urls
		 * 
		 * @method normalyzeParameters
	     * @static
		 * @param {Object} params - tableau de clef/valeur
		 * 
		 * @example 
		 *  Gp.Utils.Helper.normalyzeParameters({
		 * 		key1:value1,
		 * 		key2:value2,
		 * 		key3:value3
		 *  });
		 *  // out : "key1=value1&key2=value2&key3=value3"
		 * 
		 * @returns {String}
		 */
        normalyzeParameters : function (params) {

            var myParams = null;

            if (params) {
                var tabParams = [];
                for (var key in params) {
                    if (params.hasOwnProperty(key)) {
                        var value = params[key];
                        if (!value) {
                            value = "";
                        }
                        tabParams.push(key + "=" + value);
                    }
                }

                myParams = tabParams.join("&");
            }

            return myParams;
        },

        /**
		 * Concaténation et encodage des urls
		 * 
		 * @method normalyzeUrl
	     * @static
		 * @param {String} url
		 * @param {Object|String} params - tableau de clef/valeur ou string
		 * @param {Boolean} encode - true|false, false par defaut
		 * 
		 * @example 
		 *  Gp.Utils.Helper.normalyzeUrl(url, {
		 * 		key1:value1,
		 * 		key2=:value2,
		 * 		key3:value3
		 *  });
		 *  // out : "url?key1=value1&key2=value2&key3=value3"
		 * 
		 * @returns {String}
		 */
        normalyzeUrl : function (url, params, encode) {

            var myUrl = url;

            if (url) {
                var k = url.indexOf("?");
                if (k === -1) { // pas de ? et KVP
                    myUrl += "?";
                }

                if (k !== -1 && k !== url.length - 1) { // KVP
                    myUrl += "&";
                }
            }

            if (params) {

                if ( typeof params === "string" ) {
                    myUrl += params;
                }
                else {
                    myUrl += this.normalyzeParameters(params);
                }
            }

            if (encode) {
                // FIXME bonne idée ?
                myUrl = encodeURIComponent(myUrl);
            }

            return myUrl;
        },
        
        /**
         * indentation d'une chaine 
         * @param {Number} n - nombre de tabulation
         * @param {String} msg - chaine
         * 
         * @example
         * Gp.Utils.Helper.indent(2, "message à indenter")
         * // out
         * // ........message à indenter
         * 
         * @returns {String}
         */
        indent : function (n, msg) {
            var num = n || 0;
            return Array(num+1).join("\t") + msg;
        }
    };

    return Helper;
});