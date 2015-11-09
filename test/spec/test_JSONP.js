/* TODO */

define(['chai', 'sinon'], function (chai, sinon) {

    var assert = chai.assert;
    var expect = chai.expect;
    var should = chai.should();

    describe("-- Tests unit JSONP --", function () {

        before(function () {
            // la fonction callback est definie par le client
            window["myCallback"] = function (data) {
                console.log('myCallback : ', data);
                expect(data).to.have.property("message", "Hello World!");
            };
        });

        after(function () { });

        var JSONP;

        beforeEach(function (done) {
            require(['JSONP'], function (_JSONP) {
                JSONP = _JSONP;
                done();
            });
        });

        it('call with a callback by default', function (done) {
            // description du test
            // cas nominal 
            // cas où la fonction callback est defnie par le programme
            // par defaut, la fonction est 'callback()', et appelle 'onResponse()'
            
            var options = {
                // utilisation d'un fake de service pour mocker ce test...
                url: 'spec/fixtures/callback-default.js?callback=',
                timeOut: 10000,
                callbackName: null,
                onResponse: function (response) {
                    console.log('onResponse : ', response);
                    expect(response).to.have.property("message", "Another Hello World!");
                    done();
                },
                onTimeOut: function () {
                    done('Time out!');
                }
            };

            JSONP.call(options);
        });

        it('call with an user callback', function () {
            // description du test
            // cas où la fonction callback est definie par le client : 
            // cf. myCallback()
            
            var options = {
                // utilisation d'un fake de service pour mocker ce test...
                url: 'spec/fixtures/callback.js?callback=',
                timeOut: 10000,
                callbackName: "myCallback",
                onResponse: function (response) {
                    console.log('onResponse : ', response);
                },
                onTimeOut: function () {
                    console.log('Time out!');
                }
            };

            JSONP.call(options);
        });

        it('call with an exception on options undefined !', function () {
            // description du test
            // exception
            expect(function () {
                var options = null;
                JSONP.call(options);
            }).to.throw("missing parameter : options !");
        });

        it('call with an exception on url undefined !', function () {
            // description du test
            // exception
            expect(function () {
                var options = {};
                JSONP.call(options);
            }).to.throw("missing parameter : options.url !");
        });

        it('call with an exception on callback undefined !', function () {
            // description du test
            // exception
            // cas où la fonction callback n'est pas definie : 'onResponse()'
            expect(function () {
                var options = {
                    // utilisation d'un fake de service pour mocker ce test...
                    url: 'spec/fixtures/callback.js?callback=',
                    timeOut: 10000,
                    callbackName: null,
                    onResponse: null,
                    onTimeOut: null
                };

                JSONP.call(options);
            }).to.throw("missing parameter : options.onResponse !");
        });
        
        xit('call with an exception on callback send by service', function (done) {
            // description du test
            // FIXME cas improbable...,
            // cas où la fonction callback du service est differente de celle du client !?
            
            var options = {
                // utilisation d'un fake de service pour mocker ce test...
                // ce service renvoie une fonction callback differente : callbackFailed({}) !?
                url: 'spec/fixtures/callback-failed.js?callback=',
                timeOut: 10000,
                callbackName: "myCallback",
                onResponse: function (response) {
                    console.log('onResponse : ', response);
                    done();
                },
                onTimeOut: function () {
                    console.log('Time out!');
                    done();
                }
            };

            JSONP.call(options);
        });

    });
});