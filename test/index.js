'use strict';

var expect = require('expect.js');
var sinon = require('sinon');
var proxyquire = require('proxyquire').noPreserveCache();

var mock = sinon.mock;

// Fake constructor
function Intercom() {} 

describe('intercom_init', function(){ 

  function requireWithMocks(intercom){
    var requireStubs = { 
      'intercom.io':intercom
    };

    return proxyquire('../', requireStubs); 
  }
  
  describe('with a valid environment', function(){      

    beforeEach(function() {      
      process.env.INTERCOM_APP_ID = 'user';
      process.env.INTERCOM_API_KEY = 'password'; 
    });
      
    it('instantiates Intercom', function(done) {
      var intercom = mock();
      requireWithMocks(intercom);
      expect(intercom.calledWithNew()).to.be(true);
      done();                
    });

    it('calls Intercom with the appId and apiKey', function(done) {            
      var intercom = mock();
    
      intercom.withArgs({
          appId: 'user',
          apiKey: 'password'            
      });

      requireWithMocks(intercom);  
      intercom.verify();
      done();                
    });  

    it('returns the Intercom instance', function(done) {      
      expect(requireWithMocks(Intercom)).to.be.a(Intercom);
      done();                
    });    
  });

  describe('with an invalid environment', function(){

    beforeEach(function() {
      delete process.env.INTERCOM_APP_ID;
      delete process.env.INTERCOM_API_KEY;       
    });

    function invoke(){ 
      requireWithMocks(Intercom);        
    } 

    it('throws an error if INTERCOM_API_KEY is not set', function(done) {
      process.env.INTERCOM_APP_ID = 'user';          
      expect(invoke).to.throwException(function (e) {
        expect(e.message).to.match(/intercom_init requires the INTERCOM_API_KEY env variable/);
        done();
      });
    });   

    it('throws an error if INTERCOM_APP_ID is not set', function(done) {
      process.env.INTERCOM_API_KEY = 'password';          
      expect(invoke).to.throwException(function (e) {
        expect(e.message).to.match(/intercom_init requires the INTERCOM_APP_ID env variable/);
        done();
      });
    });       
  });

});