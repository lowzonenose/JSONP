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

/* BEGIN CODE */
var log4js, loggerCfg, UtilsLoggerByDefault, JSONP;
(function (rootRequire) {
    log4js = function () {
        var requirejs, require, define;
        (function (e) {
            function c(e, t) {
                return f.call(e, t);
            }
            function h(e, t) {
                var n, r, i, s, o, a, f, l, c, h, p = t && t.split('/'), d = u.map, v = d && d['*'] || {};
                if (e && e.charAt(0) === '.')
                    if (t) {
                        p = p.slice(0, p.length - 1), e = p.concat(e.split('/'));
                        for (l = 0; l < e.length; l += 1) {
                            h = e[l];
                            if (h === '.')
                                e.splice(l, 1), l -= 1;
                            else if (h === '..') {
                                if (l === 1 && (e[2] === '..' || e[0] === '..'))
                                    break;
                                l > 0 && (e.splice(l - 1, 2), l -= 2);
                            }
                        }
                        e = e.join('/');
                    } else
                        e.indexOf('./') === 0 && (e = e.substring(2));
                if ((p || v) && d) {
                    n = e.split('/');
                    for (l = n.length; l > 0; l -= 1) {
                        r = n.slice(0, l).join('/');
                        if (p)
                            for (c = p.length; c > 0; c -= 1) {
                                i = d[p.slice(0, c).join('/')];
                                if (i) {
                                    i = i[r];
                                    if (i) {
                                        s = i, o = l;
                                        break;
                                    }
                                }
                            }
                        if (s)
                            break;
                        !a && v && v[r] && (a = v[r], f = l);
                    }
                    !s && a && (s = a, o = f), s && (n.splice(0, o, s), e = n.join('/'));
                }
                return e;
            }
            function p(t, r) {
                return function () {
                    return n.apply(e, l.call(arguments, 0).concat([
                        t,
                        r
                    ]));
                };
            }
            function d(e) {
                return function (t) {
                    return h(t, e);
                };
            }
            function v(e) {
                return function (t) {
                    s[e] = t;
                };
            }
            function m(n) {
                if (c(o, n)) {
                    var r = o[n];
                    delete o[n], a[n] = !0, t.apply(e, r);
                }
                if (!c(s, n) && !c(a, n))
                    throw new Error('No ' + n);
                return s[n];
            }
            function g(e) {
                var t, n = e ? e.indexOf('!') : -1;
                return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [
                    t,
                    e
                ];
            }
            function y(e) {
                return function () {
                    return u && u.config && u.config[e] || {};
                };
            }
            var t, n, r, i, s = {}, o = {}, u = {}, a = {}, f = Object.prototype.hasOwnProperty, l = [].slice;
            r = function (e, t) {
                var n, r = g(e), i = r[0];
                return e = r[1], i && (i = h(i, t), n = m(i)), i ? n && n.normalize ? e = n.normalize(e, d(t)) : e = h(e, t) : (e = h(e, t), r = g(e), i = r[0], e = r[1], i && (n = m(i))), {
                    f: i ? i + '!' + e : e,
                    n: e,
                    pr: i,
                    p: n
                };
            }, i = {
                require: function (e) {
                    return p(e);
                },
                exports: function (e) {
                    var t = s[e];
                    return typeof t != 'undefined' ? t : s[e] = {};
                },
                module: function (e) {
                    return {
                        id: e,
                        uri: '',
                        exports: s[e],
                        config: y(e)
                    };
                }
            }, t = function (t, n, u, f) {
                var l, h, d, g, y, b = [], w;
                f = f || t;
                if (typeof u == 'function') {
                    n = !n.length && u.length ? [
                        'require',
                        'exports',
                        'module'
                    ] : n;
                    for (y = 0; y < n.length; y += 1) {
                        g = r(n[y], f), h = g.f;
                        if (h === 'require')
                            b[y] = i.require(t);
                        else if (h === 'exports')
                            b[y] = i.exports(t), w = !0;
                        else if (h === 'module')
                            l = b[y] = i.module(t);
                        else if (c(s, h) || c(o, h) || c(a, h))
                            b[y] = m(h);
                        else {
                            if (!g.p)
                                throw new Error(t + ' missing ' + h);
                            g.p.load(g.n, p(f, !0), v(h), {}), b[y] = s[h];
                        }
                    }
                    d = u.apply(s[t], b);
                    if (t)
                        if (l && l.exports !== e && l.exports !== s[t])
                            s[t] = l.exports;
                        else if (d !== e || !w)
                            s[t] = d;
                } else
                    t && (s[t] = u);
            }, requirejs = require = n = function (s, o, a, f, l) {
                return typeof s == 'string' ? i[s] ? i[s](o) : m(r(s, o).f) : (s.splice || (u = s, o.splice ? (s = o, o = a, a = null) : s = e), o = o || function () {
                }, typeof a == 'function' && (a = f, f = l), f ? t(e, s, o, a) : setTimeout(function () {
                    t(e, s, o, a);
                }, 15), n);
            }, n.config = function (e) {
                return u = e, n;
            }, define = function (e, t, n) {
                t.splice || (n = t, t = []), !c(s, e) && !c(o, e) && (o[e] = [
                    e,
                    t,
                    n
                ]);
            }, define.amd = { jQuery: !0 };
        }(), define('../deps/almond', function () {
        }), define('lifecycle', [], function () {
            var e = function () {
                this.started = !1;
            };
            return e.prototype.start = function (e) {
                return e = e || function () {
                }, this.started = !0, e();
            }, e.prototype.stop = function (e) {
                return e = e || function () {
                }, this.started = !1, e();
            }, e.prototype.isStarted = function () {
                return this.started;
            }, e;
        }), define('logevent', [], function () {
            var e = function (e, t, n) {
                this.time = new Date(), this.loggerName = e, this.level = t, this.message = n;
            };
            return e.prototype.getLoggerName = function () {
                return this.loggerName;
            }, e.prototype.getLevel = function () {
                return this.level;
            }, e.prototype.getMessage = function () {
                return this.message;
            }, e.prototype.getMillis = function () {
                return this.time.getTime();
            }, e;
        }), define('error', [], function () {
            var e = function (e) {
                this.message = e, Error.call(this), Error.captureStackTrace && Error.captureStackTrace(this, arguments.callee);
            };
            return e.prototype = new Error(), e;
        }), define('loglevel', [
            'require',
            './error'
        ], function (e) {
            var t = e('./error'), n = function () {
                    this.levels = [];
                };
            return n.prototype.level2index = function (e) {
                var t = 0, n = this.levels.length;
                for (t = 0; t < n; t++)
                    if (this.levels[t] === e)
                        return t;
                return -1;
            }, n.prototype.registerLevel = function (e, n) {
                var r = 0;
                if (this.level2index(e) !== -1)
                    throw new t('Log level "' + e + '" ' + 'cannot be registered as it already exists');
                if (n) {
                    r = this.level2index(n);
                    if (r === -1)
                        throw new t('The log level "' + n + '" ' + 'cannot be used as reference level as it does not exist');
                }
                this.levels.splice(r, 0, e);
            }, n.prototype.registerStandardLevels = function () {
                this.registerLevel('trace'), this.registerLevel('log'), this.registerLevel('info'), this.registerLevel('warn'), this.registerLevel('error');
            }, n.prototype.isBelow = function (e, t) {
                return e === 'off' ? !0 : e === 'all' ? t === 'all' : t === 'off' ? !1 : t === 'all' ? !0 : this.level2index(e) <= this.level2index(t);
            }, n.prototype.getLevels = function () {
                return this.levels;
            }, n;
        }), define('utils', [], function () {
            var e = Object.prototype.toString, t = Array.isArray || function (t) {
                    return e.call(t) === '[object Array]';
                }, n = function (t) {
                    return e.call(t) === '[object String]';
                }, r = function (e) {
                    return e === Object(e);
                }, i = function (t) {
                    return e.call(t) === '[object Function]';
                }, s = function (t) {
                    return e.call(t) === '[object Date]';
                }, o = {}, u = function (e, t, n) {
                    if (!e)
                        return;
                    if (Array.prototype.forEach && e.forEach === Array.prototype.forEach)
                        e.forEach(t, n);
                    else if (e.length === +e.length) {
                        for (var r = 0, i = e.length; r < i; r++)
                            if (r in e && t.call(n, e[r], r, e) === o)
                                return;
                    } else
                        for (var s in e)
                            if (e.hasOwnProperty(s) && t.call(n, e[s], s, e) === o)
                                return;
                }, a = function (e, t, n) {
                    var r = [];
                    return e ? Array.prototype.map && e.map === Array.prototype.map ? e.map(t, n) : (u(e, function (e, i, s) {
                        r[r.length] = t.call(n, e, i, s);
                    }), e.length === +e.length && (r.length = e.length), r) : r;
                };
            return {
                isArray: t,
                isString: n,
                isObject: r,
                isFunction: i,
                isDate: s,
                each: u,
                map: a
            };
        }), define('layouts/simpleobjectserializer', [
            'require',
            '../utils'
        ], function (e) {
            function n(e) {
                var t = String(e);
                return t.length === 1 && (t = '0' + t), t;
            }
            var t = e('../utils'), r = function (e, i) {
                    var s = null;
                    return i = typeof i != 'undefined' ? i : 1, typeof e == 'undefined' ? undefined : t.isString(e) ? e : t.isDate(e) ? e.getUTCFullYear() + '-' + n(e.getUTCMonth() + 1) + '-' + n(e.getUTCDate()) + 'T' + n(e.getUTCHours()) + ':' + n(e.getUTCMinutes()) + ':' + n(e.getUTCSeconds()) + '.' + String((e.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5) + 'Z' : i <= 0 ? '\u2026' : (t.isArray(e) ? (s = [], t.each(e, function (e) {
                        s.push(r(e, i - 1));
                    })) : t.isObject(e) ? (s = {}, t.each(e, function (e, t) {
                        s[t] = r(e, i - 1);
                    })) : t.isFunction(e) ? s = '[func]' : s = e, s);
                };
            return function (e, t, n) {
                var i = r(e, t), s = '';
                return n ? s = JSON.stringify(i) : s = JSON.stringify(i, null, 2), typeof s == 'undefined' ? 'undefined' : s;
            };
        }), define('message', [
            'require',
            './utils',
            './layouts/simpleobjectserializer'
        ], function (e) {
            var t = e('./utils'), n = e('./layouts/simpleobjectserializer'), r = function (e) {
                    this.formatString = '', this.params = [];
                    if (!e)
                        return;
                    e = t.isArray(e) ? e : [e], e.length > 0 && t.isString(e[0]) && e[0].indexOf('{}') !== -1 ? (this.formatString = e[0], this.params = e.slice(1)) : this.params = e;
                };
            return r.prototype.getFormattedMessage = function (e) {
                e = e || {}, e.separator = t.isString(e.separator) ? e.separator : ' ';
                var n = this.getFormattedParams(e);
                return n.join(e.separator);
            }, r.prototype.getFormattedParams = function (e) {
                e = e || {}, e.separator = t.isString(e.separator) ? e.separator : ' ', e.compactObjects = e.compactObjects || !1, e.objectDepth = e.objectDepth || 2;
                var n = 0, r = 0, i = this.params.length, s = '', o = [], u = {
                        compactObjects: e.compactObjects,
                        objectDepth: e.objectDepth
                    }, a = 0, f = this.formatString.indexOf('{}');
                while (f !== -1)
                    s += this.formatString.substring(a, f), n < i && (r = this.params[n], s += this.getFormattedParam(r, u)), n += 1, a = f + 2, f = this.formatString.indexOf('{}', a);
                s += this.formatString.substring(a), s && o.push(s);
                for (!0; n < i; n++)
                    r = this.params[n], o.push(this.getFormattedParam(r, e));
                return o;
            }, r.prototype.getFormattedParam = function (e, r) {
                return r = r || {}, r.objectDepth = r.objectDepth || 2, t.isString(e) ? e : r.preserveObjects && t.isObject(e) ? e : e && e.toString && e.toString !== Object.prototype.toString ? e.toString() : n(e, r.objectDepth, r.compactObjects);
            }, r.prototype.getParameters = function () {
                return this.params;
            }, r.prototype.getFormat = function () {
                return this.formatString;
            }, r;
        }), define('logger', [
            'require',
            './logevent',
            './message',
            './utils'
        ], function (e) {
            var t = e('./logevent'), n = e('./message'), r = e('./utils'), i = function (e, t) {
                    this.name = e, this.loggerContext = t, this.parent = null, this.children = [], this.appenders = [], this.filter = null, this.level = 'inherit', this.additive = !0, this.loggerContext ? (this.isBelow = function (e, t) {
                        return this.loggerContext.logLevel.isBelow(e, t);
                    }, r.each(this.loggerContext.logLevel.getLevels(), function (e) {
                        var t = this;
                        this[e] || (this[e] = function () {
                            t.traceAtLevel(e, arguments);
                        });
                    }, this)) : this.isBelow = function () {
                        return !0;
                    };
                };
            return i.prototype.traceAtLevel = function (e, r) {
                var i = 0, s = [], o = null, u = r.length;
                for (i = 0; i < r.length; i++)
                    s[i] = r[i];
                u === 1 && s[0] instanceof n ? o = s[0] : o = new n(s);
                var a = new t(this.name, e, o);
                return this.loggerContext ? this.loggerContext.traceLogEvent(a, this) : this.traceLogEvent(a);
            }, i.prototype.traceLogEvent = function (e, t) {
                t = t || 'neutral', t === 'neutral' && (this.isBelow(e.getLevel(), this.level) ? t = 'accept' : t = 'deny');
                if (t !== 'accept')
                    return;
                if (this.filter) {
                    t = this.filter.filter(e);
                    if (t === 'deny')
                        return;
                }
                return this.append(e);
            }, i.prototype.append = function (e) {
                var t = 0, n = 0;
                for (t = 0, n = this.appenders.length; t < n; t += 1)
                    this.appenders[t].append(e);
                this.additive && this.parent && this.parent.append(e);
            }, i.prototype.reset = function () {
                this.appenders = [], this.level = 'inherit', this.filter = null, this.additive = !0;
            }, i.prototype.initialize = function (e) {
                e = e || {}, this.level = typeof e.level != 'undefined' ? e.level : 'inherit', this.additive = typeof e.additivity != 'undefined' ? e.additivity : !0, this.appenders = e.appenders || [], this.filter = e.filter || null;
            }, i;
        }), define('filter', [], function () {
            var e = function () {
            };
            return e.prototype.filter = function (e) {
                return e ? 'accept' : 'deny';
            }, e;
        }), define('filters/compositefilter', [
            'require',
            '../filter'
        ], function (e) {
            var t = e('../filter'), n = function (e) {
                    t.call(this), this.filters = e || [];
                };
            return n.prototype = new t(), n.prototype.filter = function (e) {
                var t = 0, n = this.filters.length, r = 'neutral';
                for (t = 0; t < n; t++) {
                    r = this.filters[t].filter(e);
                    if (r !== 'neutral')
                        break;
                }
                return r;
            }, n;
        }), define('loggercontext', [
            'require',
            './lifecycle',
            './logevent',
            './loglevel',
            './message',
            './logger',
            './utils',
            './filters/compositefilter',
            './error'
        ], function (e) {
            var t = e('./lifecycle'), n = e('./logevent'), r = e('./loglevel'), i = e('./message'), s = e('./logger'), o = e('./utils'), u = e('./filters/compositefilter'), a = e('./error'), f = function () {
                    t.call(this), this.startTime = new Date(), this.logLevel = new r(), this.rootLogger = new s('[root]', this), this.loggers = {}, this.appenders = {}, this.filters = {}, this.layouts = {}, this.createdAppenders = [], this.filter = null, this.started = !1, this.pendingEvents = [], this.maxPendingEvents = 1000, this.discardedPendingEvents = 0;
                };
            return f.prototype = new t(), f.prototype.registerAppender = function (e, t) {
                this.appenders[e] = t;
            }, f.prototype.registerFilter = function (e, t) {
                this.filters[e] = t;
            }, f.prototype.registerLayout = function (e, t) {
                this.layouts[e] = t;
            }, f.prototype.registerLevel = function (e, t) {
                this.logLevel.registerLevel(e, t), this.propagateTraceFunctions();
            }, f.prototype.registerStandardLevels = function () {
                this.logLevel.registerStandardLevels();
            }, f.prototype.getFilter = function () {
                return this.filter;
            }, f.prototype.traceLogEvent = function (e, t) {
                if (!this.started)
                    return this.saveLogEvent(e, t);
                var n = 'neutral', r = this.getFilter();
                return r && (n = r.filter(e)), t.traceLogEvent(e, n);
            }, f.prototype.saveLogEvent = function (e, t) {
                var n = 0;
                this.pendingEvents.length >= this.maxPendingEvents && (n = Math.floor(this.maxPendingEvents / 10), this.discardedPendingEvents += n, this.pendingEvents.splice(0, n)), this.pendingEvents.push({
                    evt: e,
                    logger: t
                });
            }, f.prototype.tracePendingEvents = function () {
                var e = 0, t = null, r = null;
                this.discardedPendingEvents > 0 && this.rootLogger.traceLogEvent(new n(this.rootLogger.name, 'warn', new i('Too many messages received before loading was over. ' + this.discardedPendingEvents + ' messages were discarded.' + ' To avoid losing messages, consider waiting for Woodman to load' + ' before you start logging messages.')), 'accept');
                for (e = 0; e < this.pendingEvents.length; e++)
                    t = this.pendingEvents[e].evt, r = this.pendingEvents[e].logger, this.traceLogEvent(t, r);
                this.pendingEvents = [];
            }, f.prototype.createFilter = function (e) {
                var t = [], n = [], r = null;
                return e ? (o.isArray(e) ? t = e : o.each(e, function (e, n) {
                    o.isArray(e) ? (o.each(e, function (e) {
                        e.type || (e.type = n);
                    }), t = t.concat(e)) : (e.type || (e.type = n), t.push(e));
                }), o.each(t, function (e) {
                    if (o.isFunction(e.filter)) {
                        n.push(e);
                        return;
                    }
                    var t = this.filters[e.type];
                    if (!t)
                        throw new a('Unknown filter type "' + e.type + '"');
                    n.push(new t(e));
                }, this), n.length > 1 ? r = new u(n) : n.length === 1 && (r = n[0]), r) : null;
            }, f.prototype.initialize = function (e, t) {
                t = t || function (e) {
                    if (e)
                        throw e;
                };
                var n = !1, r = null;
                e && o.isString(e) && e.match(/^console(\s|$)/i) ? (n = !!(typeof global != 'undefined' && global.process && global.process.versions && global.process.versions.node), e = {
                    loggers: [{
                            level: 'all',
                            appenders: [{
                                    type: 'Console',
                                    name: 'console',
                                    layout: {
                                        type: 'pattern',
                                        pattern: e.substring('console '.length) || (n ? '%d{yyyy-MM-dd HH:mm:ss} [%logger] %level - %m%n' : '%d{yyyy-MM-dd HH:mm:ss} [%logger] %m%n')
                                    },
                                    appendStrings: n
                                }]
                        }]
                }) : e = JSON.parse(JSON.stringify(e || {}));
                var i = [], s = [], u = {};
                return this.reset(), o.isArray(e) ? i = e : (e.configuration && (e = e.configuration), e.properties && (e.properties.property ? o.isArray(e.properties.property) ? o.each(e.properties.property, function (e) {
                    e.name === 'maxPendingEvents' && (this.maxPendingEvents = e.value);
                }) : e.properties.property.name === 'maxPendingEvents' && (this.maxPendingEvents = e.properties.property.value) : e.properties.maxPendingEvents && (this.maxPendingEvents = e.properties.maxPendingEvents)), o.isArray(e.loggers) ? i = e.loggers : (i = [], i = o.each(e.loggers, function (e, t) {
                    t === 'root' && (e.root = !0), o.isArray(e) ? o.each(e, function (e) {
                        i.push(e);
                    }) : i.push(e);
                })), o.isArray(e.appenders) ? s = e.appenders : o.each(e.appenders, function (e, t) {
                    o.isArray(e) ? (o.each(e, function (e) {
                        e.type || (e.type = t);
                    }), s = s.concat(e)) : (e.type || (e.type = t), s.push(e));
                })), o.each(i, function (e) {
                    var t = [];
                    e['appender-ref'] && (o.isArray(e['appender-ref']) ? t = o.map(e['appender-ref'], function (e) {
                        return e.ref;
                    }) : t.push(e['appender-ref'].ref), delete e['appender-ref']), o.isArray(e.appenders) && o.each(e.appenders, function (e) {
                        o.isObject(e) ? (s.push(e), t.push(e.name)) : t.push(e);
                    }), e.appenders = t;
                }), this.filter = this.createFilter(e.filters), o.each(s, function (e) {
                    var t = this.appenders[e.type], n = null, i = null, s = null;
                    if (r)
                        return;
                    if (!t) {
                        r = new a('Unknown appender type for "' + e.name + '": ' + e.type);
                        return;
                    }
                    if (u[e.name]) {
                        r = new a('Appender "' + e.name + '" referenced twice in the configuration');
                        return;
                    }
                    e.layout ? (n = e.layout, i = this.layouts[n.type]) : o.each(this.layouts, function (t, r) {
                        e[r] && (n = e[r], i = t);
                    });
                    if (!i) {
                        r = new a('No proper layout defined for appender "' + e.name + '"');
                        return;
                    }
                    e.layout = new i(n, this), e.filters ? e.filter = this.createFilter(e.filters) : e.filter && (e.filter = this.createFilter([e.filter]));
                    var f = this;
                    e.isLogLevelBelow = function (e, t) {
                        return f.logLevel.isBelow(e, t);
                    }, s = new t(e), this.createdAppenders.push(s), u[e.name] = s;
                }, this), r ? t(r) : (o.each(i, function (e) {
                    var t = null;
                    if (r)
                        return;
                    e.appenders = o.map(e.appenders, function (t) {
                        var n = u[t];
                        if (!n) {
                            r = new a('Logger "' + e.name + '" references undefined appender "' + t + '"');
                            return;
                        }
                        return u[t];
                    }), e.filters ? e.filter = this.createFilter(e.filters) : e.filter && (e.filter = this.createFilter(e.filter)), e.root || !e.name ? t = this.getLogger() : t = this.getLogger(e.name), t.initialize(e);
                }, this), r ? t(r) : (this.propagateLevels(), this.propagateTraceFunctions(), t()));
            }, f.prototype.getLogger = function (e) {
                var t = null, n = '', r = 0;
                return e ? (t = this.loggers[e], t ? t : (t = new s(e, this), r = e.lastIndexOf('.'), r !== -1 ? n = this.getLogger(e.substring(0, r)) : n = this.rootLogger, t.parent = n, t.level = n.level, t.filter = n.filter, n.children = n.children || [], n.children.push(t), this.loggers[e] = t, t)) : this.rootLogger;
            }, f.prototype.getStartTime = function () {
                return this.startTime.getTime();
            }, f.prototype.reset = function () {
                var e = '';
                for (e in this.loggers)
                    this.loggers[e].reset();
                this.rootLogger.reset(), this.rootLogger.level = 'all', this.createdAppenders = [], this.started = !1;
            }, f.prototype.propagateLevels = function () {
                this.rootLogger.level === 'inherit' && (this.rootLogger.level = 'all'), o.each(this.loggers, function (e) {
                    var t = e;
                    while (t.level === 'inherit')
                        t = t.parent;
                    e.level = t.level, e.filter || (e.filter = t.filter);
                });
            }, f.prototype.propagateTraceFunctions = function () {
                o.each(this.logLevel.getLevels(), function (e) {
                    var t = this.rootLogger;
                    t[e] || (t[e] = function () {
                        t.traceAtLevel(e, arguments);
                    });
                }, this), o.each(this.loggers, function (e) {
                    o.each(this.logLevel.getLevels(), function (t) {
                        e[t] || (e[t] = function () {
                            e.traceAtLevel(t, arguments);
                        });
                    });
                }, this);
            }, f.prototype.start = function (e) {
                e = e || function (e) {
                    if (e)
                        throw e;
                };
                var t = this, n = this.createdAppenders.length, r = !1, i = function (i) {
                        if (r)
                            return;
                        if (i)
                            return r = !0, e(i);
                        n -= 1;
                        if (n === 0)
                            return t.started = !0, t.tracePendingEvents(), e();
                    };
                if (!(n > 0))
                    return this.started = !0, this.pendingEvents = [], e();
                o.each(this.createdAppenders, function (e) {
                    e.start(function (e) {
                        return i(e);
                    });
                });
            }, f.prototype.stop = function (e) {
                e = e || function (e) {
                    if (e)
                        throw e;
                };
                var t = this, n = this.createdAppenders.length, r = !1, i = function (i) {
                        if (r)
                            return;
                        if (i)
                            return r = !0, e(i);
                        n -= 1;
                        if (n === 0)
                            return t.started = !1, e();
                    };
                if (!(n > 0))
                    return this.started = !1, e();
                o.each(this.createdAppenders, function (e) {
                    e.stop(function (e) {
                        return i(e);
                    });
                });
            }, f.prototype.load = function (e, t) {
                var n = this;
                t = t || function (e) {
                    if (e)
                        throw e;
                }, this.initialize(e, function (e) {
                    if (e)
                        return t(e);
                    n.start(t);
                });
            }, f;
        }), define('logmanager', [
            'require',
            './loggercontext',
            './error'
        ], function (e) {
            var t = e('./loggercontext'), n = e('./error'), r = new t();
            return {
                registerAppender: function (e, t) {
                    return r.registerAppender(e, t);
                },
                registerFilter: function (e, t) {
                    return r.registerFilter(e, t);
                },
                registerLayout: function (e, t) {
                    return r.registerLayout(e, t);
                },
                registerLevel: function (e, t) {
                    return r.registerLevel(e, t);
                },
                registerStandardLevels: function (e, t) {
                    return r.registerStandardLevels(e, t);
                },
                load: function (e, t) {
                    return r.load(e, t);
                },
                unload: function (e) {
                    return r.stop(e);
                },
                initialize: function (e) {
                    return r.initialize(e);
                },
                start: function (e) {
                    return r.start(e);
                },
                stop: function (e) {
                    return r.stop(e);
                },
                getLogger: function (e) {
                    return r.getLogger(e);
                },
                Error: n
            };
        }), define('appender', [
            'require',
            './lifecycle',
            './error'
        ], function (e) {
            var t = e('./lifecycle'), n = e('./error'), r = function (e) {
                    e = e || {}, t.call(this), this.name = e.name, this.layout = e.layout, this.filter = e.filter, this.level = e.level || 'all', this.isBelow = e.isLogLevelBelow || function () {
                        return !0;
                    };
                };
            return r.prototype = new t(), r.prototype.getName = function () {
                return this.name;
            }, r.prototype.append = function (e) {
                if (!this.isStarted())
                    throw new n('Appender "' + this.name + '" ' + 'must be started before it may be used');
                var t = 'neutral';
                this.filter && (t = this.filter.filter(e)), t === 'neutral' && (this.isBelow(e.getLevel(), this.level) ? t = 'accept' : t = 'deny');
                if (t !== 'accept')
                    return;
                this.doAppend(e);
            }, r.prototype.doAppend = function () {
            }, r.prototype.getLayout = function () {
                return this.layout;
            }, r;
        }), define('appenders/consoleappender', [
            'require',
            '../appender'
        ], function (e) {
            var t = e('../appender'), n = function (e) {
                    e = e || {}, t.call(this, e), this.appendStrings = typeof e.appendStrings != 'undefined' ? e.appendStrings : !0;
                };
            return n.prototype = new t(), n.prototype.doAppend = function (e) {
                var t = this.getLayout(), n = e.getLevel(), r = null, i = null;
                this.appendStrings ? (r = t.toMessageString(e), r && r.lastIndexOf('\n') === r.length - 1 && (r = r.substring(0, r.length - 1)), this.doAppendMessages(n, [r])) : (r = t.toMessageBits(e, { preserveObjects: !0 }), r && (i = r[r.length - 1], i && i.lastIndexOf('\n') === i.length - 1 && (r[r.length - 1] = i.substring(0, i.length - 1))), this.doAppendMessages(n, r));
            }, n.prototype.doAppendMessages = function (e, t) {
                if (typeof console == 'undefined')
                    return;
                e === 'info' ? console.info.apply(console, t) : e === 'warn' ? console.warn.apply(console, t) : e === 'error' ? console.error.apply(console, t) : console.log.apply(console, t);
            }, n;
        }));
        var io = 'undefined' == typeof module ? {} : module.exports;
        (function () {
            (function (e, t) {
                var n = e;
                n.version = '0.9.11', n.protocol = 1, n.transports = [], n.j = [], n.sockets = {}, n.connect = function (e, r) {
                    var i = n.util.parseUri(e), s, o;
                    t && t.location && (i.protocol = i.protocol || t.location.protocol.slice(0, -1), i.host = i.host || (t.document ? t.document.domain : t.location.hostname), i.port = i.port || t.location.port), s = n.util.uniqueUri(i);
                    var u = {
                        host: i.host,
                        secure: 'https' == i.protocol,
                        port: i.port || ('https' == i.protocol ? 443 : 80),
                        query: i.query || ''
                    };
                    n.util.merge(u, r);
                    if (u['force new connection'] || !n.sockets[s])
                        o = new n.Socket(u);
                    return !u['force new connection'] && o && (n.sockets[s] = o), o = o || n.sockets[s], o.of(i.path.length > 1 ? i.path : '');
                };
            }('object' == typeof module ? module.exports : io = {}, this), function (e, t) {
                var n = e.util = {}, r = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, i = [
                        'source',
                        'protocol',
                        'authority',
                        'userInfo',
                        'user',
                        'password',
                        'host',
                        'port',
                        'relative',
                        'path',
                        'directory',
                        'file',
                        'query',
                        'anchor'
                    ];
                n.parseUri = function (e) {
                    var t = r.exec(e || ''), n = {}, s = 14;
                    while (s--)
                        n[i[s]] = t[s] || '';
                    return n;
                }, n.uniqueUri = function (e) {
                    var n = e.protocol, r = e.host, i = e.port;
                    return 'document' in t ? (r = r || document.domain, i = i || (n == 'https' && document.location.protocol !== 'https:' ? 443 : document.location.port)) : (r = r || 'localhost', !i && n == 'https' && (i = 443)), (n || 'http') + '://' + r + ':' + (i || 80);
                }, n.query = function (e, t) {
                    var r = n.chunkQuery(e || ''), i = [];
                    n.merge(r, n.chunkQuery(t || ''));
                    for (var s in r)
                        r.hasOwnProperty(s) && i.push(s + '=' + r[s]);
                    return i.length ? '?' + i.join('&') : '';
                }, n.chunkQuery = function (e) {
                    var t = {}, n = e.split('&'), r = 0, i = n.length, s;
                    for (; r < i; ++r)
                        s = n[r].split('='), s[0] && (t[s[0]] = s[1]);
                    return t;
                };
                var s = !1;
                n.load = function (e) {
                    if ('document' in t && document.readyState === 'complete' || s)
                        return e();
                    n.on(t, 'load', e, !1);
                }, n.on = function (e, t, n, r) {
                    e.attachEvent ? e.attachEvent('on' + t, n) : e.addEventListener && e.addEventListener(t, n, r);
                }, n.request = function (e) {
                    if (e && 'undefined' != typeof XDomainRequest && !n.ua.hasCORS)
                        return new XDomainRequest();
                    if ('undefined' != typeof XMLHttpRequest && (!e || n.ua.hasCORS))
                        return new XMLHttpRequest();
                    if (!e)
                        try {
                            return new window[(['Active'].concat('Object').join('X'))]('Microsoft.XMLHTTP');
                        } catch (t) {
                        }
                    return null;
                }, 'undefined' != typeof window && n.load(function () {
                    s = !0;
                }), n.defer = function (e) {
                    if (!n.ua.webkit || 'undefined' != typeof importScripts)
                        return e();
                    n.load(function () {
                        setTimeout(e, 100);
                    });
                }, n.merge = function (t, r, i, s) {
                    var o = s || [], u = typeof i == 'undefined' ? 2 : i, a;
                    for (a in r)
                        r.hasOwnProperty(a) && n.indexOf(o, a) < 0 && (typeof t[a] != 'object' || !u ? (t[a] = r[a], o.push(r[a])) : n.merge(t[a], r[a], u - 1, o));
                    return t;
                }, n.mixin = function (e, t) {
                    n.merge(e.prototype, t.prototype);
                }, n.inherit = function (e, t) {
                    function n() {
                    }
                    n.prototype = t.prototype, e.prototype = new n();
                }, n.isArray = Array.isArray || function (e) {
                    return Object.prototype.toString.call(e) === '[object Array]';
                }, n.intersect = function (e, t) {
                    var r = [], i = e.length > t.length ? e : t, s = e.length > t.length ? t : e;
                    for (var o = 0, u = s.length; o < u; o++)
                        ~n.indexOf(i, s[o]) && r.push(s[o]);
                    return r;
                }, n.indexOf = function (e, t, n) {
                    for (var r = e.length, n = n < 0 ? n + r < 0 ? 0 : n + r : n || 0; n < r && e[n] !== t; n++);
                    return r <= n ? -1 : n;
                }, n.toArray = function (e) {
                    var t = [];
                    for (var n = 0, r = e.length; n < r; n++)
                        t.push(e[n]);
                    return t;
                }, n.ua = {}, n.ua.hasCORS = 'undefined' != typeof XMLHttpRequest && function () {
                    try {
                        var e = new XMLHttpRequest();
                    } catch (t) {
                        return !1;
                    }
                    return e.withCredentials != undefined;
                }(), n.ua.webkit = 'undefined' != typeof navigator && /webkit/i.test(navigator.userAgent), n.ua.iDevice = 'undefined' != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent);
            }('undefined' != typeof io ? io : module.exports, this), function (e, t) {
                function n() {
                }
                e.EventEmitter = n, n.prototype.on = function (e, n) {
                    return this.$events || (this.$events = {}), this.$events[e] ? t.util.isArray(this.$events[e]) ? this.$events[e].push(n) : this.$events[e] = [
                        this.$events[e],
                        n
                    ] : this.$events[e] = n, this;
                }, n.prototype.addListener = n.prototype.on, n.prototype.once = function (e, t) {
                    function r() {
                        n.removeListener(e, r), t.apply(this, arguments);
                    }
                    var n = this;
                    return r.listener = t, this.on(e, r), this;
                }, n.prototype.removeListener = function (e, n) {
                    if (this.$events && this.$events[e]) {
                        var r = this.$events[e];
                        if (t.util.isArray(r)) {
                            var i = -1;
                            for (var s = 0, o = r.length; s < o; s++)
                                if (r[s] === n || r[s].listener && r[s].listener === n) {
                                    i = s;
                                    break;
                                }
                            if (i < 0)
                                return this;
                            r.splice(i, 1), r.length || delete this.$events[e];
                        } else
                            (r === n || r.listener && r.listener === n) && delete this.$events[e];
                    }
                    return this;
                }, n.prototype.removeAllListeners = function (e) {
                    return e === undefined ? (this.$events = {}, this) : (this.$events && this.$events[e] && (this.$events[e] = null), this);
                }, n.prototype.listeners = function (e) {
                    return this.$events || (this.$events = {}), this.$events[e] || (this.$events[e] = []), t.util.isArray(this.$events[e]) || (this.$events[e] = [this.$events[e]]), this.$events[e];
                }, n.prototype.emit = function (e) {
                    if (!this.$events)
                        return !1;
                    var n = this.$events[e];
                    if (!n)
                        return !1;
                    var r = Array.prototype.slice.call(arguments, 1);
                    if ('function' == typeof n)
                        n.apply(this, r);
                    else {
                        if (!t.util.isArray(n))
                            return !1;
                        var i = n.slice();
                        for (var s = 0, o = i.length; s < o; s++)
                            i[s].apply(this, r);
                    }
                    return !0;
                };
            }('undefined' != typeof io ? io : module.exports, 'undefined' != typeof io ? io : module.parent.exports), function (exports, nativeJSON) {
                function f(e) {
                    return e < 10 ? '0' + e : e;
                }
                function date(e, t) {
                    return isFinite(e.valueOf()) ? e.getUTCFullYear() + '-' + f(e.getUTCMonth() + 1) + '-' + f(e.getUTCDate()) + 'T' + f(e.getUTCHours()) + ':' + f(e.getUTCMinutes()) + ':' + f(e.getUTCSeconds()) + 'Z' : null;
                }
                function quote(e) {
                    return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
                        var t = meta[e];
                        return typeof t == 'string' ? t : '\\u' + ('0000' + e.charCodeAt(0).toString(16)).slice(-4);
                    }) + '"' : '"' + e + '"';
                }
                function str(e, t) {
                    var n, r, i, s, o = gap, u, a = t[e];
                    a instanceof Date && (a = date(e)), typeof rep == 'function' && (a = rep.call(t, e, a));
                    switch (typeof a) {
                    case 'string':
                        return quote(a);
                    case 'number':
                        return isFinite(a) ? String(a) : 'null';
                    case 'boolean':
                    case 'null':
                        return String(a);
                    case 'object':
                        if (!a)
                            return 'null';
                        gap += indent, u = [];
                        if (Object.prototype.toString.apply(a) === '[object Array]') {
                            s = a.length;
                            for (n = 0; n < s; n += 1)
                                u[n] = str(n, a) || 'null';
                            return i = u.length === 0 ? '[]' : gap ? '[\n' + gap + u.join(',\n' + gap) + '\n' + o + ']' : '[' + u.join(',') + ']', gap = o, i;
                        }
                        if (rep && typeof rep == 'object') {
                            s = rep.length;
                            for (n = 0; n < s; n += 1)
                                typeof rep[n] == 'string' && (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ': ' : ':') + i));
                        } else
                            for (r in a)
                                Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ': ' : ':') + i));
                        return i = u.length === 0 ? '{}' : gap ? '{\n' + gap + u.join(',\n' + gap) + '\n' + o + '}' : '{' + u.join(',') + '}', gap = o, i;
                    }
                }
                if (nativeJSON && nativeJSON.parse)
                    return exports.JSON = {
                        parse: nativeJSON.parse,
                        stringify: nativeJSON.stringify
                    };
                var JSON = exports.JSON = {}, cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
                        '\b': '\\b',
                        '\t': '\\t',
                        '\n': '\\n',
                        '\f': '\\f',
                        '\r': '\\r',
                        '"': '\\"',
                        '\\': '\\\\'
                    }, rep;
                JSON.stringify = function (e, t, n) {
                    var r;
                    gap = '', indent = '';
                    if (typeof n == 'number')
                        for (r = 0; r < n; r += 1)
                            indent += ' ';
                    else
                        typeof n == 'string' && (indent = n);
                    rep = t;
                    if (!t || typeof t == 'function' || typeof t == 'object' && typeof t.length == 'number')
                        return str('', { '': e });
                    throw new Error('JSON.stringify');
                }, JSON.parse = function (text, reviver) {
                    function walk(e, t) {
                        var n, r, i = e[t];
                        if (i && typeof i == 'object')
                            for (n in i)
                                Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
                        return reviver.call(e, t, i);
                    }
                    var j;
                    text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
                        return '\\u' + ('0000' + e.charCodeAt(0).toString(16)).slice(-4);
                    }));
                    if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '')))
                        return j = eval('(' + text + ')'), typeof reviver == 'function' ? walk({ '': j }, '') : j;
                    throw new SyntaxError('JSON.parse');
                };
                return exports;
            }('undefined' != typeof io ? io : module.exports, typeof JSON != 'undefined' ? JSON : undefined), function (e, t) {
                var n = e.parser = {}, r = n.packets = [
                        'disconnect',
                        'connect',
                        'heartbeat',
                        'message',
                        'json',
                        'event',
                        'ack',
                        'error',
                        'noop'
                    ], i = n.reasons = [
                        'transport not supported',
                        'client not handshaken',
                        'unauthorized'
                    ], s = n.advice = ['reconnect'], o = t.JSON, u = t.util.indexOf;
                n.encodePacket = function (e) {
                    var t = u(r, e.type), n = e.id || '', a = e.endpoint || '', f = e.ack, l = null;
                    switch (e.type) {
                    case 'error':
                        var c = e.reason ? u(i, e.reason) : '', h = e.advice ? u(s, e.advice) : '';
                        if (c !== '' || h !== '')
                            l = c + (h !== '' ? '+' + h : '');
                        break;
                    case 'message':
                        e.data !== '' && (l = e.data);
                        break;
                    case 'event':
                        var p = { name: e.name };
                        e.args && e.args.length && (p.args = e.args), l = o.stringify(p);
                        break;
                    case 'json':
                        l = o.stringify(e.data);
                        break;
                    case 'connect':
                        e.qs && (l = e.qs);
                        break;
                    case 'ack':
                        l = e.ackId + (e.args && e.args.length ? '+' + o.stringify(e.args) : '');
                    }
                    var d = [
                        t,
                        n + (f == 'data' ? '+' : ''),
                        a
                    ];
                    return l !== null && l !== undefined && d.push(l), d.join(':');
                }, n.encodePayload = function (e) {
                    var t = '';
                    if (e.length == 1)
                        return e[0];
                    for (var n = 0, r = e.length; n < r; n++) {
                        var i = e[n];
                        t += '\uFFFD' + i.length + '\uFFFD' + e[n];
                    }
                    return t;
                };
                var a = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
                n.decodePacket = function (e) {
                    var t = e.match(a);
                    if (!t)
                        return {};
                    var n = t[2] || '', e = t[5] || '', u = {
                            type: r[t[1]],
                            endpoint: t[4] || ''
                        };
                    n && (u.id = n, t[3] ? u.ack = 'data' : u.ack = !0);
                    switch (u.type) {
                    case 'error':
                        var t = e.split('+');
                        u.reason = i[t[0]] || '', u.advice = s[t[1]] || '';
                        break;
                    case 'message':
                        u.data = e || '';
                        break;
                    case 'event':
                        try {
                            var f = o.parse(e);
                            u.name = f.name, u.args = f.args;
                        } catch (l) {
                        }
                        u.args = u.args || [];
                        break;
                    case 'json':
                        try {
                            u.data = o.parse(e);
                        } catch (l) {
                        }
                        break;
                    case 'connect':
                        u.qs = e || '';
                        break;
                    case 'ack':
                        var t = e.match(/^([0-9]+)(\+)?(.*)/);
                        if (t) {
                            u.ackId = t[1], u.args = [];
                            if (t[3])
                                try {
                                    u.args = t[3] ? o.parse(t[3]) : [];
                                } catch (l) {
                                }
                        }
                        break;
                    case 'disconnect':
                    case 'heartbeat':
                    }
                    return u;
                }, n.decodePayload = function (e) {
                    if (e.charAt(0) == '\uFFFD') {
                        var t = [];
                        for (var r = 1, i = ''; r < e.length; r++)
                            e.charAt(r) == '\uFFFD' ? (t.push(n.decodePacket(e.substr(r + 1).substr(0, i))), r += Number(i) + 1, i = '') : i += e.charAt(r);
                        return t;
                    }
                    return [n.decodePacket(e)];
                };
            }('undefined' != typeof io ? io : module.exports, 'undefined' != typeof io ? io : module.parent.exports), function (e, t) {
                function n(e, t) {
                    this.socket = e, this.sessid = t;
                }
                e.Transport = n, t.util.mixin(n, t.EventEmitter), n.prototype.heartbeats = function () {
                    return !0;
                }, n.prototype.onData = function (e) {
                    this.clearCloseTimeout(), (this.socket.connected || this.socket.connecting || this.socket.reconnecting) && this.setCloseTimeout();
                    if (e !== '') {
                        var n = t.parser.decodePayload(e);
                        if (n && n.length)
                            for (var r = 0, i = n.length; r < i; r++)
                                this.onPacket(n[r]);
                    }
                    return this;
                }, n.prototype.onPacket = function (e) {
                    return this.socket.setHeartbeatTimeout(), e.type == 'heartbeat' ? this.onHeartbeat() : (e.type == 'connect' && e.endpoint == '' && this.onConnect(), e.type == 'error' && e.advice == 'reconnect' && (this.isOpen = !1), this.socket.onPacket(e), this);
                }, n.prototype.setCloseTimeout = function () {
                    if (!this.closeTimeout) {
                        var e = this;
                        this.closeTimeout = setTimeout(function () {
                            e.onDisconnect();
                        }, this.socket.closeTimeout);
                    }
                }, n.prototype.onDisconnect = function () {
                    return this.isOpen && this.close(), this.clearTimeouts(), this.socket.onDisconnect(), this;
                }, n.prototype.onConnect = function () {
                    return this.socket.onConnect(), this;
                }, n.prototype.clearCloseTimeout = function () {
                    this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = null);
                }, n.prototype.clearTimeouts = function () {
                    this.clearCloseTimeout(), this.reopenTimeout && clearTimeout(this.reopenTimeout);
                }, n.prototype.packet = function (e) {
                    this.send(t.parser.encodePacket(e));
                }, n.prototype.onHeartbeat = function (e) {
                    this.packet({ type: 'heartbeat' });
                }, n.prototype.onOpen = function () {
                    this.isOpen = !0, this.clearCloseTimeout(), this.socket.onOpen();
                }, n.prototype.onClose = function () {
                    var e = this;
                    this.isOpen = !1, this.socket.onClose(), this.onDisconnect();
                }, n.prototype.prepareUrl = function () {
                    var e = this.socket.options;
                    return this.scheme() + '://' + e.host + ':' + e.port + '/' + e.resource + '/' + t.protocol + '/' + this.name + '/' + this.sessid;
                }, n.prototype.ready = function (e, t) {
                    t.call(this);
                };
            }('undefined' != typeof io ? io : module.exports, 'undefined' != typeof io ? io : module.parent.exports), function (e, t, n) {
                function r(e) {
                    this.options = {
                        port: 80,
                        secure: !1,
                        document: 'document' in n ? document : !1,
                        resource: 'socket.io',
                        transports: t.transports,
                        'connect timeout': 10000,
                        'try multiple transports': !0,
                        reconnect: !0,
                        'reconnection delay': 500,
                        'reconnection limit': Infinity,
                        'reopen delay': 3000,
                        'max reconnection attempts': 10,
                        'sync disconnect on unload': !1,
                        'auto connect': !0,
                        'flash policy port': 10843,
                        manualFlush: !1
                    }, t.util.merge(this.options, e), this.connected = !1, this.open = !1, this.connecting = !1, this.reconnecting = !1, this.namespaces = {}, this.buffer = [], this.doBuffer = !1;
                    if (this.options['sync disconnect on unload'] && (!this.isXDomain() || t.util.ua.hasCORS)) {
                        var r = this;
                        t.util.on(n, 'beforeunload', function () {
                            r.disconnectSync();
                        }, !1);
                    }
                    this.options['auto connect'] && this.connect();
                }
                function i() {
                }
                e.Socket = r, t.util.mixin(r, t.EventEmitter), r.prototype.of = function (e) {
                    return this.namespaces[e] || (this.namespaces[e] = new t.SocketNamespace(this, e), e !== '' && this.namespaces[e].packet({ type: 'connect' })), this.namespaces[e];
                }, r.prototype.publish = function () {
                    this.emit.apply(this, arguments);
                    var e;
                    for (var t in this.namespaces)
                        this.namespaces.hasOwnProperty(t) && (e = this.of(t), e.$emit.apply(e, arguments));
                }, r.prototype.handshake = function (e) {
                    function s(t) {
                        t instanceof Error ? (n.connecting = !1, n.onError(t.message)) : e.apply(null, t.split(':'));
                    }
                    var n = this, r = this.options, o = [
                            'http' + (r.secure ? 's' : '') + ':/',
                            r.host + ':' + r.port,
                            r.resource,
                            t.protocol,
                            t.util.query(this.options.query, 't=' + +new Date())
                        ].join('/');
                    if (this.isXDomain() && !t.util.ua.hasCORS) {
                        var u = document.getElementsByTagName('script')[0], a = document.createElement('script');
                        a.src = o + '&jsonp=' + t.j.length, u.parentNode.insertBefore(a, u), t.j.push(function (e) {
                            s(e), a.parentNode.removeChild(a);
                        });
                    } else {
                        var f = t.util.request();
                        f.open('GET', o, !0), this.isXDomain() && (f.withCredentials = !0), f.onreadystatechange = function () {
                            f.readyState == 4 && (f.onreadystatechange = i, f.status == 200 ? s(f.responseText) : f.status == 403 ? n.onError(f.responseText) : (n.connecting = !1, !n.reconnecting && n.onError(f.responseText)));
                        }, f.send(null);
                    }
                }, r.prototype.getTransport = function (e) {
                    var n = e || this.transports, r;
                    for (var i = 0, s; s = n[i]; i++)
                        if (t.Transport[s] && t.Transport[s].check(this) && (!this.isXDomain() || t.Transport[s].xdomainCheck(this)))
                            return new t.Transport[s](this, this.sessionid);
                    return null;
                }, r.prototype.connect = function (e) {
                    if (this.connecting)
                        return this;
                    var n = this;
                    return n.connecting = !0, this.handshake(function (r, i, s, o) {
                        function u(e) {
                            n.transport && n.transport.clearTimeouts(), n.transport = n.getTransport(e);
                            if (!n.transport)
                                return n.publish('connect_failed');
                            n.transport.ready(n, function () {
                                n.connecting = !0, n.publish('connecting', n.transport.name), n.transport.open(), n.options['connect timeout'] && (n.connectTimeoutTimer = setTimeout(function () {
                                    if (!n.connected) {
                                        n.connecting = !1;
                                        if (n.options['try multiple transports']) {
                                            var e = n.transports;
                                            while (e.length > 0 && e.splice(0, 1)[0] != n.transport.name);
                                            e.length ? u(e) : n.publish('connect_failed');
                                        }
                                    }
                                }, n.options['connect timeout']));
                            });
                        }
                        n.sessionid = r, n.closeTimeout = s * 1000, n.heartbeatTimeout = i * 1000, n.transports || (n.transports = n.origTransports = o ? t.util.intersect(o.split(','), n.options.transports) : n.options.transports), n.setHeartbeatTimeout(), u(n.transports), n.once('connect', function () {
                            clearTimeout(n.connectTimeoutTimer), e && typeof e == 'function' && e();
                        });
                    }), this;
                }, r.prototype.setHeartbeatTimeout = function () {
                    clearTimeout(this.heartbeatTimeoutTimer);
                    if (this.transport && !this.transport.heartbeats())
                        return;
                    var e = this;
                    this.heartbeatTimeoutTimer = setTimeout(function () {
                        e.transport.onClose();
                    }, this.heartbeatTimeout);
                }, r.prototype.packet = function (e) {
                    return this.connected && !this.doBuffer ? this.transport.packet(e) : this.buffer.push(e), this;
                }, r.prototype.setBuffer = function (e) {
                    this.doBuffer = e, !e && this.connected && this.buffer.length && (this.options.manualFlush || this.flushBuffer());
                }, r.prototype.flushBuffer = function () {
                    this.transport.payload(this.buffer), this.buffer = [];
                }, r.prototype.disconnect = function () {
                    if (this.connected || this.connecting)
                        this.open && this.of('').packet({ type: 'disconnect' }), this.onDisconnect('booted');
                    return this;
                }, r.prototype.disconnectSync = function () {
                    var e = t.util.request(), n = [
                            'http' + (this.options.secure ? 's' : '') + ':/',
                            this.options.host + ':' + this.options.port,
                            this.options.resource,
                            t.protocol,
                            '',
                            this.sessionid
                        ].join('/') + '/?disconnect=1';
                    e.open('GET', n, !1), e.send(null), this.onDisconnect('booted');
                }, r.prototype.isXDomain = function () {
                    var e = n.location.port || ('https:' == n.location.protocol ? 443 : 80);
                    return this.options.host !== n.location.hostname || this.options.port != e;
                }, r.prototype.onConnect = function () {
                    this.connected || (this.connected = !0, this.connecting = !1, this.doBuffer || this.setBuffer(!1), this.emit('connect'));
                }, r.prototype.onOpen = function () {
                    this.open = !0;
                }, r.prototype.onClose = function () {
                    this.open = !1, clearTimeout(this.heartbeatTimeoutTimer);
                }, r.prototype.onPacket = function (e) {
                    this.of(e.endpoint).onPacket(e);
                }, r.prototype.onError = function (e) {
                    e && e.advice && e.advice === 'reconnect' && (this.connected || this.connecting) && (this.disconnect(), this.options.reconnect && this.reconnect()), this.publish('error', e && e.reason ? e.reason : e);
                }, r.prototype.onDisconnect = function (e) {
                    var t = this.connected, n = this.connecting;
                    this.connected = !1, this.connecting = !1, this.open = !1;
                    if (t || n)
                        this.transport.close(), this.transport.clearTimeouts(), t && (this.publish('disconnect', e), 'booted' != e && this.options.reconnect && !this.reconnecting && this.reconnect());
                }, r.prototype.reconnect = function () {
                    function i() {
                        if (e.connected) {
                            for (var t in e.namespaces)
                                e.namespaces.hasOwnProperty(t) && '' !== t && e.namespaces[t].packet({ type: 'connect' });
                            e.publish('reconnect', e.transport.name, e.reconnectionAttempts);
                        }
                        clearTimeout(e.reconnectionTimer), e.removeListener('connect_failed', s), e.removeListener('connect', s), e.reconnecting = !1, delete e.reconnectionAttempts, delete e.reconnectionDelay, delete e.reconnectionTimer, delete e.redoTransports, e.options['try multiple transports'] = n;
                    }
                    function s() {
                        if (!e.reconnecting)
                            return;
                        if (e.connected)
                            return i();
                        if (e.connecting && e.reconnecting)
                            return e.reconnectionTimer = setTimeout(s, 1000);
                        e.reconnectionAttempts++ >= t ? e.redoTransports ? (e.publish('reconnect_failed'), i()) : (e.on('connect_failed', s), e.options['try multiple transports'] = !0, e.transports = e.origTransports, e.transport = e.getTransport(), e.redoTransports = !0, e.connect()) : (e.reconnectionDelay < r && (e.reconnectionDelay *= 2), e.connect(), e.publish('reconnecting', e.reconnectionDelay, e.reconnectionAttempts), e.reconnectionTimer = setTimeout(s, e.reconnectionDelay));
                    }
                    this.reconnecting = !0, this.reconnectionAttempts = 0, this.reconnectionDelay = this.options['reconnection delay'];
                    var e = this, t = this.options['max reconnection attempts'], n = this.options['try multiple transports'], r = this.options['reconnection limit'];
                    this.options['try multiple transports'] = !1, this.reconnectionTimer = setTimeout(s, this.reconnectionDelay), this.on('connect', s);
                };
            }('undefined' != typeof io ? io : module.exports, 'undefined' != typeof io ? io : module.parent.exports, this), function (e, t) {
                function n(e, t) {
                    this.socket = e, this.name = t || '', this.flags = {}, this.json = new r(this, 'json'), this.ackPackets = 0, this.acks = {};
                }
                function r(e, t) {
                    this.namespace = e, this.name = t;
                }
                e.SocketNamespace = n, t.util.mixin(n, t.EventEmitter), n.prototype.$emit = t.EventEmitter.prototype.emit, n.prototype.of = function () {
                    return this.socket.of.apply(this.socket, arguments);
                }, n.prototype.packet = function (e) {
                    return e.endpoint = this.name, this.socket.packet(e), this.flags = {}, this;
                }, n.prototype.send = function (e, t) {
                    var n = {
                        type: this.flags.json ? 'json' : 'message',
                        data: e
                    };
                    return 'function' == typeof t && (n.id = ++this.ackPackets, n.ack = !0, this.acks[n.id] = t), this.packet(n);
                }, n.prototype.emit = function (e) {
                    var t = Array.prototype.slice.call(arguments, 1), n = t[t.length - 1], r = {
                            type: 'event',
                            name: e
                        };
                    return 'function' == typeof n && (r.id = ++this.ackPackets, r.ack = 'data', this.acks[r.id] = n, t = t.slice(0, t.length - 1)), r.args = t, this.packet(r);
                }, n.prototype.disconnect = function () {
                    return this.name === '' ? this.socket.disconnect() : (this.packet({ type: 'disconnect' }), this.$emit('disconnect')), this;
                }, n.prototype.onPacket = function (e) {
                    function r() {
                        n.packet({
                            type: 'ack',
                            args: t.util.toArray(arguments),
                            ackId: e.id
                        });
                    }
                    var n = this;
                    switch (e.type) {
                    case 'connect':
                        this.$emit('connect');
                        break;
                    case 'disconnect':
                        this.name === '' ? this.socket.onDisconnect(e.reason || 'booted') : this.$emit('disconnect', e.reason);
                        break;
                    case 'message':
                    case 'json':
                        var i = [
                            'message',
                            e.data
                        ];
                        e.ack == 'data' ? i.push(r) : e.ack && this.packet({
                            type: 'ack',
                            ackId: e.id
                        }), this.$emit.apply(this, i);
                        break;
                    case 'event':
                        var i = [e.name].concat(e.args);
                        e.ack == 'data' && i.push(r), this.$emit.apply(this, i);
                        break;
                    case 'ack':
                        this.acks[e.ackId] && (this.acks[e.ackId].apply(this, e.args), delete this.acks[e.ackId]);
                        break;
                    case 'error':
                        e.advice ? this.socket.onError(e) : e.reason == 'unauthorized' ? this.$emit('connect_failed', e.reason) : this.$emit('error', e.reason);
                    }
                }, r.prototype.send = function () {
                    this.namespace.flags[this.name] = !0, this.namespace.send.apply(this.namespace, arguments);
                }, r.prototype.emit = function () {
                    this.namespace.flags[this.name] = !0, this.namespace.emit.apply(this.namespace, arguments);
                };
            }('undefined' != typeof io ? io : module.exports, 'undefined' != typeof io ? io : module.parent.exports), function (e, t, n) {
                function r(e) {
                    t.Transport.apply(this, arguments);
                }
                e.websocket = r, t.util.inherit(r, t.Transport), r.prototype.name = 'websocket', r.prototype.open = function () {
                    var e = t.util.query(this.socket.options.query), r = this, i;
                    return i || (i = n.MozWebSocket || n.WebSocket), this.websocket = new i(this.prepareUrl() + e), this.websocket.onopen = function () {
                        r.onOpen(), r.socket.setBuffer(!1);
                    }, this.websocket.onmessage = function (e) {
                        r.onData(e.data);
                    }, this.websocket.onclose = function () {
                        r.onClose(), r.socket.setBuffer(!0);
                    }, this.websocket.onerror = function (e) {
                        r.onError(e);
                    }, this;
                }, t.util.ua.iDevice ? r.prototype.send = function (e) {
                    var t = this;
                    return setTimeout(function () {
                        t.websocket.send(e);
                    }, 0), this;
                } : r.prototype.send = function (e) {
                    return this.websocket.send(e), this;
                }, r.prototype.payload = function (e) {
                    for (var t = 0, n = e.length; t < n; t++)
                        this.packet(e[t]);
                    return this;
                }, r.prototype.close = function () {
                    return this.websocket.close(), this;
                }, r.prototype.onError = function (e) {
                    this.socket.onError(e);
                }, r.prototype.scheme = function () {
                    return this.socket.options.secure ? 'wss' : 'ws';
                }, r.check = function () {
                    return 'WebSocket' in n && !('__addTask' in WebSocket) || 'MozWebSocket' in n;
                }, r.xdomainCheck = function () {
                    return !0;
                }, t.transports.push('websocket');
            }('undefined' != typeof io ? io.Transport : module.exports, 'undefined' != typeof io ? io : module.parent.exports, this), function (e, t) {
                function n() {
                    t.Transport.websocket.apply(this, arguments);
                }
                e.flashsocket = n, t.util.inherit(n, t.Transport.websocket), n.prototype.name = 'flashsocket', n.prototype.open = function () {
                    var e = this, n = arguments;
                    return WebSocket.__addTask(function () {
                        t.Transport.websocket.prototype.open.apply(e, n);
                    }), this;
                }, n.prototype.send = function () {
                    var e = this, n = arguments;
                    return WebSocket.__addTask(function () {
                        t.Transport.websocket.prototype.send.apply(e, n);
                    }), this;
                }, n.prototype.close = function () {
                    return WebSocket.__tasks.length = 0, t.Transport.websocket.prototype.close.call(this), this;
                }, n.prototype.ready = function (e, r) {
                    function i() {
                        var t = e.options, i = t['flash policy port'], o = [
                                'http' + (t.secure ? 's' : '') + ':/',
                                t.host + ':' + t.port,
                                t.resource,
                                'static/flashsocket',
                                'WebSocketMain' + (e.isXDomain() ? 'Insecure' : '') + '.swf'
                            ];
                        n.loaded || (typeof WEB_SOCKET_SWF_LOCATION == 'undefined' && (WEB_SOCKET_SWF_LOCATION = o.join('/')), i !== 843 && WebSocket.loadFlashPolicyFile('xmlsocket://' + t.host + ':' + i), WebSocket.__initialize(), n.loaded = !0), r.call(s);
                    }
                    var s = this;
                    if (document.body)
                        return i();
                    t.util.load(i);
                }, n.check = function () {
                    return typeof WebSocket != 'undefined' && '__initialize' in WebSocket && !!swfobject ? swfobject.getFlashPlayerVersion().major >= 10 : !1;
                }, n.xdomainCheck = function () {
                    return !0;
                }, typeof window != 'undefined' && (WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = !0), t.transports.push('flashsocket');
            }('undefined' != typeof io ? io.Transport : module.exports, 'undefined' != typeof io ? io : module.parent.exports));
            if ('undefined' != typeof window)
                var swfobject = function () {
                    function C() {
                        if (b)
                            return;
                        try {
                            var e = a.getElementsByTagName('body')[0].appendChild(U('span'));
                            e.parentNode.removeChild(e);
                        } catch (t) {
                            return;
                        }
                        b = !0;
                        var n = c.length;
                        for (var r = 0; r < n; r++)
                            c[r]();
                    }
                    function k(e) {
                        b ? e() : c[c.length] = e;
                    }
                    function L(t) {
                        if (typeof u.addEventListener != e)
                            u.addEventListener('load', t, !1);
                        else if (typeof a.addEventListener != e)
                            a.addEventListener('load', t, !1);
                        else if (typeof u.attachEvent != e)
                            z(u, 'onload', t);
                        else if (typeof u.onload == 'function') {
                            var n = u.onload;
                            u.onload = function () {
                                n(), t();
                            };
                        } else
                            u.onload = t;
                    }
                    function A() {
                        l ? O() : M();
                    }
                    function O() {
                        var n = a.getElementsByTagName('body')[0], r = U(t);
                        r.setAttribute('type', i);
                        var s = n.appendChild(r);
                        if (s) {
                            var o = 0;
                            (function () {
                                if (typeof s.GetVariable != e) {
                                    var t = s.GetVariable('$version');
                                    t && (t = t.split(' ')[1].split(','), T.pv = [
                                        parseInt(t[0], 10),
                                        parseInt(t[1], 10),
                                        parseInt(t[2], 10)
                                    ]);
                                } else if (o < 10) {
                                    o++, setTimeout(arguments.callee, 10);
                                    return;
                                }
                                n.removeChild(r), s = null, M();
                            }());
                        } else
                            M();
                    }
                    function M() {
                        var t = h.length;
                        if (t > 0)
                            for (var n = 0; n < t; n++) {
                                var r = h[n].id, i = h[n].callbackFn, s = {
                                        success: !1,
                                        id: r
                                    };
                                if (T.pv[0] > 0) {
                                    var o = R(r);
                                    if (o)
                                        if (W(h[n].swfVersion) && !(T.wk && T.wk < 312))
                                            V(r, !0), i && (s.success = !0, s.ref = _(r), i(s));
                                        else if (h[n].expressInstall && D()) {
                                            var u = {};
                                            u.data = h[n].expressInstall, u.width = o.getAttribute('width') || '0', u.height = o.getAttribute('height') || '0', o.getAttribute('class') && (u.styleclass = o.getAttribute('class')), o.getAttribute('align') && (u.align = o.getAttribute('align'));
                                            var a = {}, f = o.getElementsByTagName('param'), l = f.length;
                                            for (var c = 0; c < l; c++)
                                                f[c].getAttribute('name').toLowerCase() != 'movie' && (a[f[c].getAttribute('name')] = f[c].getAttribute('value'));
                                            P(u, a, r, i);
                                        } else
                                            H(o), i && i(s);
                                } else {
                                    V(r, !0);
                                    if (i) {
                                        var p = _(r);
                                        p && typeof p.SetVariable != e && (s.success = !0, s.ref = p), i(s);
                                    }
                                }
                            }
                    }
                    function _(n) {
                        var r = null, i = R(n);
                        if (i && i.nodeName == 'OBJECT')
                            if (typeof i.SetVariable != e)
                                r = i;
                            else {
                                var s = i.getElementsByTagName(t)[0];
                                s && (r = s);
                            }
                        return r;
                    }
                    function D() {
                        return !w && W('6.0.65') && (T.win || T.mac) && !(T.wk && T.wk < 312);
                    }
                    function P(t, n, r, i) {
                        w = !0, g = i || null, y = {
                            success: !1,
                            id: r
                        };
                        var o = R(r);
                        if (o) {
                            o.nodeName == 'OBJECT' ? (v = B(o), m = null) : (v = o, m = r), t.id = s;
                            if (typeof t.width == e || !/%$/.test(t.width) && parseInt(t.width, 10) < 310)
                                t.width = '310';
                            if (typeof t.height == e || !/%$/.test(t.height) && parseInt(t.height, 10) < 137)
                                t.height = '137';
                            a.title = a.title.slice(0, 47) + ' - Flash Player Installation';
                            var f = T.ie && T.win ? ['Active'].concat('').join('X') : 'PlugIn', l = 'MMredirectURL=' + u.location.toString().replace(/&/g, '%26') + '&MMplayerType=' + f + '&MMdoctitle=' + a.title;
                            typeof n.flashvars != e ? n.flashvars += '&' + l : n.flashvars = l;
                            if (T.ie && T.win && o.readyState != 4) {
                                var c = U('div');
                                r += 'SWFObjectNew', c.setAttribute('id', r), o.parentNode.insertBefore(c, o), o.style.display = 'none', function () {
                                    o.readyState == 4 ? o.parentNode.removeChild(o) : setTimeout(arguments.callee, 10);
                                }();
                            }
                            j(t, n, r);
                        }
                    }
                    function H(e) {
                        if (T.ie && T.win && e.readyState != 4) {
                            var t = U('div');
                            e.parentNode.insertBefore(t, e), t.parentNode.replaceChild(B(e), t), e.style.display = 'none', function () {
                                e.readyState == 4 ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10);
                            }();
                        } else
                            e.parentNode.replaceChild(B(e), e);
                    }
                    function B(e) {
                        var n = U('div');
                        if (T.win && T.ie)
                            n.innerHTML = e.innerHTML;
                        else {
                            var r = e.getElementsByTagName(t)[0];
                            if (r) {
                                var i = r.childNodes;
                                if (i) {
                                    var s = i.length;
                                    for (var o = 0; o < s; o++)
                                        (i[o].nodeType != 1 || i[o].nodeName != 'PARAM') && i[o].nodeType != 8 && n.appendChild(i[o].cloneNode(!0));
                                }
                            }
                        }
                        return n;
                    }
                    function j(n, r, s) {
                        var o, u = R(s);
                        if (T.wk && T.wk < 312)
                            return o;
                        if (u) {
                            typeof n.id == e && (n.id = s);
                            if (T.ie && T.win) {
                                var a = '';
                                for (var f in n)
                                    n[f] != Object.prototype[f] && (f.toLowerCase() == 'data' ? r.movie = n[f] : f.toLowerCase() == 'styleclass' ? a += ' class="' + n[f] + '"' : f.toLowerCase() != 'classid' && (a += ' ' + f + '="' + n[f] + '"'));
                                var l = '';
                                for (var c in r)
                                    r[c] != Object.prototype[c] && (l += '<param name="' + c + '" value="' + r[c] + '" />');
                                u.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + a + '>' + l + '</object>', p[p.length] = n.id, o = R(n.id);
                            } else {
                                var h = U(t);
                                h.setAttribute('type', i);
                                for (var d in n)
                                    n[d] != Object.prototype[d] && (d.toLowerCase() == 'styleclass' ? h.setAttribute('class', n[d]) : d.toLowerCase() != 'classid' && h.setAttribute(d, n[d]));
                                for (var v in r)
                                    r[v] != Object.prototype[v] && v.toLowerCase() != 'movie' && F(h, v, r[v]);
                                u.parentNode.replaceChild(h, u), o = h;
                            }
                        }
                        return o;
                    }
                    function F(e, t, n) {
                        var r = U('param');
                        r.setAttribute('name', t), r.setAttribute('value', n), e.appendChild(r);
                    }
                    function I(e) {
                        var t = R(e);
                        t && t.nodeName == 'OBJECT' && (T.ie && T.win ? (t.style.display = 'none', function () {
                            t.readyState == 4 ? q(e) : setTimeout(arguments.callee, 10);
                        }()) : t.parentNode.removeChild(t));
                    }
                    function q(e) {
                        var t = R(e);
                        if (t) {
                            for (var n in t)
                                typeof t[n] == 'function' && (t[n] = null);
                            t.parentNode.removeChild(t);
                        }
                    }
                    function R(e) {
                        var t = null;
                        try {
                            t = a.getElementById(e);
                        } catch (n) {
                        }
                        return t;
                    }
                    function U(e) {
                        return a.createElement(e);
                    }
                    function z(e, t, n) {
                        e.attachEvent(t, n), d[d.length] = [
                            e,
                            t,
                            n
                        ];
                    }
                    function W(e) {
                        var t = T.pv, n = e.split('.');
                        return n[0] = parseInt(n[0], 10), n[1] = parseInt(n[1], 10) || 0, n[2] = parseInt(n[2], 10) || 0, t[0] > n[0] || t[0] == n[0] && t[1] > n[1] || t[0] == n[0] && t[1] == n[1] && t[2] >= n[2] ? !0 : !1;
                    }
                    function X(n, r, i, s) {
                        if (T.ie && T.mac)
                            return;
                        var o = a.getElementsByTagName('head')[0];
                        if (!o)
                            return;
                        var u = i && typeof i == 'string' ? i : 'screen';
                        s && (E = null, S = null);
                        if (!E || S != u) {
                            var f = U('style');
                            f.setAttribute('type', 'text/css'), f.setAttribute('media', u), E = o.appendChild(f), T.ie && T.win && typeof a.styleSheets != e && a.styleSheets.length > 0 && (E = a.styleSheets[a.styleSheets.length - 1]), S = u;
                        }
                        T.ie && T.win ? E && typeof E.addRule == t && E.addRule(n, r) : E && typeof a.createTextNode != e && E.appendChild(a.createTextNode(n + ' {' + r + '}'));
                    }
                    function V(e, t) {
                        if (!x)
                            return;
                        var n = t ? 'visible' : 'hidden';
                        b && R(e) ? R(e).style.visibility = n : X('#' + e, 'visibility:' + n);
                    }
                    function $(t) {
                        var n = /[\\\"<>\.;]/, r = n.exec(t) != null;
                        return r && typeof encodeURIComponent != e ? encodeURIComponent(t) : t;
                    }
                    var e = 'undefined', t = 'object', n = 'Shockwave Flash', r = 'ShockwaveFlash.ShockwaveFlash', i = 'application/x-shockwave-flash', s = 'SWFObjectExprInst', o = 'onreadystatechange', u = window, a = document, f = navigator, l = !1, c = [A], h = [], p = [], d = [], v, m, g, y, b = !1, w = !1, E, S, x = !0, T = function () {
                            var s = typeof a.getElementById != e && typeof a.getElementsByTagName != e && typeof a.createElement != e, o = f.userAgent.toLowerCase(), c = f.platform.toLowerCase(), h = c ? /win/.test(c) : /win/.test(o), p = c ? /mac/.test(c) : /mac/.test(o), d = /webkit/.test(o) ? parseFloat(o.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, '$1')) : !1, v = !1, m = [
                                    0,
                                    0,
                                    0
                                ], g = null;
                            if (typeof f.plugins != e && typeof f.plugins[n] == t)
                                g = f.plugins[n].description, g && (typeof f.mimeTypes == e || !f.mimeTypes[i] || !!f.mimeTypes[i].enabledPlugin) && (l = !0, v = !1, g = g.replace(/^.*\s+(\S+\s+\S+$)/, '$1'), m[0] = parseInt(g.replace(/^(.*)\..*$/, '$1'), 10), m[1] = parseInt(g.replace(/^.*\.(.*)\s.*$/, '$1'), 10), m[2] = /[a-zA-Z]/.test(g) ? parseInt(g.replace(/^.*[a-zA-Z]+(.*)$/, '$1'), 10) : 0);
                            else if (typeof u[['Active'].concat('Object').join('X')] != e)
                                try {
                                    var y = new window[(['Active'].concat('Object').join('X'))](r);
                                    y && (g = y.GetVariable('$version'), g && (v = !0, g = g.split(' ')[1].split(','), m = [
                                        parseInt(g[0], 10),
                                        parseInt(g[1], 10),
                                        parseInt(g[2], 10)
                                    ]));
                                } catch (b) {
                                }
                            return {
                                w3: s,
                                pv: m,
                                wk: d,
                                ie: v,
                                win: h,
                                mac: p
                            };
                        }(), N = function () {
                            if (!T.w3)
                                return;
                            (typeof a.readyState != e && a.readyState == 'complete' || typeof a.readyState == e && (a.getElementsByTagName('body')[0] || a.body)) && C(), b || (typeof a.addEventListener != e && a.addEventListener('DOMContentLoaded', C, !1), T.ie && T.win && (a.attachEvent(o, function () {
                                a.readyState == 'complete' && (a.detachEvent(o, arguments.callee), C());
                            }), u == top && function () {
                                if (b)
                                    return;
                                try {
                                    a.documentElement.doScroll('left');
                                } catch (e) {
                                    setTimeout(arguments.callee, 0);
                                    return;
                                }
                                C();
                            }()), T.wk && function () {
                                if (b)
                                    return;
                                if (!/loaded|complete/.test(a.readyState)) {
                                    setTimeout(arguments.callee, 0);
                                    return;
                                }
                                C();
                            }(), L(C));
                        }(), J = function () {
                            T.ie && T.win && window.attachEvent('onunload', function () {
                                var e = d.length;
                                for (var t = 0; t < e; t++)
                                    d[t][0].detachEvent(d[t][1], d[t][2]);
                                var n = p.length;
                                for (var r = 0; r < n; r++)
                                    I(p[r]);
                                for (var i in T)
                                    T[i] = null;
                                T = null;
                                for (var s in swfobject)
                                    swfobject[s] = null;
                                swfobject = null;
                            });
                        }();
                    return {
                        registerObject: function (e, t, n, r) {
                            if (T.w3 && e && t) {
                                var i = {};
                                i.id = e, i.swfVersion = t, i.expressInstall = n, i.callbackFn = r, h[h.length] = i, V(e, !1);
                            } else
                                r && r({
                                    success: !1,
                                    id: e
                                });
                        },
                        getObjectById: function (e) {
                            if (T.w3)
                                return _(e);
                        },
                        embedSWF: function (n, r, i, s, o, u, a, f, l, c) {
                            var h = {
                                success: !1,
                                id: r
                            };
                            T.w3 && !(T.wk && T.wk < 312) && n && r && i && s && o ? (V(r, !1), k(function () {
                                i += '', s += '';
                                var p = {};
                                if (l && typeof l === t)
                                    for (var d in l)
                                        p[d] = l[d];
                                p.data = n, p.width = i, p.height = s;
                                var v = {};
                                if (f && typeof f === t)
                                    for (var m in f)
                                        v[m] = f[m];
                                if (a && typeof a === t)
                                    for (var g in a)
                                        typeof v.flashvars != e ? v.flashvars += '&' + g + '=' + a[g] : v.flashvars = g + '=' + a[g];
                                if (W(o)) {
                                    var y = j(p, v, r);
                                    p.id == r && V(r, !0), h.success = !0, h.ref = y;
                                } else {
                                    if (u && D()) {
                                        p.data = u, P(p, v, r, c);
                                        return;
                                    }
                                    V(r, !0);
                                }
                                c && c(h);
                            })) : c && c(h);
                        },
                        switchOffAutoHideShow: function () {
                            x = !1;
                        },
                        ua: T,
                        getFlashPlayerVersion: function () {
                            return {
                                major: T.pv[0],
                                minor: T.pv[1],
                                release: T.pv[2]
                            };
                        },
                        hasFlashPlayerVersion: W,
                        createSWF: function (e, t, n) {
                            return T.w3 ? j(e, t, n) : undefined;
                        },
                        showExpressInstall: function (e, t, n, r) {
                            T.w3 && D() && P(e, t, n, r);
                        },
                        removeSWF: function (e) {
                            T.w3 && I(e);
                        },
                        createCSS: function (e, t, n, r) {
                            T.w3 && X(e, t, n, r);
                        },
                        addDomLoadEvent: k,
                        addLoadEvent: L,
                        getQueryParamValue: function (e) {
                            var t = a.location.search || a.location.hash;
                            if (t) {
                                /\?/.test(t) && (t = t.split('?')[1]);
                                if (e == null)
                                    return $(t);
                                var n = t.split('&');
                                for (var r = 0; r < n.length; r++)
                                    if (n[r].substring(0, n[r].indexOf('=')) == e)
                                        return $(n[r].substring(n[r].indexOf('=') + 1));
                            }
                            return '';
                        },
                        expressInstallCallback: function () {
                            if (w) {
                                var e = R(s);
                                e && v && (e.parentNode.replaceChild(v, e), m && (V(m, !0), T.ie && T.win && (v.style.display = 'block')), g && g(y)), w = !1;
                            }
                        }
                    };
                }();
            (function () {
                if ('undefined' == typeof window || window.WebSocket)
                    return;
                var e = window.console;
                if (!e || !e.log || !e.error)
                    e = {
                        log: function () {
                        },
                        error: function () {
                        }
                    };
                if (!swfobject.hasFlashPlayerVersion('10.0.0')) {
                    e.error('Flash Player >= 10.0.0 is required.');
                    return;
                }
                location.protocol == 'file:' && e.error('WARNING: web-socket-js doesn\'t work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://...'), WebSocket = function (e, t, n, r, i) {
                    var s = this;
                    s.__id = WebSocket.__nextId++, WebSocket.__instances[s.__id] = s, s.readyState = WebSocket.CONNECTING, s.bufferedAmount = 0, s.__events = {}, t ? typeof t == 'string' && (t = [t]) : t = [], setTimeout(function () {
                        WebSocket.__addTask(function () {
                            WebSocket.__flash.create(s.__id, e, t, n || null, r || 0, i || null);
                        });
                    }, 0);
                }, WebSocket.prototype.send = function (e) {
                    if (this.readyState == WebSocket.CONNECTING)
                        throw 'INVALID_STATE_ERR: Web Socket connection has not been established';
                    var t = WebSocket.__flash.send(this.__id, encodeURIComponent(e));
                    return t < 0 ? !0 : (this.bufferedAmount += t, !1);
                }, WebSocket.prototype.close = function () {
                    if (this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING)
                        return;
                    this.readyState = WebSocket.CLOSING, WebSocket.__flash.close(this.__id);
                }, WebSocket.prototype.addEventListener = function (e, t, n) {
                    e in this.__events || (this.__events[e] = []), this.__events[e].push(t);
                }, WebSocket.prototype.removeEventListener = function (e, t, n) {
                    if (!(e in this.__events))
                        return;
                    var r = this.__events[e];
                    for (var i = r.length - 1; i >= 0; --i)
                        if (r[i] === t) {
                            r.splice(i, 1);
                            break;
                        }
                }, WebSocket.prototype.dispatchEvent = function (e) {
                    var t = this.__events[e.type] || [];
                    for (var n = 0; n < t.length; ++n)
                        t[n](e);
                    var r = this['on' + e.type];
                    r && r(e);
                }, WebSocket.prototype.__handleEvent = function (e) {
                    'readyState' in e && (this.readyState = e.readyState), 'protocol' in e && (this.protocol = e.protocol);
                    var t;
                    if (e.type == 'open' || e.type == 'error')
                        t = this.__createSimpleEvent(e.type);
                    else if (e.type == 'close')
                        t = this.__createSimpleEvent('close');
                    else {
                        if (e.type != 'message')
                            throw 'unknown event type: ' + e.type;
                        var n = decodeURIComponent(e.message);
                        t = this.__createMessageEvent('message', n);
                    }
                    this.dispatchEvent(t);
                }, WebSocket.prototype.__createSimpleEvent = function (e) {
                    if (document.createEvent && window.Event) {
                        var t = document.createEvent('Event');
                        return t.initEvent(e, !1, !1), t;
                    }
                    return {
                        type: e,
                        bubbles: !1,
                        cancelable: !1
                    };
                }, WebSocket.prototype.__createMessageEvent = function (e, t) {
                    if (document.createEvent && window.MessageEvent && !window.opera) {
                        var n = document.createEvent('MessageEvent');
                        return n.initMessageEvent('message', !1, !1, t, null, null, window, null), n;
                    }
                    return {
                        type: e,
                        data: t,
                        bubbles: !1,
                        cancelable: !1
                    };
                }, WebSocket.CONNECTING = 0, WebSocket.OPEN = 1, WebSocket.CLOSING = 2, WebSocket.CLOSED = 3, WebSocket.__flash = null, WebSocket.__instances = {}, WebSocket.__tasks = [], WebSocket.__nextId = 0, WebSocket.loadFlashPolicyFile = function (e) {
                    WebSocket.__addTask(function () {
                        WebSocket.__flash.loadManualPolicyFile(e);
                    });
                }, WebSocket.__initialize = function () {
                    if (WebSocket.__flash)
                        return;
                    WebSocket.__swfLocation && (window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation);
                    if (!window.WEB_SOCKET_SWF_LOCATION) {
                        e.error('[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf');
                        return;
                    }
                    var t = document.createElement('div');
                    t.id = 'webSocketContainer', t.style.position = 'absolute', WebSocket.__isFlashLite() ? (t.style.left = '0px', t.style.top = '0px') : (t.style.left = '-100px', t.style.top = '-100px');
                    var n = document.createElement('div');
                    n.id = 'webSocketFlash', t.appendChild(n), document.body.appendChild(t), swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, 'webSocketFlash', '1', '1', '10.0.0', null, null, {
                        hasPriority: !0,
                        swliveconnect: !0,
                        allowScriptAccess: 'always'
                    }, null, function (t) {
                        t.success || e.error('[WebSocket] swfobject.embedSWF failed');
                    });
                }, WebSocket.__onFlashInitialized = function () {
                    setTimeout(function () {
                        WebSocket.__flash = document.getElementById('webSocketFlash'), WebSocket.__flash.setCallerUrl(location.href), WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
                        for (var e = 0; e < WebSocket.__tasks.length; ++e)
                            WebSocket.__tasks[e]();
                        WebSocket.__tasks = [];
                    }, 0);
                }, WebSocket.__onFlashEvent = function () {
                    return setTimeout(function () {
                        try {
                            var t = WebSocket.__flash.receiveEvents();
                            for (var n = 0; n < t.length; ++n)
                                WebSocket.__instances[t[n].webSocketId].__handleEvent(t[n]);
                        } catch (r) {
                            e.error(r);
                        }
                    }, 0), !0;
                }, WebSocket.__log = function (t) {
                    e.log(decodeURIComponent(t));
                }, WebSocket.__error = function (t) {
                    e.error(decodeURIComponent(t));
                }, WebSocket.__addTask = function (e) {
                    WebSocket.__flash ? e() : WebSocket.__tasks.push(e);
                }, WebSocket.__isFlashLite = function () {
                    if (!window.navigator || !window.navigator.mimeTypes)
                        return !1;
                    var e = window.navigator.mimeTypes['application/x-shockwave-flash'];
                    return !e || !e.enabledPlugin || !e.enabledPlugin.filename ? !1 : e.enabledPlugin.filename.match(/flashlite/i) ? !0 : !1;
                }, window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION || (window.addEventListener ? window.addEventListener('load', function () {
                    WebSocket.__initialize();
                }, !1) : window.attachEvent('onload', function () {
                    WebSocket.__initialize();
                }));
            }(), function (e, t, n) {
                function r(e) {
                    if (!e)
                        return;
                    t.Transport.apply(this, arguments), this.sendBuffer = [];
                }
                function i() {
                }
                e.XHR = r, t.util.inherit(r, t.Transport), r.prototype.open = function () {
                    return this.socket.setBuffer(!1), this.onOpen(), this.get(), this.setCloseTimeout(), this;
                }, r.prototype.payload = function (e) {
                    var n = [];
                    for (var r = 0, i = e.length; r < i; r++)
                        n.push(t.parser.encodePacket(e[r]));
                    this.send(t.parser.encodePayload(n));
                }, r.prototype.send = function (e) {
                    return this.post(e), this;
                }, r.prototype.post = function (e) {
                    function r() {
                        this.readyState == 4 && (this.onreadystatechange = i, t.posting = !1, this.status == 200 ? t.socket.setBuffer(!1) : t.onClose());
                    }
                    function s() {
                        this.onload = i, t.socket.setBuffer(!1);
                    }
                    var t = this;
                    this.socket.setBuffer(!0), this.sendXHR = this.request('POST'), n.XDomainRequest && this.sendXHR instanceof XDomainRequest ? this.sendXHR.onload = this.sendXHR.onerror = s : this.sendXHR.onreadystatechange = r, this.sendXHR.send(e);
                }, r.prototype.close = function () {
                    return this.onClose(), this;
                }, r.prototype.request = function (e) {
                    var n = t.util.request(this.socket.isXDomain()), r = t.util.query(this.socket.options.query, 't=' + +new Date());
                    n.open(e || 'GET', this.prepareUrl() + r, !0);
                    if (e == 'POST')
                        try {
                            n.setRequestHeader ? n.setRequestHeader('Content-type', 'text/plain;charset=UTF-8') : n.contentType = 'text/plain';
                        } catch (i) {
                        }
                    return n;
                }, r.prototype.scheme = function () {
                    return this.socket.options.secure ? 'https' : 'http';
                }, r.check = function (e, r) {
                    try {
                        var i = t.util.request(r), s = n.XDomainRequest && i instanceof XDomainRequest, o = e && e.options && e.options.secure ? 'https:' : 'http:', u = n.location && o != n.location.protocol;
                        if (i && (!s || !u))
                            return !0;
                    } catch (a) {
                    }
                    return !1;
                }, r.xdomainCheck = function (e) {
                    return r.check(e, !0);
                };
            }('undefined' != typeof io ? io.Transport : module.exports, 'undefined' != typeof io ? io : module.parent.exports, this), function (e, t) {
                function n(e) {
                    t.Transport.XHR.apply(this, arguments);
                }
                e.htmlfile = n, t.util.inherit(n, t.Transport.XHR), n.prototype.name = 'htmlfile', n.prototype.get = function () {
                    this.doc = new window[(['Active'].concat('Object').join('X'))]('htmlfile'), this.doc.open(), this.doc.write('<html></html>'), this.doc.close(), this.doc.parentWindow.s = this;
                    var e = this.doc.createElement('div');
                    e.className = 'socketio', this.doc.body.appendChild(e), this.iframe = this.doc.createElement('iframe'), e.appendChild(this.iframe);
                    var n = this, r = t.util.query(this.socket.options.query, 't=' + +new Date());
                    this.iframe.src = this.prepareUrl() + r, t.util.on(window, 'unload', function () {
                        n.destroy();
                    });
                }, n.prototype._ = function (e, t) {
                    this.onData(e);
                    try {
                        var n = t.getElementsByTagName('script')[0];
                        n.parentNode.removeChild(n);
                    } catch (r) {
                    }
                }, n.prototype.destroy = function () {
                    if (this.iframe) {
                        try {
                            this.iframe.src = 'about:blank';
                        } catch (e) {
                        }
                        this.doc = null, this.iframe.parentNode.removeChild(this.iframe), this.iframe = null, CollectGarbage();
                    }
                }, n.prototype.close = function () {
                    return this.destroy(), t.Transport.XHR.prototype.close.call(this);
                }, n.check = function (e) {
                    if (typeof window != 'undefined' && ['Active'].concat('Object').join('X') in window)
                        try {
                            var n = new window[(['Active'].concat('Object').join('X'))]('htmlfile');
                            return n && t.Transport.XHR.check(e);
                        } catch (r) {
                        }
                    return !1;
                }, n.xdomainCheck = function () {
                    return !1;
                }, t.transports.push('htmlfile');
            }('undefined' != typeof io ? io.Transport : module.exports, 'undefined' != typeof io ? io : module.parent.exports), function (e, t, n) {
                function r() {
                    t.Transport.XHR.apply(this, arguments);
                }
                function i() {
                }
                e['xhr-polling'] = r, t.util.inherit(r, t.Transport.XHR), t.util.merge(r, t.Transport.XHR), r.prototype.name = 'xhr-polling', r.prototype.heartbeats = function () {
                    return !1;
                }, r.prototype.open = function () {
                    var e = this;
                    return t.Transport.XHR.prototype.open.call(e), !1;
                }, r.prototype.get = function () {
                    function t() {
                        this.readyState == 4 && (this.onreadystatechange = i, this.status == 200 ? (e.onData(this.responseText), e.get()) : e.onClose());
                    }
                    function r() {
                        this.onload = i, this.onerror = i, e.retryCounter = 1, e.onData(this.responseText), e.get();
                    }
                    function s() {
                        e.retryCounter++, !e.retryCounter || e.retryCounter > 3 ? e.onClose() : e.get();
                    }
                    if (!this.isOpen)
                        return;
                    var e = this;
                    this.xhr = this.request(), n.XDomainRequest && this.xhr instanceof XDomainRequest ? (this.xhr.onload = r, this.xhr.onerror = s) : this.xhr.onreadystatechange = t, this.xhr.send(null);
                }, r.prototype.onClose = function () {
                    t.Transport.XHR.prototype.onClose.call(this);
                    if (this.xhr) {
                        this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = i;
                        try {
                            this.xhr.abort();
                        } catch (e) {
                        }
                        this.xhr = null;
                    }
                }, r.prototype.ready = function (e, n) {
                    var r = this;
                    t.util.defer(function () {
                        n.call(r);
                    });
                }, t.transports.push('xhr-polling');
            }('undefined' != typeof io ? io.Transport : module.exports, 'undefined' != typeof io ? io : module.parent.exports, this), function (e, t, n) {
                function i(e) {
                    t.Transport['xhr-polling'].apply(this, arguments), this.index = t.j.length;
                    var n = this;
                    t.j.push(function (e) {
                        n._(e);
                    });
                }
                var r = n.document && 'MozAppearance' in n.document.documentElement.style;
                e['jsonp-polling'] = i, t.util.inherit(i, t.Transport['xhr-polling']), i.prototype.name = 'jsonp-polling', i.prototype.post = function (e) {
                    function a() {
                        f(), n.socket.setBuffer(!1);
                    }
                    function f() {
                        n.iframe && n.form.removeChild(n.iframe);
                        try {
                            u = document.createElement('<iframe name="' + n.iframeId + '">');
                        } catch (e) {
                            u = document.createElement('iframe'), u.name = n.iframeId;
                        }
                        u.id = n.iframeId, n.form.appendChild(u), n.iframe = u;
                    }
                    var n = this, r = t.util.query(this.socket.options.query, 't=' + +new Date() + '&i=' + this.index);
                    if (!this.form) {
                        var i = document.createElement('form'), s = document.createElement('textarea'), o = this.iframeId = 'socketio_iframe_' + this.index, u;
                        i.className = 'socketio', i.style.position = 'absolute', i.style.top = '0px', i.style.left = '0px', i.style.display = 'none', i.target = o, i.method = 'POST', i.setAttribute('accept-charset', 'utf-8'), s.name = 'd', i.appendChild(s), document.body.appendChild(i), this.form = i, this.area = s;
                    }
                    this.form.action = this.prepareUrl() + r, f(), this.area.value = t.JSON.stringify(e);
                    try {
                        this.form.submit();
                    } catch (l) {
                    }
                    this.iframe.attachEvent ? u.onreadystatechange = function () {
                        n.iframe.readyState == 'complete' && a();
                    } : this.iframe.onload = a, this.socket.setBuffer(!0);
                }, i.prototype.get = function () {
                    var e = this, n = document.createElement('script'), i = t.util.query(this.socket.options.query, 't=' + +new Date() + '&i=' + this.index);
                    this.script && (this.script.parentNode.removeChild(this.script), this.script = null), n.async = !0, n.src = this.prepareUrl() + i, n.onerror = function () {
                        e.onClose();
                    };
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(n, s), this.script = n, r && setTimeout(function () {
                        var e = document.createElement('iframe');
                        document.body.appendChild(e), document.body.removeChild(e);
                    }, 100);
                }, i.prototype._ = function (e) {
                    return this.onData(e), this.isOpen && this.get(), this;
                }, i.prototype.ready = function (e, n) {
                    var i = this;
                    if (!r)
                        return n.call(this);
                    t.util.load(function () {
                        n.call(i);
                    });
                }, i.check = function () {
                    return 'document' in n;
                }, i.xdomainCheck = function () {
                    return !0;
                }, t.transports.push('jsonp-polling');
            }('undefined' != typeof io ? io.Transport : module.exports, 'undefined' != typeof io ? io : module.parent.exports, this), typeof define == 'function' && define.amd && define('appenders/../../deps/socket.io.client.js', [], function () {
                return io;
            }));
        }(), define('appenders/socketappender', [
            'require',
            '../appender',
            '../../deps/socket.io.client.js'
        ], function (e) {
            var t = e('../appender'), n = e('../../deps/socket.io.client.js'), r = function (e) {
                    e = e || {}, t.call(this, e), this.appendStrings = typeof e.appendStrings != 'undefined' ? e.appendStrings : !0, this.url = e.url || 'http://localhost', this.socket = null;
                };
            return r.prototype = new t(), r.prototype.start = function (e) {
                e = e || function () {
                };
                var t = this;
                if (this.isStarted())
                    return e();
                this.socket = n.connect(this.url, {
                    'connect timeout': 5000,
                    'max reconnection attempts': 5,
                    'try multiple transports': !0,
                    reconnect: !0
                }), this.socket.on('connect', function () {
                    return t.started = !0, e();
                }), this.socket.once('connect_failed', function () {
                    return e('No way to establish a socket connection to "' + t.url + '". Ensure the socket server is up and running.');
                });
            }, r.prototype.stop = function (e) {
                e = e || function () {
                };
                var t = this;
                if (!this.isStarted())
                    return e();
                if (!this.socket || !this.socket.connected)
                    return this.started = !1, e();
                this.socket.once('disconnect', function () {
                    return t.started = !1, t.socket = null, e();
                }), this.socket.disconnect();
            }, r.prototype.doAppend = function (e) {
                var t = this.getLayout(), n = e.getLevel(), r = null;
                this.appendStrings ? (r = t.toMessageString(e), this.doAppendMessage(n, r)) : (e = t.toLogEvent(e), this.doAppendMessage(n, e));
            }, r.prototype.doAppendMessage = function (e, t) {
                if (typeof console == 'undefined')
                    return;
                this.socket.emit('log', {
                    level: e,
                    message: t
                });
            }, r;
        }), define('appenders/nodejs/fileappender', [
            'require',
            '../../appender'
        ], function (e) {
            var t = e('../../appender'), n = e, r = null;
            try {
                typeof global != 'undefined' && global.process && global.process.versions && global.process.versions.node && typeof rootRequire == 'function' ? r = rootRequire('fs') : r = n('fs');
            } catch (i) {
            }
            var s = function (e) {
                e = e || {}, t.call(this, e), this.fileName = e.fileName, this.appendToFile = typeof e.append != 'undefined' ? !!e.append : !0, this.appendStrings = typeof e.appendStrings != 'undefined' ? e.appendStrings : !0, this.stream = null;
            };
            return s.prototype = new t(), s.prototype.doAppend = function (e) {
                var t = this.getLayout(), n = null;
                this.appendStrings ? n = t.toMessageString(e) : (e = t.toLogEvent(e), t.compactObjects || t.compact ? n = JSON.stringify(e) : n = JSON.stringify(e, null, 2)), process.platform === 'win32' && (n = n.replace(/\n/g, '\r\n')), this.stream.write(n);
            }, s.prototype.start = function (e) {
                return e = e || function () {
                }, this.isStarted() ? e() : r ? (this.stream = r.createWriteStream(this.fileName, {
                    flags: this.appendToFile ? 'a' : 'w',
                    encoding: 'utf8'
                }), this.started = !0, e()) : e('The File Appender only runs in a Node.js runtime environment');
            }, s.prototype.stop = function (e) {
                e = e || function () {
                };
                var t = this;
                if (!this.isStarted())
                    return e();
                if (!this.stream)
                    return this.started = !1, e();
                this.stream.end(function () {
                    return t.started = !1, t.stream = null, e();
                });
            }, s;
        }), define('appenders/nodejs/rollingfileappender', [
            'require',
            '../../appender'
        ], function (e) {
            var t = e('../../appender'), n = e, r = null;
            try {
                typeof global != 'undefined' && global.process && global.process.versions && global.process.versions.node && typeof rootRequire == 'function' ? r = rootRequire('fs') : r = n('fs');
            } catch (i) {
            }
            var s = function (e) {
                e = e || {}, t.call(this, e), this.fileName = e.fileName, this.triggeringPolicy = e.triggeringPolicy, this.appendStrings = typeof e.appendStrings != 'undefined' ? e.appendStrings : !0, this.stream = null;
            };
            return s.prototype = new t(), s.prototype.needsRolling = function () {
                if (this.triggeringPolicy) {
                    if (this.triggeringPolicy.size && this.currentLogSize > this.triggeringPolicy.size)
                        return !0;
                    if (this.triggeringPolicy.time && this.currentLogDate && Date.now() - this.currentLogDate > 1000 * this.triggeringPolicy.time)
                        return !0;
                }
                return !1;
            }, s.prototype.genFileName = function () {
                var e = function (e, t, n) {
                        return n = n || '0', e += '', e.length >= t ? e : new Array(t - e.length + 1).join(n) + e;
                    }, t = function (t) {
                        return e(t, 2);
                    }, n = new Date(), r = '' + n.getFullYear() + '-' + t(n.getMonth() + 1) + '-' + t(n.getDate()) + '-' + t(n.getHours()) + 'h' + t(n.getMinutes());
                !this.currentTimestamp || r !== this.currentTimestamp ? (this.currentTimeStampIdx = 0, this.currentTimestamp = r) : this.currentTimeStampIdx++;
                var i = this.currentTimestamp + '_' + t(this.currentTimeStampIdx) + '_' + this.fileName;
                return i;
            }, s.prototype.createNewlog = function () {
                this.stream && this.stream.end(), this.stream = r.createWriteStream(this.genFileName(), {
                    flags: 'w',
                    encoding: 'utf8'
                }), this.currentLogSize = 0, this.currentLogDate = new Date();
            }, s.prototype.doAppend = function (e) {
                var t = this.getLayout(), n = null;
                this.needsRolling() && this.createNewlog(), this.appendStrings ? n = t.toMessageString(e) : (e = t.toLogEvent(e), t.compactObjects || t.compact ? n = JSON.stringify(e) : n = JSON.stringify(e, null, 2)), process.platform === 'win32' && (n = n.replace(/\n/g, '\r\n')), this.currentLogSize += Buffer.byteLength(n, 'utf8'), this.stream.write(n);
            }, s.prototype.start = function (e) {
                return e = e || function () {
                }, this.isStarted() ? e() : r ? (this.createNewlog(), this.started = !0, e()) : e('The File Appender only runs in a Node.js runtime environment');
            }, s.prototype.stop = function (e) {
                e = e || function () {
                };
                var t = this;
                if (!this.isStarted())
                    return e();
                if (!this.stream)
                    return this.started = !1, e();
                this.stream.end(function () {
                    return t.started = !1, t.stream = null, e();
                });
            }, s;
        }), define('filters/regexfilter', [
            'require',
            '../filter',
            '../utils'
        ], function (e) {
            var t = e('../filter'), n = e('../utils'), r = function (e) {
                    t.call(this), e = e || {}, this.regex = e.regex || '', n.isString(this.regex) && (this.regex = new RegExp(this.regex)), this.useRawMsg = !!e.useRawMsg, this.onMatch = e.match || e.onMatch || 'neutral', this.onMismatch = e.mismatch || e.onMismatch || 'deny';
                };
            return r.prototype = new t(), r.prototype.filter = function (e) {
                var t = '';
                return this.useRawMsg ? t = e.getMessage().getFormat() : t = e.getMessage().getFormattedMessage(), this.regex.test(t) ? this.onMatch : this.onMismatch;
            }, r;
        }), define('filters/regexloggernamefilter', [
            'require',
            '../filter',
            '../utils'
        ], function (e) {
            var t = e('../filter'), n = e('../utils'), r = function (e) {
                    t.call(this), e = e || {}, this.regex = e.regex || '', n.isString(this.regex) && (this.regex = new RegExp(this.regex)), this.onMatch = e.match || e.onMatch || 'neutral', this.onMismatch = e.mismatch || e.onMismatch || 'deny';
                };
            return r.prototype = new t(), r.prototype.filter = function (e) {
                var t = e.getLoggerName();
                return this.regex.test(t) ? this.onMatch : this.onMismatch;
            }, r;
        }), define('layout', [], function () {
            var e = function (e, t) {
                this.config = e || {}, this.loggerContext = t;
            };
            return e.prototype.toLogEvent = function (e) {
                return e;
            }, e.prototype.toMessageString = function (e) {
                return this.toMessageBits(e).join(' ');
            }, e.prototype.toMessageBits = function (e, t) {
                var n = e.getMessage();
                return [
                    e.getMillis(),
                    e.getLevel(),
                    e.getLoggerName()
                ].concat(n.getFormattedParams(t));
            }, e;
        }), define('layouts/jsonlayout', [
            'require',
            '../layout',
            './simpleobjectserializer'
        ], function (e) {
            var t = e('../layout'), n = e('./simpleobjectserializer'), r = function (e, n) {
                    e = e || {}, t.call(this, e, n), this.compact = e.compact || !1, this.depth = e.depth || 2, this.messageAsObject = e.messageAsObject || !1;
                };
            return r.prototype = new t(), r.prototype.toMessageBits = function (e) {
                var t = e.getMessage(), r = this.messageAsObject ? this.depth + 1 : 2;
                t ? this.messageAsObject ? t = JSON.parse(n(t, this.depth, !0)) : t = t.getFormattedMessage() : t = '';
                var i = {
                    time: e.getMillis(),
                    loggerName: e.getLoggerName(),
                    level: e.getLevel(),
                    message: t
                };
                return [n(i, r, this.compact)];
            }, r;
        }), define('layouts/simpledateformat', [], function () {
            var e = /('[^']*')|(G+|y+|M+|d+|F+|E+|a+|H+|k+|K+|h+|m+|s+|S+|Z+)|([a-zA-Z]+)|([^a-zA-Z']+)/g, t = [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ], n = [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday'
                ], r = 0, i = 1, s = 2, o = 3, u = 4, a = 5, f = {
                    G: r,
                    y: o,
                    M: u,
                    w: s,
                    W: s,
                    D: s,
                    d: s,
                    F: s,
                    E: i,
                    a: r,
                    H: s,
                    k: s,
                    K: s,
                    h: s,
                    m: s,
                    s: s,
                    S: s,
                    Z: a
                }, l = function (e, t) {
                    while (e.length < t)
                        e = '0' + e;
                    return e;
                }, c = function (e, t, n) {
                    return t >= 4 ? e : e.substr(0, Math.max(n, t));
                }, h = function (e, t) {
                    var n = '' + e;
                    return l(n, t);
                }, p = function (e) {
                    this.formatString = e;
                };
            return p.prototype.format = function (p) {
                var d = '', v, m = this.formatString;
                while (v = e.exec(m)) {
                    var g = v[1], y = v[2], b = v[3], w = v[4];
                    if (g)
                        g === '\'\'' ? d += '\'' : d += g.substring(1, g.length - 1);
                    else if (!b)
                        if (w)
                            d += w;
                        else if (y) {
                            var E = y.charAt(0), S = y.length, x = '';
                            switch (E) {
                            case 'G':
                                x = 'AD';
                                break;
                            case 'y':
                                x = p.getFullYear();
                                break;
                            case 'M':
                                x = p.getMonth();
                                break;
                            case 'd':
                                x = p.getDate();
                                break;
                            case 'F':
                                x = 1 + Math.floor((p.getDate() - 1) / 7);
                                break;
                            case 'E':
                                x = n[p.getDay()];
                                break;
                            case 'a':
                                x = p.getHours() >= 12 ? 'PM' : 'AM';
                                break;
                            case 'H':
                                x = p.getHours();
                                break;
                            case 'k':
                                x = p.getHours() || 24;
                                break;
                            case 'K':
                                x = p.getHours() % 12;
                                break;
                            case 'h':
                                x = p.getHours() % 12 || 12;
                                break;
                            case 'm':
                                x = p.getMinutes();
                                break;
                            case 's':
                                x = p.getSeconds();
                                break;
                            case 'S':
                                x = p.getMilliseconds();
                                break;
                            case 'Z':
                                x = p.getTimezoneOffset();
                            }
                            switch (f[E]) {
                            case r:
                                d += c(x, S, 2);
                                break;
                            case i:
                                d += c(x, S, 3);
                                break;
                            case s:
                                d += h(x, S);
                                break;
                            case o:
                                if (S <= 3) {
                                    var T = '' + x;
                                    d += T.substr(2, 2);
                                } else
                                    d += h(x, S);
                                break;
                            case u:
                                S >= 3 ? d += c(t[x], S, S) : d += h(x + 1, S);
                                break;
                            case a:
                                var N = x > 0, C = N ? '-' : '+', k = Math.abs(x), L = '' + Math.floor(k / 60);
                                L = l(L, 2);
                                var A = '' + k % 60;
                                A = l(A, 2), d += C + L + A;
                            }
                        }
                }
                return d;
            }, p;
        }), define('layouts/patternlayout', [
            'require',
            '../utils',
            '../layout',
            './simpledateformat'
        ], function (e) {
            var t = e('../utils'), n = e('../layout'), r = e('./simpledateformat'), i = {
                    absolute: 'HH:mm:ss,SSS',
                    compact: 'yyyyMMddHHmmssSSS',
                    date: 'dd MMM yyyy HH:mm:ss,SSS',
                    iso8601: 'yyyy-MM-dd HH:mm:ss,SSS',
                    iso8601_basic: 'yyyy-MM-DD HHmmss,SSS'
                }, s = {
                    trace: 37,
                    log: 30,
                    info: 36,
                    warn: 33,
                    error: 31
                }, o = function (e, t) {
                    n.call(this, e, t), this.pattern = this.config.pattern || o.DEFAULT_CONVERSION_PATTERN, this.compactObjects = this.config.compactObjects || !1;
                };
            return o.prototype = new n(), o.DEFAULT_CONVERSION_PATTERN = '%m%n', o.TTCC_CONVERSION_PATTERN = '%r %p %c - %m%n', o.SIMPLE_CONVERSION_PATTERN = '%d %p %c - %m%n', o.prototype.toMessageBits = function (e, t) {
                return this.formatLogEvent(e, this.pattern, t);
            }, o.prototype.formatLogEvent = function (e, n, o) {
                var u = [], a = '', f = [], l = {
                        matched: '',
                        padding: '',
                        truncation: '',
                        pattern: '',
                        params: '',
                        text: ''
                    }, c = '', h = 0, p = [], d = '', v = 0, m = 0, g = '', y = null;
                o = o || {};
                var b = /%(-?[0-9]+)?(\.?[0-9]+)?(logger|date|domain|highlight|message|level|relative|[cdhmnpr%])(?:\{([^\}]+)\})?|([^%]+)/g;
                while (f = b.exec(n)) {
                    l.matched = f[0], l.padding = f[1], l.truncation = f[2], l.pattern = f[3], l.params = f[4], l.text = f[5], d = '';
                    if (l.text) {
                        a += l.text;
                        continue;
                    }
                    switch (l.pattern) {
                    case 'logger':
                    case 'c':
                        c = e.getLoggerName(), l.params ? (h = parseInt(l.params, 10), p = c.split('.'), h >= p.length ? d = c : d = p.slice(p.length - h).join('.')) : d = c;
                        break;
                    case 'date':
                    case 'd':
                        g = l.params || 'ISO8601', g === 'ISO8601' ? g = i.iso8601 : g === 'ABSOLUTE' ? g = i.absolute : g === 'COMPACT' ? g = i.compact : g === 'DATE' ? g = i.date : g === 'ISO8601_BASIC' && (g = i.iso8601_basic), y = new Date(e.getMillis()), d = new r(g).format(y);
                        break;
                    case 'domain':
                        c = l.params || 'id';
                        if (typeof process != 'undefined')
                            if (process.domain) {
                                c = c.split('.'), d = process.domain;
                                while (d && c.length > 0)
                                    d = d[c.shift()];
                                d = d || 'anonymous';
                            } else
                                d = 'global';
                        else
                            d = 'unknown';
                        t.isFunction(d) && (d = d());
                        break;
                    case 'highlight':
                    case 'h':
                        c = l.params || '', d = '\x1B[' + (s[e.getLevel()] || 0) + 'm' + this.formatLogEvent(e, c) + '\x1B[0m';
                        break;
                    case 'message':
                    case 'm':
                        o.preserveObjects ? d = e.getMessage().getFormattedParams({
                            separator: l.params,
                            compactObjects: this.compactObjects,
                            preserveObjects: !0
                        }) : d = e.getMessage().getFormattedMessage({
                            separator: l.params,
                            compactObjects: this.compactObjects
                        });
                        break;
                    case 'n':
                        d = '\n';
                        break;
                    case 'level':
                    case 'p':
                        d = e.getLevel();
                        break;
                    case 'relative':
                    case 'r':
                        h = e.getMillis() - this.loggerContext.getStartTime(), d = '' + h;
                        break;
                    case '%':
                        d = '%';
                        break;
                    default:
                        d = l.matched;
                    }
                    if (t.isArray(d))
                        a && (t.isString(d[0]) && (a += d[0], d = d.slice(1)), u.push(a), a = ''), d.length > 0 && (u = u.concat(d));
                    else {
                        l.truncation && (h = parseInt(l.truncation.substr(1), 10), m = d.length, h < m && (d = d.substring(m - h, m)));
                        if (l.padding)
                            if (l.padding.charAt(0) === '-') {
                                m = parseInt(l.padding.substr(1), 10);
                                for (v = d.length; v < m; v++)
                                    d += ' ';
                            } else {
                                m = parseInt(l.padding, 10), c = '';
                                for (v = d.length; v < m; v++)
                                    c += ' ';
                                d = c + d;
                            }
                        a += d;
                    }
                }
                return a && u.push(a), u;
            }, o;
        }), define('woodman', [
            'require',
            './logmanager',
            './appenders/consoleappender',
            './appenders/socketappender',
            './appenders/nodejs/fileappender',
            './appenders/nodejs/rollingfileappender',
            './filters/regexfilter',
            './filters/regexloggernamefilter',
            './layout',
            './layouts/jsonlayout',
            './layouts/patternlayout'
        ], function (e) {
            var t = e('./logmanager'), n = e('./appenders/consoleappender'), r = e('./appenders/socketappender'), i = e('./appenders/nodejs/fileappender'), s = e('./appenders/nodejs/rollingfileappender'), o = e('./filters/regexfilter'), u = e('./filters/regexloggernamefilter'), a = e('./layout'), f = e('./layouts/jsonlayout'), l = e('./layouts/patternlayout');
            return t.registerAppender('console', n), t.registerAppender('Console', n), t.registerAppender('ConsoleAppender', n), t.registerAppender('file', i), t.registerAppender('File', i), t.registerAppender('FileAppender', i), t.registerAppender('rollingfile', s), t.registerAppender('RollingFile', s), t.registerAppender('RollingFileAppender', s), t.registerAppender('socket', r), t.registerAppender('Socket', r), t.registerAppender('SocketAppender', r), t.registerFilter('regex', o), t.registerFilter('RegexFilter', o), t.registerFilter('regexloggername', u), t.registerFilter('RegexLoggerNameFilter', u), t.registerLayout('default', a), t.registerLayout('json', f), t.registerLayout('JSONLayout', f), t.registerLayout('pattern', l), t.registerLayout('PatternLayout', l), t.registerStandardLevels(), t;
        }));
        var woodman = null;
        return require(['./woodman'], function (e) {
            woodman = e;
        }, null, !0), woodman;
    }();
}(typeof require == 'function' ? require : null));
loggerCfg = {
    loggers: [{
            root: true,
            level: 'all',
            appenders: [{
                    type: 'Console',
                    layout: {
                        type: 'PatternLayout',
                        pattern: '%d{yyyy-MM-dd HH:mm:ss} [%p] %c - %m%n'
                    }
                }]
        }]
};
UtilsLoggerByDefault = function (Log4js, Config) {
    var LoggerByDefault = {
        getLogger: function (name) {
            Log4js.load(Config, function (error) {
                if (error) {
                    throw error;
                }
            });
            var logname = name || 'default';
            return Log4js.getLogger(logname);
        }
    };
    return LoggerByDefault;
}(log4js, loggerCfg);
JSONP = function (Logger) {
    var JSONP = {
        call: function (options) {
            var logger = Logger.getLogger('JSONP');
            logger.trace('[JSONP::call()]');
            if (!options) {
                logger.error('missing parameter : options !');
                throw new Error('missing parameter : options !');
            }
            if (!options.url) {
                logger.error('missing parameter : options.url !');
                throw new Error('missing parameter : options.url !');
            }
            if (!options.timeOut) {
                logger.info('setting \'options.timeOut\' default value');
                options.timeOut = 10000;
            }
            if (!options.onResponse) {
                logger.error('missing parameter : options.onResponse !');
                throw new Error('missing parameter : options.onResponse !');
            }
            var urlHasCallbackKey = false;
            var urlHasCallbackName = false;
            var idx = options.url.indexOf('callback=');
            if (idx != -1) {
                urlHasCallbackKey = true;
                var j = options.url.indexOf('&', idx);
                if (j === -1) {
                    j = options.url.length;
                }
                var callbackName = options.url.substring(idx + 9, j);
                if (callbackName) {
                    urlHasCallbackName = true;
                    options.callbackName = callbackName;
                    logger.info('setting \'options.callbackName\' value (' + options.callbackName + ') from \'options.url\' parameter');
                }
            }
            if (!urlHasCallbackKey) {
                var k = options.url.indexOf('?');
                if (k === -1) {
                    options.url = options.url + '?' + 'callback=';
                } else if (k === options.url.length) {
                    options.url = options.url + 'callback=';
                } else {
                    options.url = options.url + '&' + 'callback=';
                }
                logger.info('setting callback default key in \'options.url\' : ' + options.url);
            }
            var HasCallbackName = options.callbackName ? true : urlHasCallbackName;
            if (!urlHasCallbackName) {
                if (!options.callbackName) {
                    logger.info('setting \'options.callbackName\' default value');
                    options.callbackName = 'callback';
                }
                options.url = options.url.replace('callback=', 'callback=' + options.callbackName);
                logger.info('setting callback function name in \'options.url\' : ' + options.url);
            }
            if (!options.onTimeOut) {
                logger.info('setting \'options.onTimeOut\' default value');
                options.onTimeOut = function () {
                    console.log('TimeOut while invoking url : ' + options.url);
                };
            }
            if (!HasCallbackName) {
                var onTimeOutTrigger = window.setTimeout(function () {
                    window[options.callbackName] = function () {
                    };
                    options.onTimeOut();
                }, options.timeOut);
                window[options.callbackName] = function (data) {
                    window.clearTimeout(onTimeOutTrigger);
                    options.onResponse(data);
                };
            }
            var scriptu;
            var scripto;
            scripto = document.getElementById('results');
            scriptu = document.createElement('script');
            scriptu.setAttribute('type', 'text/javascript');
            scriptu.setAttribute('src', options.url);
            scriptu.setAttribute('charset', 'UTF-8');
            scriptu.setAttribute('id', 'results');
            scriptu.setAttribute('async', 'true');
            var node = document.body || document.documentElement || document.getElementsByTagName('head')[0];
            if (scripto == null) {
                node.appendChild(scriptu);
            } else {
                node.replaceChild(scriptu, scripto);
            }
        }
    };
    return JSONP;
}(UtilsLoggerByDefault);
/* END CODE   */
